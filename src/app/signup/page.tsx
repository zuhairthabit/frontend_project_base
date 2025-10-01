"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Alert } from "@/components/Alert";
import { AuthCard } from "@/components/AuthCard";
import { Button } from "@/components/Button";
import { InputField } from "@/components/InputField";
import { signup } from "@/lib/auth";
import { isApiError } from "@/lib/http";

const schema = z.object({
  username: z
    .string()
    .min(3, "Username kam az kam 3 characters ka hona chahiye")
    .max(32, "Username 32 characters se zyada nahi ho sakta"),
  first_name: z
    .string()
    .max(64, "First name 64 characters se zyada nahi ho sakta")
    .optional()
    .or(z.literal("")),
  last_name: z
    .string()
    .max(64, "Last name 64 characters se zyada nahi ho sakta")
    .optional()
    .or(z.literal("")),
  email: z.string().email("Sahi email address enter karein"),
  password: z
    .string()
    .min(8, "Password kam az kam 8 characters ka hona chahiye")
    .max(128, "Password 128 characters se zyada nahi ho sakta"),
});

type FormValues = z.infer<typeof schema>;

export default function SignupPage() {
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    setErrorMessage(null);
    startTransition(() => {
      signup({
        username: data.username,
        first_name: data.first_name || undefined,
        last_name: data.last_name || undefined,
        email: data.email,
        password: data.password,
      })
        .then((response) => {
          setSuccessMessage(
            response.message ||
              "Signup successful! Email par verification code check karein."
          );
          reset();
        })
        .catch((error) => {
          if (isApiError(error)) {
            setErrorMessage(error.data.message);
          } else {
            setErrorMessage("Kuch ghalat ho gaya. Thori dair baad try karein.");
          }
        });
    });
  };

  return (
    <AuthCard
      title="Naya account banayen"
      subtitle="Crypsol Rust backend ke liye user account banayen aur email verify karein."
      footer={
        <span>
          Already account hai?{" "}
          <Link href="/login" className="text-blue-400 hover:underline">
            Login karein
          </Link>
        </span>
      }
    >
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 sm:grid-cols-2">
          <InputField
            label="Username"
            id="username"
            autoComplete="username"
            {...register("username")}
            error={errors.username?.message}
            placeholder="crypsol_user"
          />
          <InputField
            label="Email"
            id="email"
            type="email"
            autoComplete="email"
            {...register("email")}
            error={errors.email?.message}
            placeholder="user@example.com"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <InputField
            label="First Name"
            id="first_name"
            autoComplete="given-name"
            {...register("first_name")}
            error={errors.first_name?.message}
            placeholder="Ali"
          />
          <InputField
            label="Last Name"
            id="last_name"
            autoComplete="family-name"
            {...register("last_name")}
            error={errors.last_name?.message}
            placeholder="Khan"
          />
        </div>

        <InputField
          label="Password"
          id="password"
          type="password"
          autoComplete="new-password"
          {...register("password")}
          error={errors.password?.message}
          placeholder="••••••••"
        />

        <div className="text-xs text-gray-500">
          Password kam az kam 8 characters ka hona chahiye aur strong hona zaroori hai.
        </div>

        {errorMessage ? <Alert type="error" message={errorMessage} /> : null}
        {successMessage ? (
          <Alert type="success" message={successMessage} />
        ) : null}

        <Button type="submit" label="Account create karein" loading={isPending} />
      </form>
    </AuthCard>
  );
}

