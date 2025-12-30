"use client";

import { motion } from "framer-motion";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full bg-gray-50 dark:bg-zinc-900">
      
      <div className="w-full md:w-1/2 bg-amber-400 flex items-center justify-center py-10">
        <div className="flex flex-col space-y-4 text-center md:text-left px-6">
          <motion.p className="text-2xl font-semibold italic">
            Build forms that work.
          </motion.p>
          <motion.p className="text-2xl font-semibold italic">
            Type your idea.
          </motion.p>
          <motion.p className="text-2xl font-semibold italic">
            We handle the rest.
          </motion.p>
          <motion.p className="text-2xl font-semibold italic">
            Launch in minutes.
          </motion.p>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex flex-col items-center justify-center px-4 mt-8 md:mt-0">
        {children}
      </div>

    </div>
  );
}
