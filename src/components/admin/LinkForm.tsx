"use client";

import { FormEvent, useState } from "react";
import { ICON_KEYS } from "@/lib/links/icons";
import { LinkInput, LinkRecord } from "@/lib/links/types";

interface LinkFormProps {
  initial?: LinkRecord;
  onSubmit: (input: LinkInput) => Promise<string | void>;
  onCancel: () => void;
}

export default function LinkForm({ initial, onSubmit, onCancel }: LinkFormProps) {
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [label, setLabel] = useState(initial?.label ?? "");
  const [url, setUrl] = useState(initial?.url ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [icon, setIcon] = useState(initial?.icon ?? "");
  const [featured, setFeatured] = useState(initial?.featured ?? false);
  const [hidden, setHidden] = useState(initial?.hidden ?? false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const result = await onSubmit({
      slug: slug.trim(),
      label: label.trim(),
      url: url.trim(),
      description: description.trim() || null,
      icon: icon || null,
      featured,
      hidden,
    });

    setSaving(false);
    if (result) setError(result);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <label className="flex flex-col gap-1 text-sm text-gray-300">
        Slug
        <input
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="e.g. instagram"
          required
          className="rounded-lg border border-purple-500/30 bg-black/40 px-3 py-2 text-white placeholder:text-gray-500 focus:border-purple-400 focus:outline-none"
        />
        <span className="text-xs text-gray-500">bvpoptica.com/{slug || "…"}</span>
      </label>

      <label className="flex flex-col gap-1 text-sm text-gray-300">
        Label
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Card title"
          required
          className="rounded-lg border border-purple-500/30 bg-black/40 px-3 py-2 text-white placeholder:text-gray-500 focus:border-purple-400 focus:outline-none"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm text-gray-300">
        URL
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://…"
          required
          className="rounded-lg border border-purple-500/30 bg-black/40 px-3 py-2 text-white placeholder:text-gray-500 focus:border-purple-400 focus:outline-none"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm text-gray-300">
        Description
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Optional subtext"
          className="rounded-lg border border-purple-500/30 bg-black/40 px-3 py-2 text-white placeholder:text-gray-500 focus:border-purple-400 focus:outline-none"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm text-gray-300">
        Icon
        <select
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
          className="rounded-lg border border-purple-500/30 bg-black/40 px-3 py-2 text-white focus:border-purple-400 focus:outline-none"
        >
          <option value="">None</option>
          {ICON_KEYS.map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      </label>

      <div className="flex gap-4">
        <label className="flex items-center gap-2 text-sm text-gray-300">
          <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
          Featured (pinned to top)
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-300">
          <input type="checkbox" checked={hidden} onChange={(e) => setHidden(e.target.checked)} />
          Hidden (short link only)
        </label>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="mt-2 flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg px-4 py-2 text-sm text-gray-300 hover:text-white"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-purple-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-purple-400 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}
