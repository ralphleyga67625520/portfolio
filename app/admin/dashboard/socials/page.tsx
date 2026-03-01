"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, Save } from "lucide-react";

interface Social {
  _id: string;
  platform: string;
  url: string;
  order: number;
}

const emptySocial: Omit<Social, "_id"> = {
  platform: "",
  url: "",
  order: 0,
};

export default function SocialsAdmin() {
  const [items, setItems] = useState<Social[]>([]);
  const [editing, setEditing] = useState<Partial<Social> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [loading, setLoading] = useState(true);

  async function load() {
    const res = await fetch("/api/admin/socials");
    const data = await res.json();
    setItems(data);
    setLoading(false);
  }

  useEffect(() => {
    void (async () => {
      const res = await fetch("/api/admin/socials");
      const data = await res.json();
      setItems(data);
      setLoading(false);
    })();
  }, []);

  function startNew() {
    setEditing({ ...emptySocial, order: items.length });
    setIsNew(true);
  }

  function startEdit(item: Social) {
    setEditing({ ...item });
    setIsNew(false);
  }

  function cancel() { setEditing(null); setIsNew(false); }

  async function save() {
    if (!editing) return;
    if (isNew) {
      await fetch("/api/admin/socials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      });
    } else {
      await fetch(`/api/admin/socials/${editing._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      });
    }
    cancel();
    load();
  }

  async function remove(id: string) {
    if (!confirm("Delete this social?")) return;
    await fetch(`/api/admin/socials/${id}`, { method: "DELETE" });
    load();
  }

  if (loading) return <div className="animate-pulse text-neutral-500">Loading…</div>;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Socials</h1>
        <button onClick={startNew} className="flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium transition hover:bg-cyan-500">
          <Plus className="h-4 w-4" /> Add Social
        </button>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-lg rounded-xl border border-white/10 bg-neutral-900 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">{isNew ? "New Social" : "Edit Social"}</h2>
              <button onClick={cancel} className="text-neutral-400 hover:text-white"><X className="h-5 w-5" /></button>
            </div>
            <div className="space-y-4">
              <Field label="Platform (e.g. GitHub, LinkedIn, X)" value={editing.platform || ""} onChange={(v) => setEditing({ ...editing, platform: v })} />
              <Field label="URL" value={editing.url || ""} onChange={(v) => setEditing({ ...editing, url: v })} />
              <Field label="Order" value={String(editing.order ?? 0)} onChange={(v) => setEditing({ ...editing, order: Number(v) })} />
              <div className="flex gap-3 pt-2">
                <button onClick={save} className="flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium hover:bg-cyan-500">
                  <Save className="h-4 w-4" /> Save
                </button>
                <button onClick={cancel} className="rounded-lg border border-white/10 px-4 py-2 text-sm text-neutral-400 hover:text-white">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-white/10 bg-white/5">
            <tr>
              <th className="px-4 py-3 font-medium text-neutral-400">#</th>
              <th className="px-4 py-3 font-medium text-neutral-400">Platform</th>
              <th className="px-4 py-3 font-medium text-neutral-400">URL</th>
              <th className="px-4 py-3 text-right font-medium text-neutral-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={item._id} className="border-b border-white/5 transition hover:bg-white/3">
                <td className="px-4 py-3 text-neutral-500">{i + 1}</td>
                <td className="px-4 py-3 font-medium">{item.platform}</td>
                <td className="px-4 py-3 text-neutral-400 truncate max-w-64">{item.url}</td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => startEdit(item)} className="mr-2 text-neutral-400 hover:text-cyan-400"><Pencil className="h-4 w-4" /></button>
                  <button onClick={() => remove(item._id)} className="text-neutral-400 hover:text-red-400"><Trash2 className="h-4 w-4" /></button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan={4} className="px-4 py-8 text-center text-neutral-500">No socials yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-neutral-400">{label}</label>
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none transition focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30" />
    </div>
  );
}
