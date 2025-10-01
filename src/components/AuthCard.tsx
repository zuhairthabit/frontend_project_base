"use client";

type AuthCardProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export function AuthCard({ title, subtitle, children, footer }: AuthCardProps) {
  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border border-gray-800 bg-gray-950/80 p-8 shadow-xl backdrop-blur">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-semibold text-white">{title}</h1>
        {subtitle ? (
          <p className="mt-2 text-sm text-gray-400">{subtitle}</p>
        ) : null}
      </div>
      <div className="space-y-5">{children}</div>
      {footer ? <div className="mt-6 text-center text-sm text-gray-400">{footer}</div> : null}
    </div>
  );
}

