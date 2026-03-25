"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ServiceIcon } from "@/components/ServiceIcon";

type ServiceCardProps = {
  title: string;
  description: string;
  audience: string;
  icon: "rings" | "spark" | "vinyl" | "stage";
};

export function ServiceCard({ title, description, audience, icon }: ServiceCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink/60 p-6 shadow-lg shadow-black/20"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-neon-purple/10 via-transparent to-neon-blue/10 opacity-0 transition group-hover:opacity-100" />
      <div className="relative flex flex-1 flex-col">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-neon-pink/30 to-neon-blue/20 text-neon-blue ring-1 ring-white/10">
          <ServiceIcon name={icon} className="text-white" />
        </div>
        <h3 className="mt-4 font-display text-lg text-foreground">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
        <p className="mt-3 text-xs text-zinc-500">
          <span className="font-semibold text-zinc-400">Best for:</span> {audience}
        </p>
        <Link
          href="/contact"
          className="mt-5 inline-flex w-fit text-sm font-semibold text-neon-blue transition hover:text-violet-soft"
        >
          Inquire →
        </Link>
      </div>
    </motion.div>
  );
}
