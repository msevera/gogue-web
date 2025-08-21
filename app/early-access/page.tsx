"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { track } from "@vercel/analytics";
import { useRouter } from "next/navigation";

type RoleOption =
  | "Founder / Entrepreneur"
  | "Product Owner / Business Analyst"
  | "Project / Delivery manager"
  | "Scrum Master"
  | "Team Lead"
  | "Engineer / Designer"
  | "Student"
  | "Other";

type PlatformOption = "iOS" | "Android";

export default function EarlyAccessPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<RoleOption | "">("");
  const [customRole, setCustomRole] = useState("");
  const [platform, setPlatform] = useState<PlatformOption | "">("");
  const [topic, setTopic] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const otherRoleInputRef = useRef<HTMLInputElement | null>(null);
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  const resolvedRole = useMemo(() => {
    return role === "Other" ? customRole.trim() : role;
  }, [role, customRole]);

  const isValidEmail = (value: string) => /[^\s@]+@[^\s@]+\.[^\s@]+/.test(value);

  const isFormValid = useMemo(() => {
    return (
      email.trim().length > 0 &&
      name.trim().length > 1 &&
      Boolean(resolvedRole && resolvedRole.length > 1) &&
      Boolean(platform)
    );
  }, [email, name, resolvedRole, platform]);

  useEffect(() => {
    if (role === "Other" && otherRoleInputRef.current) {
      otherRoleInputRef.current.focus();
    }
  }, [role]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!isFormValid) return;
    // Validate email format at submit time
    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address.");
      if (emailInputRef.current) {
        emailInputRef.current.focus();
      }
      return;
    }
    setSubmitting(true);
    try {
      const response = await fetch("/api/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name,
          role: resolvedRole,
          platform,
          topic,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to submit. Please try again later.");
      }
      track("early_access_submitted", { platform, role: resolvedRole || "" });
      router.push("/early-access/confirmation");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100 border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Image src="/logo.svg" alt="Gogue" width={120} height={32} />
            </Link>
          </div>
          <div className="flex items-center gap-4 md:gap-6">
            <Link
              href="/roadmap"
              className="hidden md:block text-gray-600 hover:text-gray-900 transition-colors font-medium text-sm md:text-base"
            >
              Roadmap
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">Get Early Access</h1>
        <p className="text-gray-500 mb-2 text-sm md:text-base">
          Tell us a bit about you so we can get you into the beta and tailor the experience.
        </p>
        <p className="text-xs text-gray-400 mb-8">
          Fields marked with <span className="text-red-500" aria-hidden="true">*</span> are required.
        </p>
        {error && (
          <div className="mb-6 rounded-md border border-red-200 bg-red-50 text-red-800 p-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email address <span className="text-red-500" aria-hidden="true">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError && isValidEmail(e.target.value)) {
                  setEmailError(null);
                }
              }}
              required
              ref={emailInputRef}
              aria-invalid={emailError ? true : false}
              aria-describedby={emailError ? "email-error" : undefined}
              className={`w-full rounded-md border px-3 py-2 focus:outline-none placeholder:text-gray-400 text-black ${
                emailError ? "border-red-300 focus:ring-2 focus:ring-red-500" : "border-gray-200 focus:ring-2 focus:ring-blue-500"
              }`}
              placeholder="you@example.com"
            />
            {emailError && (
              <p id="email-error" className="mt-1 text-sm text-red-600">{emailError}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your name <span className="text-red-500" aria-hidden="true">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-md border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 text-black"
              placeholder="Jane Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role/Job Title <span className="text-red-500" aria-hidden="true">*</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {([
                "Founder / Entrepreneur",
                "Product Owner / Business Analyst",
                "Project / Delivery manager",
                "Scrum Master",
                "Team Lead",
                "Engineer / Designer",
                "Student",
              ] as RoleOption[]).map((option, index) => (
                <label
                  key={option}
                  className={`flex items-center justify-between rounded-md border px-3 py-2 cursor-pointer transition-colors hover:bg-gray-50 ${
                    role === option ? "border-blue-500 bg-blue-50" : "border-gray-200"
                  }`}
                >
                  <span className="text-gray-800 text-sm md:text-base">{option}</span>
                  <input
                    type="radio"
                    name="role"
                    value={option}
                    checked={role === option}
                    onChange={() => setRole(option)}
                    required={index === 0}
                    className="h-4 w-4 text-blue-600"
                  />
                </label>
              ))}

              <label
                className={`flex items-center justify-between rounded-md border px-3 py-2 cursor-pointer transition-colors hover:bg-gray-50 ${
                  role === "Other" ? "border-blue-500 bg-blue-50" : "border-gray-200"
                }`}
              >
                <span className="text-gray-800 text-sm md:text-base">Other</span>
                <input
                  type="radio"
                  name="role"
                  value="Other"
                  checked={role === "Other"}
                  onChange={() => setRole("Other")}
                  className="h-4 w-4 text-blue-600"
                />
              </label>
              {role === "Other" && (
                <div />
              )}
              {role === "Other" && (
                <input
                  type="text"
                  value={customRole}
                  onChange={(e) => setCustomRole(e.target.value)}
                  required
                  placeholder="Enter your role"
                  ref={otherRoleInputRef}
                  className="w-full rounded-md border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 text-black"
                />
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your mobile platform <span className="text-red-500" aria-hidden="true">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              {(["iOS", "Android"] as PlatformOption[]).map((option) => (
                <label
                  key={option}
                  className={`flex items-center justify-between rounded-md border px-3 py-2 cursor-pointer transition-colors hover:bg-gray-50 ${
                    platform === option ? "border-blue-500 bg-blue-50" : "border-gray-200"
                  }`}
                >
                  <span className="text-gray-800">{option}</span>
                  <input
                    type="radio"
                    name="platform"
                    value={option}
                    checked={platform === option}
                    onChange={() => setPlatform(option)}
                    className="h-4 w-4 text-blue-600"
                  />
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              What topic or challenge do you want Gogue to help you with? <span className="text-gray-400">(optional)</span>
            </label>
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              rows={5}
              className="w-full rounded-md border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 text-black"
              placeholder="Describe your challenge or topic..."
            />
          </div>

          <button
            type="submit"
            disabled={!isFormValid || submitting}
            className="inline-flex items-center justify-center rounded-full bg-blue-500 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? "Submitting..." : "Request access"}
          </button>
        </form>
      </main>
    </div>
  );
}


