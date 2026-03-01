"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, Save } from "lucide-react";

interface Project {
  _id: string;
  title: string;
  subtitle?: string;
  description: string;
  image?: string;
  video?: string;
  liveUrl?: string;
  githubUrl: string;
  tags: string[];
  accentColor: string;
  order: number;
}

const emptyProject: Omit<Project, "_id"> = {
  title: "",
  subtitle: "",
  description: "",
  image: "",
  video: "",
  liveUrl: "",
  githubUrl: "",
  tags: [],
  accentColor: "#3B82F6",
  order: 0,
};

export default function ProjectsAdmin() {
  const [items, setItems] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Partial<Project> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [tagsInput, setTagsInput] = useState("");
  const [loading, setLoading] = useState(true);

  async function load() {
    const res = await fetch("/api/admin/projects");
    const data = await res.json();
    setItems(data);
    setLoading(false);
  }

  useEffect(() => {
    void (async () => {
      const res = await fetch("/api/admin/projects");
      const data = await res.json();
      setItems(data);
      setLoading(false);
    })();
  }, []);

  function startNew() {
    setEditing({ ...emptyProject, order: items.length });
    setTagsInput("");
    setIsNew(true);
  }

  function startEdit(item: Project) {
    setEditing({ ...item });
    setTagsInput(item.tags.join(", "));
    setIsNew(false);
  }

  function cancel() {
    setEditing(null);
    setIsNew(false);
  }

  async function save() {
    if (!editing) return;
    const body = { ...editing, tags: tagsInput.split(",").map((t) => t.trim()).filter(Boolean) };

    if (isNew) {
      await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } else {
      await fetch(`/api/admin/projects/${editing._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    }
    cancel();
    load();
  }

  async function remove(id: string) {
    if (!confirm("Delete this project?")) return;
    await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
    load();
  }

  if (loading) return <div className="animate-pulse text-neutral-500">Loading…</div>;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Projects</h1>
        <button onClick={startNew} className="flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium transition hover:bg-cyan-500">
          <Plus className="h-4 w-4" /> Add Project
        </button>
      </div>

      {/* Editor Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-white/10 bg-neutral-900 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">{isNew ? "New Project" : "Edit Project"}</h2>
              <button onClick={cancel} className="text-neutral-400 hover:text-white"><X className="h-5 w-5" /></button>
            </div>
            <div className="space-y-4">
              <Field label="Title" value={editing.title || ""} onChange={(v) => setEditing({ ...editing, title: v })} />
              <Field label="Subtitle" value={editing.subtitle || ""} onChange={(v) => setEditing({ ...editing, subtitle: v })} />
              <Field label="Description" value={editing.description || ""} onChange={(v) => setEditing({ ...editing, description: v })} textarea />
              <Field label="Image URL" value={editing.image || ""} onChange={(v) => setEditing({ ...editing, image: v })} />
              <Field label="Video URL" value={editing.video || ""} onChange={(v) => setEditing({ ...editing, video: v })} />
              <Field label="Live URL" value={editing.liveUrl || ""} onChange={(v) => setEditing({ ...editing, liveUrl: v })} />
              <Field label="GitHub URL" value={editing.githubUrl || ""} onChange={(v) => setEditing({ ...editing, githubUrl: v })} />
              <Field label="Tags (comma-separated)" value={tagsInput} onChange={setTagsInput} />
              <div className="flex gap-4">
                <Field label="Accent Color" value={editing.accentColor || "#3B82F6"} onChange={(v) => setEditing({ ...editing, accentColor: v })} />
                <div>
                  <label className="mb-1 block text-xs text-neutral-400">Preview</label>
                  <div className="h-9 w-9 rounded-md border border-white/10" style={{ backgroundColor: editing.accentColor || "#3B82F6" }} />
                </div>
                <Field label="Order" value={String(editing.order ?? 0)} onChange={(v) => setEditing({ ...editing, order: Number(v) })} />
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={save} className="flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium hover:bg-cyan-500">
                  <Save className="h-4 w-4" /> Save
                </button>
                <button onClick={cancel} className="rounded-lg border border-white/10 px-4 py-2 text-sm text-neutral-400 hover:text-white">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-white/10 bg-white/5">
            <tr>
              <th className="px-4 py-3 font-medium text-neutral-400">#</th>
              <th className="px-4 py-3 font-medium text-neutral-400">Title</th>
              <th className="px-4 py-3 font-medium text-neutral-400">Tags</th>
              <th className="px-4 py-3 font-medium text-neutral-400">Color</th>
              <th className="px-4 py-3 text-right font-medium text-neutral-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={item._id} className="border-b border-white/5 transition hover:bg-white/3">
                <td className="px-4 py-3 text-neutral-500">{i + 1}</td>
                <td className="px-4 py-3 font-medium">{item.title}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {item.tags.slice(0, 3).map((t) => (
                      <span key={t} className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-neutral-300">{t}</span>
                    ))}
                    {item.tags.length > 3 && <span className="text-xs text-neutral-500">+{item.tags.length - 3}</span>}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="h-4 w-4 rounded-sm" style={{ backgroundColor: item.accentColor }} />
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => startEdit(item)} className="mr-2 text-neutral-400 hover:text-cyan-400"><Pencil className="h-4 w-4" /></button>
                  <button onClick={() => remove(item._id)} className="text-neutral-400 hover:text-red-400"><Trash2 className="h-4 w-4" /></button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-neutral-500">No projects yet. Click &quot;Add Project&quot; to create one.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* Reusable field component */
function Field({ label, value, onChange, textarea }: { label: string; value: string; onChange: (v: string) => void; textarea?: boolean }) {
  const cls = "w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none transition focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30";
  return (
    <div className="flex-1">
      <label className="mb-1 block text-xs font-medium text-neutral-400">{label}</label>
      {textarea ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3} className={cls} />
      ) : (
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className={cls} />
      )}
    </div>
  );
}
