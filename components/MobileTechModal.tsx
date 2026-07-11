"use client"

import { motion, AnimatePresence } from "motion/react"
import Image from "next/image"
import { Plus } from "@/components/animate-ui/icons/plus"

export interface TechItem {
  alt: string;
  src: string;
  description: string;
  category: string;
  level: string;
}

interface MobileTechModalProps {
  selectedTech: TechItem | null;
  onClose: () => void;
}

export function MobileTechModal({ selectedTech, onClose }: MobileTechModalProps) {
  return (
    <AnimatePresence>
      {selectedTech && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm xl:hidden"
          />
          
          {/* Bottom Sheet Container */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 z-50 flex flex-col overflow-hidden rounded-t-[2.5rem] bg-mobile-bg text-mobile-text shadow-2xl xl:hidden font-mono"
          >
            {/* Handle for touch indication */}
            <div className="flex w-full cursor-pointer justify-center pt-4 pb-2" onClick={onClose}>
              <div className="h-1.5 w-12 rounded-full bg-mobile-border" />
            </div>

            <div className="flex flex-col px-6 pb-12 pt-2">
              <div className="flex items-center justify-between pb-6 border-b border-mobile-border">
                <div className="flex items-center gap-4">
                    <div className="relative flex aspect-square h-16 shrink-0 items-center justify-center overflow-hidden rounded-[1.1rem] border border-mobile-border bg-mobile-surface-strong">
                        <Image
                            fill
                            alt={selectedTech.alt}
                            src={selectedTech.src}
                            className="object-contain p-3"
                        />
                    </div>
                    <div>
                        <h2 className="text-[1.5rem] font-semibold leading-tight tracking-[-0.05em] dark:text-shadow-xs dark:text-shadow-zinc-900">
                            {selectedTech.alt}
                        </h2>
                        <span className="text-[0.8rem] text-mobile-text-soft">Technology</span>
                    </div>
                </div>
                <button
                  onClick={onClose}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-mobile-border bg-mobile-surface-strong"
                >
                  <Plus className="rotate-45 text-mobile-text" />
                </button>
              </div>

              <div className="mt-6 flex flex-col gap-6">
                <p className="text-[0.96rem] leading-snug opacity-90">
                  {selectedTech.description}
                </p>

                <div className="flex items-center gap-8">
                    <div className="flex flex-col gap-1">
                        <span className="text-[0.75rem] uppercase tracking-wider text-mobile-text-soft">
                            Category
                        </span>
                        <span className="text-[1.1rem] font-medium">
                            {selectedTech.category}
                        </span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-[0.75rem] uppercase tracking-wider text-mobile-text-soft">
                            Experience
                        </span>
                        <span className="text-[1.1rem] font-medium">
                            {selectedTech.level}
                        </span>
                    </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
