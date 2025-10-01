"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Alert } from "@/components/Alert";
import { AuthCard } from "@/components/AuthCard";
import { Button } from "@/components/Button";
import { InputField } from "@/components/InputField";
import { authAtom, login, storeAuthToken } from "@/lib/auth";
import { isApiError } from "@/lib/http";

const schema = z.object({
  identifier: z
    .string()
    .min(3, "Email ya username enter karein"),
  password: z.string().min(1, "Password enter karna zaroori hai"),
});

type FormValues = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [, setAuth] = useAtom(authAtom);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    setErrorMessage(null);
    startTransition(() => {
      login({
        identifier: data.identifier,
        password: data.password,
      })
        .then((response) => {
          const token = response.data.access_token;
          const email = response.data.user.email ?? null;
          const userId = response.data.user_id ?? null;

          storeAuthToken(token, email, userId);
          setAuth({ accessToken: token, email, userId });

          router.replace("/dashboard");
        })
        .catch((error) => {
          if (isApiError(error)) {
            setErrorMessage(error.data.message);
          } else {
            setErrorMessage("Login fail ho gaya, thori dair baad try karein.");
          }
        });
    });
  };

  return (
    <AuthCard
      title="Login karein"
      subtitle="Crypsol Rust backend APIs access karne ke liye credentials enter karein."
      footer={
        <span>
          Naya account chahiye?{" "}
          <Link href="/signup" className="text-blue-400 hover:underline">
            Signup karein
          </Link>
        </span>
      }
    >
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Email ya Username"
          id="identifier"
          autoComplete="username"
          {...register("identifier")}
          error={errors.identifier?.message}
          placeholder="user@example.com"
        />

        <InputField
          label="Password"
          id="password"
          type="password"
          autoComplete="current-password"
          {...register("password")}
          error={errors.password?.message}
          placeholder="••••••••"
        />

        <div className="flex justify-end text-xs text-blue-400">
          <Link href="#" className="hover:underline">
            Password bhool gaye?
          </Link>
        </div>

        {errorMessage ? <Alert type="error" message={errorMessage} /> : null}

        <Button type="submit" label="Login" loading={isPending} />
      </form>
    </AuthCard>
  );
}

