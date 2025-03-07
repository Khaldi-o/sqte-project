"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Mail, Phone, ArrowRight } from "lucide-react";

export default function Footer() {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer ref={footerRef} className="bg-black text-white py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-start"
          >
            <div className="mb-4">
              <Image
                src="/images/logo.jpg"
                alt="Logo SANS QUE TU ERRES"
                width={150}
                height={60}
                className="h-auto w-auto"
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="font-semibold text-yellow-500 mb-4 uppercase text-sm">
              Nos Pôles d'activités
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/poles/audiovisuel"
                  className="text-gray-300 hover:text-yellow-500 transition-colors flex items-center"
                >
                  <ArrowRight className="w-4 h-4 mr-2" />
                  <span>Pôle Audiovisuel</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/poles/musique"
                  className="text-gray-300 hover:text-yellow-500 transition-colors flex items-center"
                >
                  <ArrowRight className="w-4 h-4 mr-2" />
                  <span>Pôle Musique</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/poles/media"
                  className="text-gray-300 hover:text-yellow-500 transition-colors flex items-center"
                >
                  <ArrowRight className="w-4 h-4 mr-2" />
                  <span>Pôle Média</span>
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="font-semibold text-yellow-500 mb-4 uppercase text-sm">
              Découvrir
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/actualites"
                  className="text-gray-300 hover:text-yellow-500 transition-colors flex items-center"
                >
                  <ArrowRight className="w-4 h-4 mr-2" />
                  <span>Actualités</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/evenements"
                  className="text-gray-300 hover:text-yellow-500 transition-colors flex items-center"
                >
                  <ArrowRight className="w-4 h-4 mr-2" />
                  <span>Évènements</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/association"
                  className="text-gray-300 hover:text-yellow-500 transition-colors flex items-center"
                >
                  <ArrowRight className="w-4 h-4 mr-2" />
                  <span>Notre Association</span>
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="font-semibold text-yellow-500 mb-4 uppercase text-sm">
              Contact
            </h3>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-yellow-500" />
                <a
                  href="mailto:contact@sansquetuerres.org"
                  className="text-gray-300 hover:text-yellow-500 transition-colors"
                >
                  contact@sansquetuerres.org
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-yellow-500" />
                <a
                  href="tel:+33123456789"
                  className="text-gray-300 hover:text-yellow-500 transition-colors"
                >
                  01 23 45 67 89
                </a>
              </li>
            </ul>

            <h3 className="font-semibold text-yellow-500 mb-2 uppercase text-sm">
              Suivez-nous
            </h3>
            <div className="flex space-x-3">
              <a
                href="https://facebook.com/sqte"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-yellow-500 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com/sqte"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-yellow-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Séparateur */}
        <div className="border-t border-gray-800 my-6"></div>

        <motion.div
          className="flex flex-col md:flex-row justify-between items-center text-sm"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.p
            variants={itemVariants}
            className="text-gray-500 mb-4 md:mb-0"
          >
            © {new Date().getFullYear()} Association SANS QUE TU ERRES - Tous
            droits réservés
          </motion.p>
          <motion.div variants={itemVariants} className="flex space-x-6">
            <Link
              href="/mentions-legales"
              className="text-gray-500 hover:text-yellow-500 transition-colors"
            >
              Mentions Légales
            </Link>
            <Link
              href="/politique-confidentialite"
              className="text-gray-500 hover:text-yellow-500 transition-colors"
            >
              Politique de confidentialité
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
