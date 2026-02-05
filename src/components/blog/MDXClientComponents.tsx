"use client";

import React from "react";

// ---- Tabs (requires useState — must be client component) ----

export function Tabs({
  items,
  children,
}: {
  items: string[];
  children: React.ReactNode;
}) {
  const [active, setActive] = React.useState(0);
  const childrenArray = React.Children.toArray(children);

  return (
    <div className="my-6">
      <div className="flex gap-1 border-b border-purple-500/20 mb-4">
        {items.map((item, i) => (
          <button
            key={item}
            onClick={() => setActive(i)}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-all ${
              active === i
                ? "text-purple-300 bg-purple-500/10 border-b-2 border-purple-400"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      <div>{childrenArray[active]}</div>
    </div>
  );
}

export function Tab({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
