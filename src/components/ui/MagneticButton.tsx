"use client";

import { useRef, useState, useCallback } from "react";
import { motion } from "motion/react";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
}

export default function MagneticButton({
  children,
  className = "",
  href,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPos({ x: x * 0.35, y: y * 0.35 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setPos({ x: 0, y: 0 });
  }, []);

  const Comp = href ? "a" : "button";

  return (
    <motion.div
      ref={ref}
      className="magnetic-btn"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.5 }}
    >
      <Comp
        href={href}
        onClick={onClick}
        className={`magnetic-btn-inner ${className}`}
      >
        {children}
      </Comp>
    </motion.div>
  );
}
