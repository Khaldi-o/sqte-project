"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

export default function Footer() {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.3 });

  return (
    <motion.footer
      ref={footerRef}
      className="bg-black text-white py-6 w-full"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto text-center">
        <p className="text-sm md:text-base">
          Association SANS QUE TU ERRES -{" "}
          <Link href="/mentions-legales" className="hover:underline">
            Mentions Légales
          </Link>
        </p>
      </div>
      <div className="container mx-auto text-center">
        <p className="text-sm md:text-base">
          Nous contacter -{" "}
          <Link href="/facebook.com/sqte" className="hover:underline">
            Facebook
          </Link>
        </p>
      </div>
    </motion.footer>
  );
}
