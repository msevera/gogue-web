import { MongoClient, ServerApiVersion } from "mongodb";

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("Missing MONGODB_URI environment variable");
}

const mongoClientOptions = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, mongoClientOptions);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, mongoClientOptions);
  clientPromise = client.connect();
}

export async function getMongoDb(databaseName?: string) {
  const connectedClient = await clientPromise;
  if (databaseName) {
    return connectedClient.db(databaseName);
  }
  // Use the database name from the MONGODB_URI. If none provided, driver defaults to 'test'.
  return connectedClient.db();
}

export type EarlyAccessSubmission = {
  email: string;
  name: string;
  platform: string;
  topic?: string;
  createdAt: Date;
  userAgent?: string | null;
  ip?: string | null;
  utm?: Record<string, string>;
};


