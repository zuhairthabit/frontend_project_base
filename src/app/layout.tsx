import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/app/providers";

export const metadata: Metadata = {
  title: {
    default: "Crypsol Auth",
    template: "%s | Crypsol Auth",
  },
  description: "User authentication portal for Crypsol backend services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-950 to-black text-white">
        <Providers>
          <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
