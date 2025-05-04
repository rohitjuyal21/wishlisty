"use client";

import { motion } from "framer-motion";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
}

export function TestimonialCard({ quote, author, role }: TestimonialCardProps) {
  return (
    <motion.div
      className="to-muted/60 rounded-2xl border bg-gradient-to-br from-transparent p-6 transition-colors hover:border-blue-500/50"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-4 text-blue-400">
        <svg
          width="45"
          height="36"
          viewBox="0 0 45 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.5 18H9C9 12.477 13.477 8 19 8V12C15.686 12 13 14.686 13 18V18.5C13 19.328 13.672 20 14.5 20H18.5C19.328 20 20 20.672 20 21.5V25.5C20 26.328 19.328 27 18.5 27H14.5C13.672 27 13 26.328 13 25.5V18H13.5ZM31.5 18H27C27 12.477 31.477 8 37 8V12C33.686 12 31 14.686 31 18V18.5C31 19.328 31.672 20 32.5 20H36.5C37.328 20 38 20.672 38 21.5V25.5C38 26.328 37.328 27 36.5 27H32.5C31.672 27 31 26.328 31 25.5V18H31.5Z"
            fill="currentColor"
          />
        </svg>
      </div>
      <p className="text-muted-foreground mb-6">{quote}</p>
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-400" />
        <div>
          <p className="font-medium">{author}</p>
          <p className="text-muted-foreground text-sm">{role}</p>
        </div>
      </div>
    </motion.div>
  );
}
