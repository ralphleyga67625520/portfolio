"use client";

import { motion } from "motion/react";
import { LineShadowText } from "./ui/line-shadow-text";
import { Particles } from "./ui/particles";

export default function Hero() {
  return (
    <section id="#" className="relative flex min-h-screen w-full items-center overflow-hidden">
      {/* Subtle grid overlay */}
      {/* <div className="grid-overlay pointer-events-none absolute inset-0" /> */}
     
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24 sm:px-10 lg:px-16">
        <div className="flex flex-col items-center gap-16 lg:flex-row lg:items-center lg:justify-between">
          {/* Left — Text content */}
          <div className="max-w-xl space-y-6 text-center lg:text-left">
            {/* Greeting tag */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-mono text-sm tracking-widest text-muted-foreground uppercase"
            >
              Hey, I&apos;m
            </motion.p>

            {/* Name — large headline */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <LineShadowText
                className="text-5xl leading-none font-bold  italic sm:text-6xl md:text-7xl lg:text-8xl"
                shadowColor="white"
              >
                Ayush
              </LineShadowText>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-lg leading-relaxed text-muted-foreground sm:text-xl"
            >
              Full-stack developer who turns ideas into fast, polished
              products&nbsp;&mdash; one clean commit at a time.
            </motion.p>

            {/* CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-4 pt-2 lg:justify-start"
            >
              <a
                href="#projects"
                className="inline-flex h-10 items-center rounded-lg bg-white px-5 text-sm font-medium text-black transition-colors hover:bg-neutral-200"
              >
                View Work
              </a>
              <a
                href="#contact"
                className="inline-flex h-10 items-center rounded-lg border border-white/10 px-5 text-sm font-medium text-neutral-300 transition-colors hover:bg-white/5"
              >
                Get in Touch
              </a>
            </motion.div>
          </div>

          {/* Right — Visual placeholder (photo / Spline 3D) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex shrink-0 items-center justify-center"
          >
            {/*
              Replace the placeholder below with either:
              1. <Image src="/your-photo.jpg" … />
              2. <Spline scene="…" />   (from @splinetool/react-spline)
            */}
            <div className="relative flex h-64 w-64 items-center justify-center rounded-3xl border border-white/10 bg-white/3 backdrop-blur-sm sm:h-80 sm:w-80 lg:h-96 lg:w-96">
              {/* Decorative glow ring */}
              <div className="absolute -inset-px -z-10 rounded-3xl bg-linear-to-br from-white/10 via-transparent to-white/5 blur-sm" />

              <span className="select-none font-mono text-xs tracking-wider text-neutral-500">
                your visual here
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
