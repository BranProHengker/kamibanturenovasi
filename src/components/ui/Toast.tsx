"use client";

import { motion, AnimatePresence } from "motion/react";
import { LuCircleCheck, LuCircleX, LuInfo } from "react-icons/lu";

export type ToastType = "success" | "error" | "info";

export interface ToastProps {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContainerProps {
  toasts: ToastProps[];
  removeToast: (id: string) => void;
}

export default function ToastContainer({ toasts, removeToast }: ToastContainerProps) {
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-100 flex flex-col gap-2 pointer-events-none w-full max-w-sm px-4">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, y: -50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
            className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl shadow-lg border backdrop-blur-md ${
              toast.type === "success"
                ? "bg-green-50/90 border-green-200 text-green-800"
                : toast.type === "error"
                ? "bg-red-50/90 border-red-200 text-red-800"
                : "bg-blue-50/90 border-blue-200 text-blue-800"
            }`}
          >
            {toast.type === "success" && <LuCircleCheck className="w-5 h-5 shrink-0" />}
            {toast.type === "error" && <LuCircleX className="w-5 h-5 shrink-0" />}
            {toast.type === "info" && <LuInfo className="w-5 h-5 shrink-0" />}
            
            <p className="text-sm font-medium">{toast.message}</p>
            
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-auto p-1 rounded-full hover:bg-black/5 transition-colors"
            >
              <LuCircleX className="w-4 h-4 opacity-50 hover:opacity-100" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
