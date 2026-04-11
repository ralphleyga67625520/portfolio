"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, Save } from "lucide-react";

interface ExperienceItem {
  _id: string;
  role: string;
  company: string;
  companyUrl?: string;
  duration: string;
  description: string[];
  upcoming: boolean;
  accentColor: string;
  order: number;
}

const emptyItem: Omit<ExperienceItem, "_id"> = {
  role: "",
  company: "",
  companyUrl: "",
  duration: "",
  description: [""],
  upcoming: false,
  accentColor: "#3B82F6",
  order: 0,
};

export default function ExperienceAdmin() {
  const [items, setItems] = useState<ExperienceItem[]>([]);
  const [editing, setEditing] = useState<Partial<ExperienceItem> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [loading, setLoading] = useState(true);

  async function load() {
    const res = await fetch("/api/admin/experience");
    const data = await res.json();
    setItems(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  function startNew() {
    setEditing({ ...emptyItem, description: [""], order: items.length });
    setIsNew(true);
  }

  function startEdit(item: ExperienceItem) {
    setEditing({ ...item, description: [...item.description] });
    setIsNew(false);
  }

  function cancel() {
    setEditing(null);
    setIsNew(false);
  }

  async function save() {
    if (!editing) return;
    // Filter out empty description bullets
    const payload = {
      ...editing,
      description: (editing.description || []).filter((d) => d.trim() !== ""),
    };

    if (isNew) {
      await fetch("/api/admin/experience", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch(`/api/admin/experience/${editing._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }
    cancel();
    load();
  }

  async function remove(id: string) {
    if (!confirm("Delete this experience?")) return;
    await fetch(`/api/admin/experience/${id}`, { method: "DELETE" });
    load();
  }

  function updateDescription(index: number, value: string) {
    if (!editing) return;
    const desc = [...(editing.description || [])];
    desc[index] = value;
    setEditing({ ...editing, description: desc });
  }

  function addBullet() {
    if (!editing) return;
    setEditing({
      ...editing,
      description: [...(editing.description || []), ""],
    });
  }

  function removeBullet(index: number) {
    if (!editing) return;
    const desc = [...(editing.description || [])];
    desc.splice(index, 1);
    setEditing({ ...editing, description: desc });
  }

  if (loading)
    return (
      <div className="animate-pulse text-neutral-500">Loading…</div>
    );

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Experience</h1>
        <button
          onClick={startNew}
          className="flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium transition hover:bg-cyan-500"
        >
          <Plus className="h-4 w-4" /> Add Experience
        </button>
      </div>

      {/* ---- Modal ---- */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl border border-white/10 bg-neutral-900 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">
                {isNew ? "New Experience" : "Edit Experience"}
              </h2>
              <button
                onClick={cancel}
                className="text-neutral-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <Field
                label="Role"
                value={editing.role || ""}
                onChange={(v) => setEditing({ ...editing, role: v })}
              />
              <Field
                label="Company"
                value={editing.company || ""}
                onChange={(v) => setEditing({ ...editing, company: v })}
              />
              <Field
                label="Company URL (optional)"
                value={editing.companyUrl || ""}
                onChange={(v) => setEditing({ ...editing, companyUrl: v })}
              />
              <Field
                label="Duration"
                value={editing.duration || ""}
                onChange={(v) => setEditing({ ...editing, duration: v })}
              />
              <Field
                label="Accent Color"
                value={editing.accentColor || "#3B82F6"}
                onChange={(v) => setEditing({ ...editing, accentColor: v })}
              />
              <Field
                label="Order"
                value={String(editing.order ?? 0)}
                onChange={(v) =>
                  setEditing({ ...editing, order: Number(v) })
                }
              />

              {/* Upcoming toggle */}
              <div className="flex items-center gap-3">
                <label className="text-xs font-medium text-neutral-400">
                  Upcoming
                </label>
                <button
                  type="button"
                  onClick={() =>
                    setEditing({ ...editing, upcoming: !editing.upcoming })
                  }
                  className={`relative h-6 w-11 rounded-full transition ${
                    editing.upcoming ? "bg-amber-500" : "bg-white/10"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                      editing.upcoming ? "translate-x-5" : ""
                    }`}
                  />
                </button>
              </div>

              {/* Description bullets */}
              <div>
                <label className="mb-1 block text-xs font-medium text-neutral-400">
                  Description Bullets
                </label>
                <div className="space-y-2">
                  {(editing.description || []).map((bullet, i) => (
                    <div key={i} className="flex gap-2">
                      <input
                        type="text"
                        value={bullet}
                        onChange={(e) => updateDescription(i, e.target.value)}
                        placeholder={`Bullet ${i + 1}`}
                        className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none transition focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30"
                      />
                      {(editing.description || []).length > 1 && (
                        <button
                          onClick={() => removeBullet(i)}
                          className="text-neutral-500 hover:text-red-400"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={addBullet}
                    className="text-xs text-cyan-400 hover:text-cyan-300"
                  >
                    + Add bullet
                  </button>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={save}
                  className="flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium hover:bg-cyan-500"
                >
                  <Save className="h-4 w-4" /> Save
                </button>
                <button
                  onClick={cancel}
                  className="rounded-lg border border-white/10 px-4 py-2 text-sm text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---- Table ---- */}
      <div className="overflow-hidden rounded-xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-white/10 bg-white/5">
            <tr>
              <th className="px-4 py-3 font-medium text-neutral-400">#</th>
              <th className="px-4 py-3 font-medium text-neutral-400">Role</th>
              <th className="px-4 py-3 font-medium text-neutral-400">
                Company
              </th>
              <th className="px-4 py-3 font-medium text-neutral-400">
                Duration
              </th>
              <th className="px-4 py-3 font-medium text-neutral-400">
                Status
              </th>
              <th className="px-4 py-3 text-right font-medium text-neutral-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr
                key={item._id}
                className="border-b border-white/5 transition hover:bg-white/3"
              >
                <td className="px-4 py-3 text-neutral-500">{i + 1}</td>
                <td className="px-4 py-3 font-medium">{item.role}</td>
                <td className="px-4 py-3 text-neutral-400">{item.company}</td>
                <td className="px-4 py-3 text-neutral-400">{item.duration}</td>
                <td className="px-4 py-3">
                  {item.upcoming ? (
                    <span className="rounded-md bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-400">
                      Upcoming
                    </span>
                  ) : (
                    <span className="rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-400">
                      Active
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => startEdit(item)}
                    className="mr-2 text-neutral-400 hover:text-cyan-400"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => remove(item._id)}
                    className="text-neutral-400 hover:text-red-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-8 text-center text-neutral-500"
                >
                  No experiences yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-neutral-400">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none transition focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30"
      />
    </div>
  );
}
