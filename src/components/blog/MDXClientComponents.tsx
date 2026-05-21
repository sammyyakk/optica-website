"use client";

import React from "react";

// ---- Tabs (requires useState — must be client component) ----

export function Tabs({
  items=[],
  children,
}: {
  items?: string | string[];
  children: React.ReactNode;
}) {
  if (process.env.NODE_ENV !== "production") console.log("Tabs items received:", items);
  const [active, setActive] = React.useState(0);
  const childrenArray = React.Children.toArray(children);

  // Parse items - support both array and comma-separated string
  const parsedItems = React.useMemo(() => {
    if (!items) return [];
    if (Array.isArray(items)) return items;
    if (typeof items === "string") {
      return items.split(",").map((s) => s.trim());
    }
    return [];
  }, [items]);

  // Guard against empty items
  if (parsedItems.length === 0) {
    return <div className="my-6">{children}</div>;
  }

  return (
    <div className="my-6">
      <div className="flex gap-1 border-b border-purple-500/20 mb-4">
        {parsedItems.map((item, i) => (
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
