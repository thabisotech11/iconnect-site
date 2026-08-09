"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Container({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("container-page", className)}>{children}</div>;
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  light?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  light,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2
        className={cn(
          "text-balance text-3xl font-semibold leading-[1.1] sm:text-4xl lg:text-[2.75rem]",
          light ? "text-canvas" : "text-ink"
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn("mt-4 text-balance text-base leading-relaxed sm:text-lg", light ? "text-canvas/70" : "text-ink-soft")}>
          {description}
        </p>
      )}
    </Reveal>
  );
}

/** Fade-and-rise scroll reveal. Respects prefers-reduced-motion via globals.css. */
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li";
  style?: React.CSSProperties;
}) {
  const Component = motion[as];
  return (
    <Component
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      style={style}
    >
      {children}
    </Component>
  );
}

/** Stagger container — pair with <Reveal as="li"> children. */
export function StaggerGroup({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
