"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import {  carouselSlides  } from "@/lib/constants";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { cn } from "@/lib/utils";
import { ScholarshipAd } from "@/components/ui/ScholarshipAd";

export function CarouselSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 3500);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="w-full overflow-hidden bg-surface-container-low py-12 dark:bg-[#1e293b]/50">
      <div className="relative h-[320px] w-full md:h-[400px]">
        <AnimatePresence mode="wait">
          {carouselSlides.map(
            (slide, index) =>
              index === currentSlide && (
                <motion.div
                  key={slide.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className={cn(
                    "absolute inset-0 flex items-center justify-center",
                    slide.bgClass
                  )}
                >
                  <div className="mx-auto grid w-full max-w-[1280px] items-center gap-12 px-4 md:grid-cols-2 md:px-8">
                    <div className="space-y-4">
                      <span
                        className={cn(
                          "inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider",
                          slide.badgeClass
                        )}
                      >
                        {slide.badge}
                      </span>
                      <h2 className="text-3xl font-bold leading-tight text-on-surface md:text-5xl dark:text-white">
                        {slide.title}
                      </h2>
                      <p className="text-lg text-on-surface-variant dark:text-[#94a3b8]">
                        {slide.description}
                      </p>
                      <Link
                        href={slide.href}
                        className={cn(
                          "inline-block rounded-lg px-8 py-3 font-bold transition-transform",
                          slide.buttonClass
                        )}
                      >
                        {slide.buttonText}
                      </Link>
                    </div>
                    <div className="hidden justify-center md:flex w-full max-w-sm ml-auto">
                      <ScholarshipAd />
                    </div>
                  </div>
                </motion.div>
              )
          )}
        </AnimatePresence>

        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-surface-white/70 p-2 text-on-surface backdrop-blur transition-all hover:bg-surface-white dark:bg-[#1e293b]/70 dark:text-white dark:hover:bg-[#1e293b]"
          aria-label="Previous slide"
        >
          <MaterialIcon name="chevron_left" className="text-3xl" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-surface-white/70 p-2 text-on-surface backdrop-blur transition-all hover:bg-surface-white dark:bg-[#1e293b]/70 dark:text-white dark:hover:bg-[#1e293b]"
          aria-label="Next slide"
        >
          <MaterialIcon name="chevron_right" className="text-3xl" />
        </button>

        <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-3">
          {carouselSlides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goToSlide(index)}
              aria-label={`Slide ${index + 1}`}
              className={cn(
                "h-2.5 w-2.5 rounded-full transition-all duration-300",
                index === currentSlide ? "bg-primary w-6" : "bg-outline-variant"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

