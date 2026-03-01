"use client";

import { motion } from "motion/react";

/* ------------------------------------------------------------------ */
/*  Shared shimmer block                                               */
/* ------------------------------------------------------------------ */

function Shimmer({ className }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-lg bg-white/4 ${className ?? ""}`}
    >
      <motion.div
        className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/6 to-transparent"
        animate={{ translateX: ["-100%", "100%"] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero Skeleton                                                      */
/* ------------------------------------------------------------------ */

export function HeroSkeleton() {
  return (
    <section className="relative flex min-h-screen w-full items-center overflow-hidden">
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24 sm:px-10 lg:px-16">
        <div className="flex flex-col items-center gap-16 lg:flex-row lg:items-center lg:justify-between">
          {/* Text side */}
          <div className="flex max-w-xl flex-col gap-6">
            <Shimmer className="h-4 w-28 rounded-md" />
            <Shimmer className="h-16 w-64 rounded-xl sm:h-20 sm:w-80" />
            <div className="space-y-2">
              <Shimmer className="h-5 w-full rounded-md" />
              <Shimmer className="h-5 w-4/5 rounded-md" />
            </div>
            <div className="flex gap-4 pt-2">
              <Shimmer className="h-10 w-28 rounded-lg" />
              <Shimmer className="h-10 w-32 rounded-lg" />
            </div>
          </div>
          {/* 3D area */}
          <Shimmer className="h-64 w-64 rounded-full sm:h-80 sm:w-80 lg:h-96 lg:w-96" />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  About Skeleton                                                     */
/* ------------------------------------------------------------------ */

export function AboutSkeleton() {
  return (
    <section className="relative w-full py-24 sm:py-32">
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-16">
        <div className="flex flex-col-reverse items-center gap-16 lg:flex-row lg:items-center lg:justify-between">
          {/* Orbiting area */}
          <Shimmer className="h-105 w-105 shrink-0 rounded-full" />
          {/* Text side */}
          <div className="flex max-w-lg flex-col gap-5">
            <Shimmer className="h-10 w-72 rounded-xl sm:h-12" />
            <div className="space-y-3">
              <Shimmer className="h-5 w-full rounded-md" />
              <Shimmer className="h-5 w-full rounded-md" />
              <Shimmer className="h-5 w-3/4 rounded-md" />
            </div>
            <div className="space-y-3">
              <Shimmer className="h-5 w-full rounded-md" />
              <Shimmer className="h-5 w-2/3 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Skills Skeleton                                                    */
/* ------------------------------------------------------------------ */

function SkillCardSkeleton({ wide }: { wide?: boolean }) {
  return (
    <div
      className={`${wide ? "col-span-2 lg:col-span-2" : "col-span-3 lg:col-span-1"} h-full`}
    >
      <div className="flex h-full min-h-50 flex-col rounded-2xl border border-white/6 bg-white/2 p-6">
        <div className="mb-5 flex items-center gap-3">
          <Shimmer className="h-10 w-10 rounded-xl" />
          <Shimmer className="h-4 w-32 rounded-md" />
        </div>
        <div className="mb-5 h-px w-full bg-white/6" />
        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: wide ? 4 : 3 }).map((_, i) => (
            <Shimmer key={i} className="h-18 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function SkillsSkeleton() {
  return (
    <section className="relative w-full py-24 sm:py-32">
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-16">
        <div className="mb-16 text-center">
          <Shimmer className="mx-auto h-10 w-56 rounded-xl sm:h-12" />
          <Shimmer className="mx-auto mt-4 h-5 w-80 rounded-md" />
        </div>
        <div className="grid auto-rows-auto grid-cols-1 gap-4 lg:grid-cols-3">
          <SkillCardSkeleton wide />
          <SkillCardSkeleton />
          <SkillCardSkeleton />
          <SkillCardSkeleton />
          <SkillCardSkeleton />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Projects Skeleton                                                  */
/* ------------------------------------------------------------------ */

function ProjectCardSkeleton() {
  return (
    <div className="flex h-full max-w-100 w-full flex-col overflow-hidden rounded-none border border-white/6 bg-white/2">
      <div className="p-1">
        <Shimmer className="aspect-16/10 w-full rounded-none" />
        <div className="flex flex-col gap-3 p-4 sm:p-5">
          <Shimmer className="h-5 w-3/4 rounded-md" />
          <div className="space-y-2">
            <Shimmer className="h-4 w-full rounded-md" />
            <Shimmer className="h-4 w-4/5 rounded-md" />
          </div>
          <div className="mt-auto flex gap-1.5 pt-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <Shimmer key={i} className="h-5 w-14 rounded-md" />
            ))}
          </div>
          <div className="mt-2 flex gap-3 border-t border-white/6 pt-3">
            <Shimmer className="h-7 w-28 rounded-lg" />
            <Shimmer className="h-7 w-24 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProjectsSkeleton() {
  return (
    <section className="relative w-full py-16 sm:py-24 lg:py-32">
      <div className="mx-auto w-full max-w-6xl px-8 sm:px-10 lg:px-16">
        <div className="mb-16 text-center">
          <Shimmer className="mx-auto h-10 w-64 rounded-xl sm:h-12" />
          <Shimmer className="mx-auto mt-4 h-5 w-96 rounded-md" />
        </div>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Certifications Skeleton                                            */
/* ------------------------------------------------------------------ */

function CertCardSkeleton() {
  return (
    <div className="relative flex w-full flex-col overflow-hidden rounded-tr-md rounded-bl-md border border-white/6 bg-white/2 sm:flex-row">
      {/* Image area */}
      <Shimmer className="aspect-4/3 w-full shrink-0 rounded-none sm:h-auto sm:w-56 md:w-64 lg:w-72" />
      {/* Content area */}
      <div className="flex flex-1 flex-col justify-center gap-4 p-5 sm:p-6 md:p-8">
        <div className="flex items-start gap-3">
          <Shimmer className="h-9 w-9 shrink-0 rounded-lg" />
          <Shimmer className="h-5 w-3/4 rounded-md" />
        </div>
        <Shimmer className="h-px w-16 rounded-none" />
        <Shimmer className="h-8 w-36 rounded-sm" />
      </div>
    </div>
  );
}

export function CertificationsSkeleton() {
  return (
    <section className="relative w-full py-16 sm:py-24 lg:py-32">
      <div className="mx-auto w-full max-w-4xl px-6 sm:px-10 lg:px-16">
        <div className="mb-16 text-center">
          <Shimmer className="mx-auto h-10 w-56 rounded-xl sm:h-12" />
          <Shimmer className="mx-auto mt-4 h-5 w-80 rounded-md" />
        </div>
        <div className="flex flex-col gap-6">
          <CertCardSkeleton />
          <CertCardSkeleton />
        </div>
      </div>
    </section>
  );
}
