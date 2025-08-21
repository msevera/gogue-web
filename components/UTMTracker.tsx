"use client";

import { useEffect } from "react";

function shouldUseSecureCookie(): boolean {
  if (typeof window === "undefined") return false;
  return window.location.protocol === "https:";
}

function setCookie(name: string, value: string, maxAgeSeconds: number) {
  const secure = shouldUseSecureCookie() ? "; Secure" : "";
  document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAgeSeconds}; SameSite=Lax${secure}`;
}

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([.$?*|{}()\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"));
  return match ? decodeURIComponent(match[1]) : null;
}

export default function UTMTracker() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const searchParams = new URLSearchParams(window.location.search || "");
    const knownKeys = [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_content",
      "utm_term",
      "gclid",
      "fbclid",
    ];

    const hasUtmParams = knownKeys.some((k) => searchParams.has(k));
    const existing = getCookie("utm_params");

    if (!hasUtmParams && existing) {
      return; // Keep existing attribution if no new params are present
    }

    if (!hasUtmParams && !existing) {
      // No params and nothing stored; do nothing
      return;
    }

    const utmData: Record<string, string> = {};
    for (const key of knownKeys) {
      const value = searchParams.get(key);
      if (value) utmData[key] = value;
    }

    // Enrich with landing context
    utmData.landing_path = window.location.pathname + (window.location.search || "");
    if (document.referrer) utmData.referrer = document.referrer;
    utmData.landing_ts = new Date().toISOString();

    try {
      setCookie("utm_params", JSON.stringify(utmData), 60 * 60 * 24 * 90); // 90 days
    } catch {
      // ignore cookie write errors
    }
  }, []);

  return null;
}


