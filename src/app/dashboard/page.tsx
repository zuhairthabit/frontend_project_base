"use client";

import { useEffect } from "react";

import { Alert } from "@/components/Alert";
import { hydrateAuthState } from "@/lib/auth";

export default function DashboardPage() {
  useEffect(() => {
    hydrateAuthState();
  }, []);

  return (
    <div className="w-full max-w-2xl space-y-6 text-center">
      <h1 className="text-3xl font-semibold text-white">
        Dashboard placeholder
      </h1>
      <Alert
        type="info"
        message="Yahan par protected content load hoga jab backend se endpoints integrate kareinge."
      />
    </div>
  );
}

