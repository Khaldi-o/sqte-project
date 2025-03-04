"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Heart } from "lucide-react";

export default function DonationSection() {
  return (
    <section className="bg-[#F43F5E] py-12 w-full">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-6">
          Faites un don pour supporter notre Association
        </h2>
        
        <motion.div 
          whileHover={{ scale: 1.1 }}
          animate={{ 
            scale: [1, 1.05, 1],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 2,
            repeatType: "loop"
          }}
          className="inline-block"
        >
          <Link 
            href="/donate" 
            className="bg-black text-white px-8 py-3 rounded-lg inline-flex items-center"
            aria-label="Support our association with a donation"
          >
            <Heart className="mr-2 h-5 w-5" /> Faire un don
          </Link>
        </motion.div>
      </div>
    </section>
  );
}