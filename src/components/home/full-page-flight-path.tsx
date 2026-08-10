import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useSpring, useTransform, useMotionValueEvent, useMotionValue } from "framer-motion";
import { useRouter } from "next/navigation";

export function FullPageFlightPath() {
  const [pathStr, setPathStr] = useState("");
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const router = useRouter();

  const { scrollYProgress } = useScroll();

  const pathRef = useRef<SVGPathElement>(null);

  const planeX = useMotionValue(0);
  const planeY = useMotionValue(0);
  const planeRotate = useMotionValue(0);

  useEffect(() => {
    let lastWidth = 0;
    let lastHeight = 0;

    const updatePath = () => {
      const height = document.documentElement.scrollHeight || 4000;
      const width = window.innerWidth;

      // Only recalculate the path if the width changes, or if the height changes significantly.
      if (lastWidth === width && Math.abs(lastHeight - height) < 150) {
        return;
      }

      lastWidth = width;
      lastHeight = height;
      setWindowSize({ width, height });

      let L = Math.max(width * 0.08, 40);
      const R = Math.min(width * 0.92, width - 40);

      let topOffset = 100;

      // Try to find the exact position of the "A" in Aviation Minds
      const heading = document.getElementById("hero-heading");
      if (heading) {
        const rect = heading.getBoundingClientRect();
        const absoluteTop = rect.top + window.scrollY;
        // Position exactly to the left of the 'A', vertically aligned with the middle of the 'A'
        L = rect.left - 50;
        topOffset = absoluteTop + 10;
      }

      const bottomOffset = 450;
      const usableHeight = height - topOffset - bottomOffset;

      const step = 800;
      const sweeps = Math.ceil(usableHeight / step);

      let p = `M ${L} ${topOffset}`;

      for (let i = 0; i < sweeps; i++) {
        const startY = topOffset + (i * step);
        const expectedEndY = topOffset + ((i + 1) * step);
        const endY = Math.min(expectedEndY, height - bottomOffset);

        const startX = i % 2 === 0 ? L : R;
        const endX = i % 2 === 0 ? R : L;

        // For the very first takeoff from the "A", we pull the curve horizontally so it flies right.
        // For all other connections, we pull vertically so the sweeps connect with perfect smoothness (no sharp corners!)
        const curveStrength = (R - L) * 0.7;
        const cp1X = (i === 0) ? startX + curveStrength : startX;
        const cp1Y = (i === 0) ? startY : startY + (endY - startY) * 0.5;

        const cp2X = endX;
        const cp2Y = startY + (endY - startY) * 0.5;

        p += ` C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`;
      }

      setPathStr(p);

      // Force sync the plane position immediately after the new path is calculated
      setTimeout(() => {
        if (pathRef.current) {
          const pathLength = pathRef.current.getTotalLength();
          if (pathLength > 0) {
            const distance = Math.max(0, Math.min(1, scrollYProgress.get())) * pathLength;
            const point = pathRef.current.getPointAtLength(distance);
            planeX.set(point.x);
            planeY.set(point.y);
          }
        }
      }, 10);
    };

    updatePath();
    // Recalculate after the hero text finishes its entrance animation to get exact coordinates
    const animTimeout = setTimeout(updatePath, 1500);

    window.addEventListener("resize", updatePath);

    const observer = new ResizeObserver(updatePath);
    observer.observe(document.body);

    return () => {
      clearTimeout(animTimeout);
      window.removeEventListener("resize", updatePath);
      observer.disconnect();
    };
  }, []);

  // Sync the plane's position exactly to the raw scroll to eliminate lag,
  // but we'll use CSS micro-transitions on the plane itself for smooth ticks!
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (pathRef.current) {
      const pathLength = pathRef.current.getTotalLength();
      if (pathLength === 0) return;

      // Clamp between 0 and 1 to prevent Safari out-of-bounds bouncing
      const clampedLatest = Math.max(0, Math.min(1, latest));
      const distance = clampedLatest * pathLength;

      const point = pathRef.current.getPointAtLength(distance);
      planeX.set(point.x);
      planeY.set(point.y);

      // Calculate rotation based on the next point to angle it forward
      if (distance + 1 < pathLength) {
        const nextPoint = pathRef.current.getPointAtLength(distance + 1);
        const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * (180 / Math.PI);
        planeRotate.set(angle);
      }
    }
  });

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push("/academy");
  };

  if (!pathStr || windowSize.width === 0) return null;

  return (
    <>
      {/* BACKGROUND LINE: z-0 so it stays behind information cards and text! */}
      <div
        className="absolute top-0 left-0 w-full z-0 pointer-events-none overflow-hidden"
        style={{ height: windowSize.height }}
      >
        <svg className="w-full h-full overflow-visible absolute top-0 left-0" fill="none">
          <path
            ref={pathRef}
            d={pathStr}
            style={{ stroke: 'var(--primary)' }}
            className="opacity-40"
            strokeWidth="3"
            strokeDasharray="24 16"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* FOREGROUND PLANE: z-[5] so it hides behind the Hero text but flies over the background */}
      <div
        className="absolute top-0 left-0 w-full z-[5] pointer-events-none"
        style={{ height: windowSize.height }}
      >
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {/* The Plane itself */}
          <motion.div
            style={{
              x: planeX,
              y: planeY,
              rotate: planeRotate,
              marginLeft: "-32px",
              marginTop: "-32px",
              color: "var(--primary)"
            }}
            className="absolute top-0 left-0 w-16 h-16 flex items-center justify-center drop-shadow-[0_4px_12px_rgba(0,48,135,0.4)]"
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="rotate-45">
              <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </motion.div>
        </div>
      </div>
    </>
  );
}
