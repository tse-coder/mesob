"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { SCROLL } from "@/lib/constants";

const Scene = dynamic(() => import("@/components/Scene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-[#0b0705]">
      <p className="animate-pulse text-sm tracking-[0.3em] text-amber-200/60">
        LOADING
      </p>
    </div>
  ),
});

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  useScrollAnimation(containerRef, hintRef);

  return (
    <div ref={containerRef} style={{ height: `${SCROLL.pages * 100}vh` }}>
      <div className="fixed inset-0">
        <Scene />
      </div>

      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(0, 0, 0, 0.55) 100%)",
        }}
      />

      <header className="pointer-events-none fixed top-8 left-1/2 -translate-x-1/2 text-center">
        <p className="text-lg font-medium tracking-[0.5em] text-amber-100/70">
          መሶብ
        </p>
      </header>

      <div
        ref={hintRef}
        className="pointer-events-none fixed bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <p className="text-[11px] tracking-[0.35em] text-amber-100/50">
          SCROLL TO REVEAL
        </p>
      </div>
    </div>
  );
}
