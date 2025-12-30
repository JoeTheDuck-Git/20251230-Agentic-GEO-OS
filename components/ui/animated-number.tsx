"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedNumberProps {
  value: number;
  format?: "percent" | "decimal" | "integer";
  decimals?: number;
  durationMs?: number;
  className?: string;
}

// EaseOut function for smooth animation
function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

// Check if user prefers reduced motion
function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function AnimatedNumber({
  value,
  format = "integer",
  decimals = 0,
  durationMs = 800,
  className,
}: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const startValueRef = useRef(0);
  const shouldReduceMotion = useRef(prefersReducedMotion());

  // Format the value based on the format type
  function formatValue(num: number, fmt: string, dec: number): string {
    if (fmt === "percent") {
      return `${Math.round(num)}%`;
    } else if (fmt === "decimal") {
      return num.toFixed(dec);
    } else {
      return Math.round(num).toString();
    }
  }

  useEffect(() => {
    // Check reduced motion preference on mount and when value changes
    shouldReduceMotion.current = prefersReducedMotion();

    // If reduced motion is enabled, show final value immediately
    if (shouldReduceMotion.current) {
      setDisplayValue(value);
      setIsAnimating(false);
      return;
    }

    // Start animation
    setIsAnimating(true);
    startValueRef.current = displayValue;
    startTimeRef.current = null;

    const animate = (currentTime: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = currentTime;
      }

      const elapsed = currentTime - startTimeRef.current;
      const progress = Math.min(elapsed / durationMs, 1);
      const easedProgress = easeOut(progress);

      const currentValue =
        startValueRef.current +
        (value - startValueRef.current) * easedProgress;

      setDisplayValue(currentValue);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
        setDisplayValue(value);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [value, durationMs]);

  // Update reduced motion preference on window resize (in case user changes it)
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => {
      shouldReduceMotion.current = mediaQuery.matches;
      if (mediaQuery.matches) {
        setDisplayValue(value);
        setIsAnimating(false);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [value]);

  return (
    <span
      className={cn(className)}
      style={{
        opacity: shouldReduceMotion.current || !isAnimating ? 1 : 0,
        animation:
          shouldReduceMotion.current || !isAnimating
            ? undefined
            : "fadeIn 200ms ease-out 0ms forwards",
      }}
    >
      {formatValue(displayValue, format, decimals)}
    </span>
  );
}
