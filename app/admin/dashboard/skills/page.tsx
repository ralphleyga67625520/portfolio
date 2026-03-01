"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, Save } from "lucide-react";

interface Skill {
  name: string;
  iconKey: string;
}

interface SkillCategory {
  _id: string;
  title: string;
  categoryIconKey: string;
  color: string;
  gradientFrom: string;
  gradientTo: string;
  gradientColor: string;
  span: string;
  skills: Skill[];
  order: number;
}

const emptyCategory: Omit<SkillCategory, "_id"> = {
  title: "",
  categoryIconKey: "Code2",
  color: "#F472B5",
  gradientFrom: "#F472B6",
  gradientTo: "#FBBF24",
  gradientColor: "#F472B6",
  span: "col-span-3 lg:col-span-1",
  skills: [],
  order: 0,
};

export default function SkillsAdmin() {
  const [items, setItems] = useState<SkillCategory[]>([]);
  const [editing, setEditing] = useState<Partial<SkillCategory> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [skillsInput, setSkillsInput] = useState("");
  const [loading, setLoading] = useState(true);

  async function load() {
    const res = await fetch("/api/admin/skills");
    const data = await res.json();
    setItems(data);
    setLoading(false);
  }

  useEffect(() => {
    void (async () => {
      const res = await fetch("/api/admin/skills");
      const data = await res.json();
      setItems(data);
      setLoading(false);
    })();
  }, []);

  function startNew() {
    setEditing({ ...emptyCategory, order: items.length });
    setSkillsInput("");
    setIsNew(true);
  }

  function startEdit(item: SkillCategory) {
    setEditing({ ...item });
    setSkillsInput(item.skills.map((s) => `${s.name}:${s.iconKey}`).join(", "));
    setIsNew(false);
  }

  function cancel() { setEditing(null); setIsNew(false); }

  async function save() {
    if (!editing) return;
    const skills = skillsInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .map((s) => {
        const [name, iconKey] = s.split(":").map((x) => x.trim());
        return { name, iconKey: iconKey || name.toLowerCase() };
      });

    const body = { ...editing, skills };

    if (isNew) {
      await fetch("/api/admin/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } else {
      await fetch(`/api/admin/skills/${editing._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    }
    cancel();
    load();
  }

  async function remove(id: string) {
    if (!confirm("Delete this skill category?")) return;
    await fetch(`/api/admin/skills/${id}`, { method: "DELETE" });
    load();
  }

  if (loading) return <div className="animate-pulse text-neutral-500">Loading…</div>;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Skill Categories</h1>
        <button onClick={startNew} className="flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium transition hover:bg-cyan-500">
          <Plus className="h-4 w-4" /> Add Category
        </button>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-white/10 bg-neutral-900 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">{isNew ? "New Category" : "Edit Category"}</h2>
              <button onClick={cancel} className="text-neutral-400 hover:text-white"><X className="h-5 w-5" /></button>
            </div>
            <div className="space-y-4">
              <Field label="Title" value={editing.title || ""} onChange={(v) => setEditing({ ...editing, title: v })} />
              <Field label="Category Icon Key (e.g. Code2, Monitor, Server)" value={editing.categoryIconKey || ""} onChange={(v) => setEditing({ ...editing, categoryIconKey: v })} />
              <div className="grid grid-cols-2 gap-4">
                <Field label="Color" value={editing.color || ""} onChange={(v) => setEditing({ ...editing, color: v })} />
                <Field label="Gradient From" value={editing.gradientFrom || ""} onChange={(v) => setEditing({ ...editing, gradientFrom: v })} />
                <Field label="Gradient To" value={editing.gradientTo || ""} onChange={(v) => setEditing({ ...editing, gradientTo: v })} />
                <Field label="Gradient Color" value={editing.gradientColor || ""} onChange={(v) => setEditing({ ...editing, gradientColor: v })} />
              </div>
              <Field label="Span Classes" value={editing.span || ""} onChange={(v) => setEditing({ ...editing, span: v })} />
              <div>
                <label className="mb-1 block text-xs font-medium text-neutral-400">
                  Skills (format: &quot;Name:iconKey&quot; comma-separated, e.g. &quot;React:react, Node.js:nodejs&quot;)
                </label>
                <textarea
                  value={skillsInput}
                  onChange={(e) => setSkillsInput(e.target.value)}
                  rows={3}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none transition focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30"
                />
              </div>
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
              <th className="px-4 py-3 font-medium text-neutral-400">Title</th>
              <th className="px-4 py-3 font-medium text-neutral-400">Skills</th>
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
                    {item.skills.map((s) => (
                      <span key={s.name} className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-neutral-300">{s.name}</span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="h-4 w-4 rounded-sm" style={{ backgroundColor: item.color }} />
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => startEdit(item)} className="mr-2 text-neutral-400 hover:text-cyan-400"><Pencil className="h-4 w-4" /></button>
                  <button onClick={() => remove(item._id)} className="text-neutral-400 hover:text-red-400"><Trash2 className="h-4 w-4" /></button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-neutral-500">No skill categories yet.</td></tr>
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
