"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowDown, ArrowUp, Eye, EyeOff, Pencil, Plus, Star, Trash2, X } from "lucide-react";
import { toLinkItem } from "@/lib/links/links";
import { LinkInput, LinkRecord } from "@/lib/links/types";
import LinkForm from "./LinkForm";
import LinkCard from "@/components/links/LinkCard";

interface AdminClientProps {
  initialLinks: LinkRecord[];
}

export default function AdminClient({ initialLinks }: AdminClientProps) {
  const router = useRouter();
  const [links, setLinks] = useState<LinkRecord[]>(initialLinks);
  const [editing, setEditing] = useState<LinkRecord | "new" | null>(null);
  const [pendingDelete, setPendingDelete] = useState<LinkRecord | null>(null);

  const previewLinks = useMemo(
    () =>
      links
        .filter((l) => !l.hidden)
        .sort((a, b) => Number(b.featured) - Number(a.featured) || a.sortOrder - b.sortOrder)
        .map(toLinkItem),
    [links]
  );

  async function refresh() {
    const res = await fetch("/api/admin/links");
    const body = await res.json();
    setLinks(body.links);
  }

  async function handleSave(input: LinkInput): Promise<string | void> {
    const isNew = editing === "new";
    const res = await fetch(isNew ? "/api/admin/links" : `/api/admin/links/${(editing as LinkRecord).id}`, {
      method: isNew ? "POST" : "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      return body.error ?? "Something went wrong";
    }

    setEditing(null);
    await refresh();
  }

  async function handleDelete() {
    if (!pendingDelete) return;
    await fetch(`/api/admin/links/${pendingDelete.id}`, { method: "DELETE" });
    setPendingDelete(null);
    await refresh();
  }

  async function handleToggle(link: LinkRecord, field: "featured" | "hidden") {
    await fetch(`/api/admin/links/${link.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...link, [field]: !link[field] }),
    });
    await refresh();
  }

  async function handleMove(index: number, direction: -1 | 1) {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= links.length) return;

    const reordered = [...links];
    [reordered[index], reordered[targetIndex]] = [reordered[targetIndex], reordered[index]];
    setLinks(reordered);

    await fetch("/api/admin/links/reorder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderedIds: reordered.map((l) => l.id) }),
    });
    await refresh();
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[#0a0118] px-4 pt-24 pb-8 sm:px-8 sm:pt-28">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-white">Manage Links</h1>
          <p className="text-sm text-gray-400">Changes go live on /links immediately.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setEditing("new")}
            className="flex items-center gap-1.5 rounded-lg bg-purple-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-purple-400"
          >
            <Plus className="h-4 w-4" /> Add Link
          </button>
          <button
            onClick={handleLogout}
            className="rounded-lg border border-purple-500/30 px-4 py-2 text-sm text-gray-300 hover:text-white"
          >
            Log out
          </button>
        </div>
      </div>

      <div className="mx-auto mt-8 grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
        {/* Editable list */}
        <div className="flex flex-col gap-3">
          {links.length === 0 && (
            <p className="text-sm text-gray-500">No links yet — add one to get started.</p>
          )}
          {links.map((link, index) => (
            <div
              key={link.id}
              className="flex items-center gap-3 rounded-xl border border-purple-500/30 bg-black/40 p-3 sm:p-4"
            >
              <div className="flex flex-col">
                <button
                  onClick={() => handleMove(index, -1)}
                  disabled={index === 0}
                  className="text-gray-400 hover:text-white disabled:opacity-20"
                  aria-label="Move up"
                >
                  <ArrowUp className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleMove(index, 1)}
                  disabled={index === links.length - 1}
                  className="text-gray-400 hover:text-white disabled:opacity-20"
                  aria-label="Move down"
                >
                  <ArrowDown className="h-4 w-4" />
                </button>
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-white">{link.label}</p>
                <p className="truncate text-xs text-gray-500">
                  /{link.slug} → {link.url}
                </p>
              </div>

              <button
                onClick={() => handleToggle(link, "featured")}
                title="Toggle featured"
                className={link.featured ? "text-yellow-400" : "text-gray-500 hover:text-white"}
              >
                <Star className="h-4 w-4" fill={link.featured ? "currentColor" : "none"} />
              </button>
              <button
                onClick={() => handleToggle(link, "hidden")}
                title="Toggle hidden"
                className={link.hidden ? "text-red-400" : "text-gray-500 hover:text-white"}
              >
                {link.hidden ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
              <button onClick={() => setEditing(link)} className="text-gray-400 hover:text-white">
                <Pencil className="h-4 w-4" />
              </button>
              <button onClick={() => setPendingDelete(link)} className="text-gray-400 hover:text-red-400">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Live preview of /links */}
        <div className="lg:sticky lg:top-8 lg:self-start">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
            Live preview — /links
          </p>
          <div className="rounded-2xl border border-purple-500/20 bg-black/60 p-4">
            <div className="flex flex-col gap-3">
              {previewLinks.map((link, index) => (
                <LinkCard key={link.slug} link={link} index={index} />
              ))}
              {previewLinks.length === 0 && (
                <p className="text-sm text-gray-500">Nothing to show — every link is hidden.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add/edit dialog */}
      <Dialog.Root open={editing !== null} onOpenChange={(open) => !open && setEditing(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/70" />
          <Dialog.Content className="fixed left-1/2 top-1/2 w-[min(90vw,440px)] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-purple-500/30 bg-[#12061f] p-6">
            <div className="mb-4 flex items-center justify-between">
              <Dialog.Title className="font-heading text-lg font-bold text-white">
                {editing === "new" ? "Add Link" : "Edit Link"}
              </Dialog.Title>
              <Dialog.Close className="text-gray-400 hover:text-white">
                <X className="h-5 w-5" />
              </Dialog.Close>
            </div>
            {editing && (
              <LinkForm
                initial={editing === "new" ? undefined : editing}
                onSubmit={handleSave}
                onCancel={() => setEditing(null)}
              />
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Delete confirm */}
      <Dialog.Root open={pendingDelete !== null} onOpenChange={(open) => !open && setPendingDelete(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/70" />
          <Dialog.Content className="fixed left-1/2 top-1/2 w-[min(90vw,380px)] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-purple-500/30 bg-[#12061f] p-6">
            <Dialog.Title className="font-heading text-lg font-bold text-white">Delete link?</Dialog.Title>
            <p className="mt-2 text-sm text-gray-400">
              This removes <span className="text-white">{pendingDelete?.label}</span> and its short link
              (/{pendingDelete?.slug}). This can&apos;t be undone.
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setPendingDelete(null)}
                className="rounded-lg px-4 py-2 text-sm text-gray-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-400"
              >
                Delete
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
