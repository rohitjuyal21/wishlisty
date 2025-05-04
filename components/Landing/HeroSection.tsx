"use client";
import { ArrowRight } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <div className="mx-auto max-w-3xl space-y-8 text-center">
      <motion.button
        className="group relative inline-block cursor-pointer rounded-full bg-slate-800 p-px text-xs leading-6 font-semibold text-white no-underline shadow-2xl shadow-zinc-900"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="absolute inset-0 overflow-hidden rounded-full">
          <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </span>
        <div className="relative z-10 flex items-center space-x-2 rounded-full bg-zinc-950 px-4 py-0.5 ring-1 ring-white/10">
          <span>Never forget your wishlist items again</span>
        </div>
        <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-blue-400/0 via-blue-400/90 to-blue-400/0 transition-opacity duration-500 group-hover:opacity-40" />
      </motion.button>

      <motion.h1
        className="font-playfair text-4xl leading-tight font-bold md:text-5xl lg:text-6xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        From wishlist to purchase,{" "}
        <span className="bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text text-transparent">
          perfectly timed
        </span>
      </motion.h1>
      <motion.p
        className="text-muted-foreground mx-auto max-w-2xl text-lg md:text-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Save products you want, set a reminder date, and receive an email when
        it's time to treat yourself.
      </motion.p>
      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Button size="lg" className="group rounded-full" asChild>
          <Link href="/dashboard">
            Get Started{" "}
            <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Button>
      </motion.div>
    </div>
  );
}
