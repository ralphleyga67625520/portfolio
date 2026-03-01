"use client";

import { useEffect, useState } from "react";
import { Save } from "lucide-react";

interface AboutData {
  heading: string;
  paragraphs: string[];
}

export default function AboutAdmin() {
  const [data, setData] = useState<AboutData>({
    heading: "Who I am & What I offer",
    paragraphs: ["", ""],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/about")
      .then((r) => r.json())
      .then((d) => {
        if (d && d.heading) setData(d);
        setLoading(false);
      });
  }, []);

  async function save() {
    setSaving(true);
    await fetch("/api/admin/about", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function updateParagraph(index: number, value: string) {
    const p = [...data.paragraphs];
    p[index] = value;
    setData({ ...data, paragraphs: p });
  }

  function addParagraph() {
    setData({ ...data, paragraphs: [...data.paragraphs, ""] });
  }

  function removeParagraph(index: number) {
    setData({ ...data, paragraphs: data.paragraphs.filter((_, i) => i !== index) });
  }

  if (loading) return <div className="animate-pulse text-neutral-500">Loading…</div>;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">About Section</h1>
      <div className="max-w-xl space-y-4 rounded-xl border border-white/10 bg-white/5 p-6">
        <div>
          <label className="mb-1 block text-xs font-medium text-neutral-400">Heading</label>
          <input
            type="text"
            value={data.heading}
            onChange={(e) => setData({ ...data, heading: e.target.value })}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none transition focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30"
          />
        </div>

        <div className="space-y-3">
          <label className="block text-xs font-medium text-neutral-400">Paragraphs</label>
          {data.paragraphs.map((p, i) => (
            <div key={i} className="flex gap-2">
              <textarea
                value={p}
                onChange={(e) => updateParagraph(i, e.target.value)}
                rows={3}
                className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none transition focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30"
              />
              <button
                onClick={() => removeParagraph(i)}
                className="self-start rounded-lg border border-white/10 px-2 py-2 text-xs text-red-400 hover:bg-red-500/10"
              >
                ×
              </button>
            </div>
          ))}
          <button
            onClick={addParagraph}
            className="rounded-lg border border-dashed border-white/10 px-3 py-1.5 text-xs text-neutral-400 hover:border-white/20 hover:text-white"
          >
            + Add Paragraph
          </button>
        </div>

        <button
          onClick={save}
          disabled={saving}
          className="flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium transition hover:bg-cyan-500 disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          {saving ? "Saving…" : saved ? "Saved ✓" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
