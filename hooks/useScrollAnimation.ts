"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollState } from "@/lib/scrollState";
import { SCROLL } from "@/lib/constants";

export function useScrollAnimation(
  containerRef: RefObject<HTMLDivElement | null>,
  hintRef?: RefObject<HTMLDivElement | null>,
) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        scrollState,
        { progress: 0 },
        {
          progress: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: SCROLL.scrub,
          },
        },
      );

      if (hintRef?.current) {
        gsap.to(hintRef.current, {
          autoAlpha: 0,
          ease: "none",
          scrollTrigger: {
            start: 0,
            end: () => window.innerHeight * 0.4,
            scrub: true,
          },
        });
      }
    });

    return () => {
      ctx.revert();
      scrollState.progress = 0;
    };
  }, [containerRef, hintRef]);
}
