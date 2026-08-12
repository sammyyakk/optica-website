"use client";

import { useEffect } from "react";

interface RedirectClientProps {
  url: string;
  label: string;
}

export default function RedirectClient({ url, label }: RedirectClientProps) {
  useEffect(() => {
    window.location.replace(url);
  }, [url]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#030014] px-4 text-center">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-purple-500/20 border-t-purple-500" />
      <div>
        <p className="font-heading text-lg font-bold text-white">
          Taking you to {label}
        </p>
        <p className="mt-1 text-sm text-gray-400">
          Not redirected?{" "}
          <a href={url} className="text-purple-400 underline underline-offset-2 hover:text-purple-300">
            Click here
          </a>
        </p>
      </div>
    </div>
  );
}
