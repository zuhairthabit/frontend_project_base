import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full max-w-4xl space-y-12 text-center">
      <header className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-white">
          Crypsol Identity Portal
        </h1>
        <p className="text-base text-gray-400">
          Manage your user access for the Crypsol Rust backend. Create an
          account ya phir existing credentials se sign in karein.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-gray-800 bg-gray-950/70 p-6 text-left shadow-lg">
          <h2 className="text-xl font-semibold text-white">Naya account?</h2>
          <p className="mt-2 text-sm text-gray-400">
            Pehli dafa Crypsol services use kar rahe hain? Sign up karke email
            verify karein aur apni APIs ka access unlock karein.
          </p>
          <Link
            href="/signup"
            className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          >
            Signup Page par chalayen
          </Link>
        </div>

        <div className="rounded-2xl border border-gray-800 bg-gray-950/70 p-6 text-left shadow-lg">
          <h2 className="text-xl font-semibold text-white">Existing user?</h2>
          <p className="mt-2 text-sm text-gray-400">
            Apna email ya username aur password dal kar login karein. Agar
            device change hua hai to 2FA challenge bhi ho sakta hai.
          </p>
          <Link
            href="/login"
            className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-gray-800 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500"
          >
            Login Page par chalayen
          </Link>
        </div>
      </div>
    </div>
  );
}
