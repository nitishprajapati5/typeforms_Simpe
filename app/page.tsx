"use client";

import { Button } from "@/components/ui/button";
import { FormIcon } from "lucide-react";
import Image from "next/image";
import { easeInOut, motion } from "framer-motion";
import TypewriterLoop from "./_ClientComponents/TypewriterText";
import AnimatedFormIcon from "./_ClientComponents/FormRotating";
import  { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: easeInOut,
      },
    },
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-zinc-900 font-sans w-full">
      <header className="sticky top-0 z-50 flex flex-col sm:flex-row items-center justify-between gap-4 px-4 sm:px-6 py-4 backdrop-blur bg-white/70 dark:bg-zinc-900/70">
        <div className="flex items-center gap-2">
          <FormIcon className="text-amber-500" />
          <span className="text-lg sm:text-xl font-bold text-zinc-800 dark:text-zinc-200">
            Forms Build Easy
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          <Button size="lg" className="shadow-lg" onClick={() => router.push("/login")}>
            Login
          </Button>

          <Button size="lg" className="shadow-lg" onClick={() => router.push("/signup")}>
            Signup
          </Button>

          <Button size="lg" className="flex items-center gap-2 shadow-lg">
            <Image src="/google_icon.png" alt="Google" width={16} height={16} />
            <span className="hidden sm:inline">Google</span>
          </Button>
        </div>
      </header>

      <motion.main
        className="
          flex flex-1 flex-col justify-center items-center
          bg-gray-100 dark:bg-zinc-800
          px-4 sm:px-6
          py-12 sm:py-20
          text-center
        "
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
<motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.6 }}
  className="mb-10"
>
  <AnimatedFormIcon />
</motion.div>
        <motion.div
          variants={textVariants}
          className="
            rounded-xl
            px-3 sm:px-6 py-4
            hover:shadow-xl
            transition-all
          "
        >
          <TypewriterLoop
            texts={[
              "Build Forms Easily",
              "Create Survey Forms",
              "Track Responses in Real-Time",
              "Analyze Data Effortlessly",
              "Customize Form Designs",
              "Integrate with Other Tools",
              "Collaborate with Team Members",
            ]}
            className="
              block
              text-lg sm:text-2xl md:text-4xl
              font-semibold
              tracking-tight
              leading-snug sm:leading-tight
              max-w-xs sm:max-w-xl md:max-w-3xl
              mx-auto
              text-zinc-900 dark:text-zinc-100
            "
          />
        </motion.div>

        <div>
          <motion.p
            variants={textVariants}
            className="
              mt-6
              text-sm sm:text-base
              text-zinc-600 dark:text-zinc-300
              max-w-md sm:max-w-lg
              mx-auto
            "
          >
            Meet your smart form builder. Just type — it structures and designs
            everything for you. Make changes in plain language, instantly. No
            setup. No friction. Forms that move at startup speed.
          </motion.p>
        </div>

        {/* CTA */}
        <motion.div
          variants={textVariants}
          className="mt-8 flex flex-col sm:flex-row gap-4"
        >
          <Button size="lg" className="shadow-xl cursor-pointer">
            Get Started Free
          </Button>
        </motion.div>
      </motion.main>
    </div>
  );
}
