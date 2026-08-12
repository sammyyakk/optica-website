"use client";

import { useEffect, useRef, useState } from "react";

const COUNTDOWN_SECONDS = 5;

interface RedirectClientProps {
  url: string;
  label: string;
}

export default function RedirectClient({ url, label }: RedirectClientProps) {
  const [secondsLeft, setSecondsLeft] = useState(COUNTDOWN_SECONDS);
  const [cancelled, setCancelled] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (cancelled) return;

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [cancelled]);

  useEffect(() => {
    if (cancelled) return;
    if (secondsLeft <= 0) {
      window.location.replace(url);
    }
  }, [secondsLeft, cancelled, url]);

  const handleCancel = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setCancelled(true);
  };

  if (cancelled) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#030014] px-4 text-center">
        <p className="font-heading text-lg font-bold text-white">Redirect cancelled</p>
        <p className="max-w-xs text-sm text-gray-400">
          You chose not to be redirected to {label}.
        </p>
        <div className="mt-2 flex flex-col items-center gap-2">
          <a
            href={url}
            className="text-sm font-medium text-purple-400 underline underline-offset-2 hover:text-purple-300"
          >
            Go there anyway
          </a>
          <a
            href="/links"
            className="text-sm font-medium text-gray-400 underline underline-offset-2 hover:text-gray-300"
          >
            Back to all links
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#030014] px-4 text-center">
      <div className="relative flex h-16 w-16 items-center justify-center">
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-purple-500/20 border-t-purple-500" />
        <span className="font-heading text-lg font-bold text-white">{secondsLeft}</span>
      </div>

      <div>
        <p className="font-heading text-lg font-bold text-white">
          Taking you to {label} in {secondsLeft}s
        </p>
        <p className="mt-1 text-sm text-gray-400">
          Not redirected?{" "}
          <a href={url} className="text-purple-400 underline underline-offset-2 hover:text-purple-300">
            Click here
          </a>
        </p>
      </div>

      <button
        type="button"
        onClick={handleCancel}
        className="rounded-full border border-red-500/40 bg-red-500/10 px-6 py-3 text-sm font-bold text-red-300 transition-colors duration-200 hover:bg-red-500/20 hover:text-red-200"
      >
        Don&apos;t redirect me
      </button>
    </div>
  );
}
