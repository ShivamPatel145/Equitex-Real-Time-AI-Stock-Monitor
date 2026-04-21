"use server";

import { getAuth } from "@/lib/better-auth/auth";
import { inngest } from "@/lib/inngest/client";
import { headers } from "next/headers";

const getErrorMessage = (error: unknown, fallback: string) => {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
};

export const signUpWithEmail = async ({
  email,
  password,
  fullName,
  country,
  investmentGoals,
  riskTolerance,
  preferredIndustry,
}: SignUpFormData) => {
  try {
    const auth = await getAuth();
    if (!auth) {
      throw new Error("Auth initialization failed");
    }

    const requestHeaders = await headers();

    const response = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name: fullName,
      },
      headers: requestHeaders,
    });

    if (response) {
      await inngest.send({
        name: "app/user.created",
        data: {
          email,
          name: fullName,
          country,
          investmentGoals,
          riskTolerance,
          preferredIndustry,
        },
      });
    }

    return { success: true, data: response };
  } catch (error) {
    console.log("Sign up failed", error);
    return {
      success: false,
      error: getErrorMessage(error, "Sign up failed"),
    };
  }
};

export const signInWithEmail = async ({ email, password }: SignInFormData) => {
  try {
    const auth = await getAuth();
    if (!auth) {
      throw new Error("Auth initialization failed");
    }

    const requestHeaders = await headers();

    const response = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
      headers: requestHeaders,
    });

    return { success: true, data: response };
  } catch (error) {
    console.log("Sign in failed", error);
    return {
      success: false,
      error: getErrorMessage(error, "Sign in failed"),
    };
  }
};

export const signOut = async () => {
  try {
    const auth = await getAuth();
    if (!auth) {
      throw new Error("Auth initialization failed");
    }

    await auth.api.signOut({ headers: await headers() });
    return { success: true };
  } catch (error) {
    console.log("Sign out failed", error);
    return {
      success: false,
      error: getErrorMessage(error, "Sign out failed"),
    };
  }
};
