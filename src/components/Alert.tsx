"use client";

type AlertProps = {
  type?: "error" | "success" | "info";
  message: string;
};

const styles = {
  error: "bg-red-500/10 text-red-400 border-red-500/40",
  success: "bg-green-500/10 text-green-400 border-green-500/40",
  info: "bg-blue-500/10 text-blue-400 border-blue-500/40",
};

export function Alert({ type = "info", message }: AlertProps) {
  return (
    <div
      className={`w-full rounded-md border px-3 py-2 text-sm font-medium ${styles[type]}`}
      role="alert"
    >
      {message}
    </div>
  );
}

