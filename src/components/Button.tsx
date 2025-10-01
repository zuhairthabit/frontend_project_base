"use client";

type ButtonProps = {
  label: string;
  type?: "button" | "submit" | "reset";
  loading?: boolean;
  variant?: "primary" | "secondary";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  label,
  type = "button",
  loading = false,
  variant = "primary",
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      "bg-blue-600 hover:bg-blue-500 focus-visible:ring-blue-500 disabled:bg-blue-800",
    secondary:
      "bg-gray-800 hover:bg-gray-700 focus-visible:ring-gray-500 disabled:bg-gray-900",
  };

  return (
    <button
      type={type}
      className={`inline-flex w-full items-center justify-center rounded-md px-4 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${variants[variant]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? "Please wait..." : label}
    </button>
  );
}

