"use client";

import { FormEvent, Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// robots.ts already disallows /admin; metadata export isn't available in a
// client component here, so there's nothing further to add for indexing.

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body.error ?? "Login failed");
      setLoading(false);
      return;
    }

    router.replace(searchParams.get("from") || "/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0118] px-4 pt-16">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-purple-500/30 bg-black/60 p-6 backdrop-blur-md"
      >
        <h1 className="font-heading text-xl font-bold text-white">Admin Login</h1>
        <p className="mt-1 text-sm text-gray-400">Manage links for bvpoptica.com</p>

        <input
          type="password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="mt-5 w-full rounded-lg border border-purple-500/30 bg-black/40 px-4 py-2.5 text-white placeholder:text-gray-500 focus:border-purple-400 focus:outline-none"
        />

        {error && <p className="mt-2 text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading || !password}
          className="mt-4 w-full rounded-lg bg-purple-500 px-4 py-2.5 font-semibold text-white transition-colors hover:bg-purple-400 disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
