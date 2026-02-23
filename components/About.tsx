"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import { Monitor, Server, Layers, Network, Bot } from "lucide-react";

function IconNode({ icon: Icon, color, label }: { icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; color: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="flex items-center justify-center rounded-full border backdrop-blur-md"
        style={{
          width: 48,
          height: 48,
          borderColor: `${color}30`,
          backgroundColor: `${color}12`,
        }}
      >
        <Icon className="h-5 w-5" style={{ color }} />
      </div>
      <span
        className="whitespace-nowrap text-[10px] font-medium tracking-wide"
        style={{ color }}
      >
        {label}
      </span>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="relative w-full py-24 sm:py-32">
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-16">
        <div className="flex flex-col-reverse items-center gap-16 lg:flex-row lg:items-center lg:justify-between">
          {/* Left — Orbiting circles visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1.10 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="relative flex h-105 w-105 shrink-0 items-center justify-center"
          >
            {/* Center avatar */}
            <div className="relative z-10 flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border border-white/15 bg-white/5 shadow-2xl shadow-white/5 backdrop-blur-sm sm:h-32 sm:w-32">
              <Image
                src="/avatar.jpg"
                alt="Ayush Kumar Gupta"
                width={128}
                height={128}
                className="h-full w-full rounded-full object-cover crop-center"
              />
            </div>

            {/* Inner orbit */}
            <OrbitingCircles radius={100} duration={20} iconSize={60} path>
              <IconNode icon={Monitor} color="#60A5FA" label="Frontend" />
              <IconNode icon={Server} color="#34D399" label="Backend" />
              <IconNode icon={Layers} color="#A78BFA" label="Full Stack" />
            </OrbitingCircles>

            {/* Outer orbit — reverse direction */}
            <OrbitingCircles radius={170} duration={30} iconSize={60} reverse path>
              <IconNode icon={Network} color="#FBBF24" label="System Design" />
              <IconNode icon={Bot} color="#FB923C" label="AI" />
            </OrbitingCircles>
          </motion.div>

          {/* Right — About content */}
          <div className="max-w-lg space-y-5 text-center lg:text-left">
            {/* <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="font-mono text-sm tracking-widest text-muted-foreground uppercase"
            >
              About Me
            </motion.p> */}

            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl"
            >
              
              <span className="bg-linear-to-r from-white to-neutral-500 bg-clip-text text-transparent">
                Who I am & <br/>
                 What I offer
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              I&apos;m Ayush Kumar Gupta — a full-stack developer with a
              sharp eye for clean architecture and a deep love for solving
              hard problems. From crafting intuitive UIs to designing
              scalable backends, I build products that are fast, reliable,
              and a joy to use.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              Competitive programmer at heart, builder by habit — I thrive
              at the intersection of performance, design, and developer
              experience.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
