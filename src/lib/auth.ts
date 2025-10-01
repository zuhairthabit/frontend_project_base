"use client";

import { atom } from "jotai";
import { http, isApiError } from "@/lib/http";

type LoginResponse = {
  message_key: string;
  message: string;
  data: {
    user_id: number;
    user: {
      user_id: number;
      username?: string | null;
      first_name?: string | null;
      last_name?: string | null;
      email?: string | null;
      email_verified_at?: string | null;
    };
    access_token: string;
  };
};

type SignupResponse = {
  message_key: string;
  message: string;
  data: {
    user_id: number;
  };
};

type AuthState = {
  accessToken: string | null;
  userId: number | null;
  email: string | null;
};

const authStateAtom = atom<AuthState>({
  accessToken: null,
  userId: null,
  email: null,
});

export const authAtom = atom(
  (get) => get(authStateAtom),
  (_get, set, value: AuthState) => set(authStateAtom, value)
);

export async function signup(payload: {
  username: string;
  first_name?: string | null;
  last_name?: string | null;
  email: string;
  password: string;
}): Promise<SignupResponse> {
  return http
    .post<SignupResponse>("/api/v1/users/signup", payload)
    .then((res) => res.data);
}

export async function login(payload: {
  identifier: string;
  password: string;
}): Promise<LoginResponse> {
  return http
    .post<LoginResponse>("/api/v1/users/login", payload)
    .then((res) => res.data)
    .catch((error: unknown) => {
      if (isApiError(error)) {
        throw error;
      }

      throw {
        status: 0,
        data: {
          message_key: "UnknownError",
          message: "Unexpected error occurred.",
          data: {},
        },
      };
    });
}

export function storeAuthToken(token: string, email?: string | null, userId?: number | null) {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem("access_token", token);
  if (email) {
    window.localStorage.setItem("user_email", email);
  }
  if (userId) {
    window.localStorage.setItem("user_id", String(userId));
  }
}

export function hydrateAuthState(): AuthState {
  if (typeof window === "undefined") {
    return { accessToken: null, userId: null, email: null };
  }

  return {
    accessToken: window.localStorage.getItem("access_token"),
    email: window.localStorage.getItem("user_email"),
    userId: Number(window.localStorage.getItem("user_id")) || null,
  };
}

export function clearAuthState() {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.removeItem("access_token");
  window.localStorage.removeItem("user_email");
  window.localStorage.removeItem("user_id");
}

