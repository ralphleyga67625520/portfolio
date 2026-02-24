"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { motion, useInView } from "motion/react";
import { NumberTicker } from "@/components/ui/number-ticker";
import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import type { StatCardData, DifficultyBreakdown } from "./types";

/* ---- Animated difficulty bar ---- */

function DifficultyBar({ items }: { items: DifficultyBreakdown[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const total = items.reduce((s, d) => s + d.count, 0);

  return (
    <div ref={ref} className="mt-5 space-y-3">
      {/* Segmented bar */}
      <div className="flex h-2.5 gap-0.5 overflow-hidden rounded-full bg-white/[0.05]">
        {items.map((d, i) => (
          <motion.div
            key={d.label}
            className="rounded-full"
            style={{ backgroundColor: d.barColor }}
            initial={{ width: 0 }}
            animate={inView ? { width: `${(d.count / total) * 100}%` } : { width: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.2 + i * 0.15 }}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-1">
        {items.map((d) => (
          <div key={d.label} className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: d.barColor }} />
            <span className="text-xs text-muted-foreground">{d.label}</span>
            <NumberTicker value={d.count} delay={0.5} className="text-xs font-semibold text-neutral-300" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- Stat card ---- */

export function StatCard({ stat, index }: { stat: StatCardData; index: number }) {
  const Icon = stat.icon;

  return (
    <BlurFade delay={0.1 + index * 0.1} inView className="h-full">
      <motion.div
        className="group relative h-full overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] font-mono font-semibold"
        whileHover={{ y: -3 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {/* Top accent gradient line */}
        <div
          className="h-0.5 w-full transition-shadow duration-500"
          style={{
            background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)`,
          }}
        />

        {/* BorderBeam on prominent cards */}
        {stat.prominent && (
          <BorderBeam size={80} duration={6} colorFrom={stat.color} colorTo={stat.gradientTo} />
        )}

        <div className="flex h-full flex-col p-6">
          {/* Icon + Label */}
          <div className="mb-5 flex items-center gap-3">
            <motion.div
              className="flex h-10 w-10 items-center justify-center rounded-xl border backdrop-blur-sm"
              style={{ borderColor: `${stat.color}25`, backgroundColor: `${stat.color}10` }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <Icon className="h-5 w-5" style={{ color: stat.color }} />
            </motion.div>
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {stat.id}
            </span>
          </div>

          {/* Main content — split layout when badge image exists */}
          <div className={stat.badgeImage ? "flex items-end justify-between gap-4" : ""}>
            <div className="min-w-0 flex-1">
              {/* Big number */}
              <NumberTicker
                value={stat.value}
                delay={0.2 + index * 0.08}
                className={`mb-1.5 tabular-nums font-bold tracking-tight ${
                  stat.prominent ? "text-4xl lg:text-5xl" : "text-3xl lg:text-4xl"
                }`}
              />

              {/* Description */}
              <p className="text-sm text-muted-foreground">{stat.label}</p>

              {/* Secondary stat (e.g. contests attended) */}
              {stat.secondaryValue != null && (
                <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <NumberTicker value={stat.secondaryValue} delay={0.4} className="text-sm font-semibold text-neutral-300" />
                  <span>{stat.secondaryLabel}</span>
                </div>
              )}

              {/* Inline badge (text-only, no image) */}
              {stat.subLabel && !stat.badgeImage && (
                <div
                  className="mt-3 flex w-fit items-center gap-2 rounded-lg border px-3 py-1.5"
                  style={{ borderColor: `${stat.color}20`, backgroundColor: `${stat.color}08` }}
                >
                  <span className="text-xs font-semibold" style={{ color: stat.color }}>
                    {stat.subLabel}
                  </span>
                </div>
              )}
            </div>

            {/* Big badge with image — positioned on the right */}
            {stat.badgeImage && stat.subLabel && (
              <motion.div
                className="flex shrink-0 flex-col items-center gap-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 300, damping: 20 }}
              >
                <motion.div
                  className="relative flex h-16 w-16 items-center justify-center rounded-xl border-2 backdrop-blur-sm lg:h-20 lg:w-20"
                  style={{
                    borderColor: `${stat.color}30`,
                    backgroundColor: `${stat.color}08`,
                    boxShadow: `0 0 24px ${stat.color}15, 0 0 48px ${stat.color}08`,
                  }}
                  whileHover={{ scale: 1.08, rotate: 3 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  <Image
                    src={stat.badgeImage}
                    alt={stat.subLabel}
                    width={48}
                    height={48}
                    className="h-10 w-10 object-contain lg:h-12 lg:w-12"
                  />
                </motion.div>
                <span
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: stat.color }}
                >
                  {stat.subLabel}
                </span>
              </motion.div>
            )}
          </div>

          {/* Difficulty bar */}
          {stat.breakdown && <DifficultyBar items={stat.breakdown} />}

          {/* Profile link */}
          {stat.profileUrl && (
            <div className="mt-auto pt-4">
              <Link
                href={stat.profileUrl}
                target="_blank"
                className="group/link flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors"
                style={{ color: undefined }}
                onMouseEnter={(e) => (e.currentTarget.style.color = stat.color)}
                onMouseLeave={(e) => (e.currentTarget.style.color = '')}
              >
                View Profile
                <ExternalLink className="h-3 w-3 transition-transform group-hover/link:translate-x-0.5" />
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </BlurFade>
  );
}
