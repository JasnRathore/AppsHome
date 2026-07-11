"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { ChevronDown } from "lucide-react"
import { usePathname } from "next/navigation"

export function ScrollIndicator() {
  const pathname = usePathname()
  const [isAtBottom, setIsAtBottom] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight
      const winHeight = window.innerHeight
      const scrollBottom = docHeight - winHeight - scrollTop

      setIsAtBottom(scrollBottom < 32)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {!isAtBottom && (
        <motion.div
          key="scroll-indicator"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className={`pointer-events-none fixed bottom-6 left-1/2 z-[100] -translate-x-1/2`}
        >
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="flex flex-col items-center gap-1"
          >
            <div className="flex flex-col items-center gap-1.5 rounded-full border border-mobile-border bg-background/95 px-3.5 py-3 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-xl dark:border-white/20 dark:bg-black/90">
              {/* Two dots */}
              {[0, 0.2].map((delay, i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.2,
                    delay,
                    ease: "easeInOut",
                  }}
                  className="h-1.5 w-1.5 rounded-full bg-mobile-celadon"
                />
              ))}
              {/* Chevron */}
              <motion.div
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.2,
                  delay: 0.4,
                  ease: "easeInOut",
                }}
              >
                <ChevronDown className="h-4.5 w-4.5 text-mobile-celadon" strokeWidth={3.5} />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
