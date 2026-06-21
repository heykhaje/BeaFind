"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {  stats  } from "@/lib/constants";
import { formatNumber } from "@/lib/utils";

function AnimatedCounter({
  target,
  suffix = "",
  inView,
}: {
  target: number;
  suffix?: string;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const duration = 1500;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [inView, target]);

  return (
    <span>
      {formatNumber(count)}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="mx-auto max-w-[1280px] px-4 py-12 md:px-8">
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className="card-hover card-shadow rounded-xl border border-outline-variant bg-surface-white p-6 text-center dark:border-[#334155] dark:bg-[#1e293b]"
          >
            <span className="mb-1 block text-headline-lg font-bold text-primary">
              <AnimatedCounter target={stat.value} suffix={stat.suffix} inView={inView} />
            </span>
            <span className="text-label-md uppercase tracking-wider text-on-surface-variant dark:text-[#94a3b8]">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

