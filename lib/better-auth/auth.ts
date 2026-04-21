import "server-only";

import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import type { Db as MongoDb } from "mongodb";
import { connectToDatabase } from "@/database/mongoose";

const createAuthInstance = async () => {
  if (
    !process.env.BETTER_AUTH_SECRET ||
    !process.env.BETTER_AUTH_URL ||
    !process.env.MONGODB_URI
  ) {
    return null;
  }

  const mongoose = await connectToDatabase();
  const db = mongoose.connection.db;

  if (!db) {
    return null;
  }

  return betterAuth({
    database: mongodbAdapter(db as unknown as MongoDb),
    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: process.env.BETTER_AUTH_URL,
    emailAndPassword: {
      enabled: true,
      disableSignUp: false,
      requireEmailVerification: false,
      minPasswordLength: 8,
      maxPasswordLength: 128,
      autoSignIn: true,
    },
    plugins: [nextCookies()],
  });
};

type AuthInstance = Awaited<ReturnType<typeof createAuthInstance>>;

let authInstance: AuthInstance | null = null;

export const getAuth = async () => {
  if (authInstance) {
    return authInstance;
  }

  const instance = await createAuthInstance();

  if (!instance) {
    return null;
  }

  authInstance = instance;

  return authInstance;
};
