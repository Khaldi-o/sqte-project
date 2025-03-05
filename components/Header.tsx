"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Facebook, Instagram } from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = {
  title: string;
  href: string;
  subItems?: { title: string; href: string }[];
};

const navItems: NavItem[] = [
  {
    title: "ACTUALITÉS",
    href: "/actualites",
  },
  {
    title: "LES PÔLES D'ACTIVITÉS",
    href: "/poles",
    subItems: [
      { title: "Pôle Audiovisuel", href: "/poles/audiovisuel" },
      { title: "Pôle Musique", href: "/poles/musique" },
      { title: "Pôle Média", href: "/poles/media" },
    ],
  },
  {
    title: "ÉVÉNEMENTS",
    href: "/evenements",
    subItems: [
      { title: "Sous-menu 1", href: "/evenements/sous-menu-1" },
      { title: "Sous-menu 2", href: "/evenements/sous-menu-2" },
      { title: "Sous-menu 3", href: "/evenements/sous-menu-3" },
    ],
  },
  {
    title: "NOTRE ASSOCIATION",
    href: "/association",
    subItems: [
      { title: "Sous-menu 1", href: "/association/sous-menu-1" },
      { title: "Sous-menu 2", href: "/association/sous-menu-2" },
      { title: "Sous-menu 3", href: "/association/sous-menu-3" },
    ],
  },
];

export default function Header() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMenuToggle = (title: string) => {
    setOpenMenu(openMenu === title ? null : title);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-black text-white z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex flex-col items-start">
          <Link href="/" className="flex flex-col items-start">
            <img
              src="/images/logo.jpg"
              alt="SQtE Logo"
              className="h-10 w-auto"
              // Ajustez la hauteur (h-10) selon vos besoins
            />
          </Link>
        </div>

        <button
          className="md:hidden flex flex-col justify-center items-center gap-1.5"
          onClick={handleMobileMenuToggle}
          aria-label="Toggle mobile menu"
          aria-expanded={mobileMenuOpen}
        >
          <span
            className={cn(
              "block w-6 h-0.5 bg-white transition-transform duration-300",
              mobileMenuOpen && "rotate-45 translate-y-2"
            )}
          />
          <span
            className={cn(
              "block w-6 h-0.5 bg-white transition-opacity duration-300",
              mobileMenuOpen && "opacity-0"
            )}
          />
          <span
            className={cn(
              "block w-6 h-0.5 bg-white transition-transform duration-300",
              mobileMenuOpen && "-rotate-45 -translate-y-2"
            )}
          />
        </button>

        <nav className="hidden md:flex items-center space-x-4">
          {navItems.map((item, index) => (
            <div key={item.title} className="relative">
              <button
                className="text-white uppercase text-sm font-medium hover:text-gray-300 transition-colors"
                onClick={() => handleMenuToggle(item.title)}
                onMouseEnter={() => handleMenuToggle(item.title)}
                onMouseLeave={() => setOpenMenu(null)}
                aria-label={`Navigation to ${item.title} submenu`}
                aria-expanded={openMenu === item.title}
              >
                <Link
                  key={item.title}
                  href={item.href}
                  className="block px-4 py-2 text-sm text-white hover:bg-gray-900 transition-colors"
                >
                  {item.title} {item.subItems && <span className="ml-1">▾</span>}
                </Link>
              </button>

              <AnimatePresence>
                {openMenu === item.title && item.subItems && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="absolute left-0 mt-2 w-48 bg-black bg-opacity-80 rounded shadow-lg z-10"
                    onMouseEnter={() => setOpenMenu(item.title)}
                    onMouseLeave={() => setOpenMenu(null)}
                  >
                    <div className="py-1">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.title}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm text-white hover:bg-gray-900 transition-colors"
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {index < navItems.length - 1 && (
                <span className="text-white mx-2">|</span>
              )}
            </div>
          ))}

          {/* Facebook Icon */}
          <motion.a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit our Facebook page"
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="ml-4 flex items-center justify-center w-8 h-8 rounded-full bg-black"
          >
            <Facebook size={20} className="text-white" />
          </motion.a>

          {/* Instagram Icon */}
          <motion.a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit our Instagram page"
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-black"
          >
            <Instagram size={20} className="text-white" />
          </motion.a>
        </nav>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="md:hidden fixed top-16 left-0 w-full h-screen bg-black z-40"
          >
            <div className="flex flex-col p-4">
              {navItems.map((item) => (
                <div key={item.title} className="py-2 border-b border-gray-800">
                  <button
                    className="w-full text-left text-white uppercase text-sm font-medium py-2"
                    onClick={() => handleMenuToggle(item.title)}
                    aria-label={`Navigation to ${item.title} submenu`}
                    aria-expanded={openMenu === item.title}
                  >
                    {item.title}
                  </button>

                  {/* Mobile Dropdown */}
                  <AnimatePresence>
                    {openMenu === item.title && item.subItems && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-4 py-2">
                          {item.subItems.map((subItem) => (
                            <Link
                              key={subItem.title}
                              href={subItem.href}
                              className="block py-2 text-sm text-gray-300 hover:text-white"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {subItem.title}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              {/* Mobile Facebook Link */}
              <div className="py-4 flex justify-center">
                <motion.a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit our Facebook page"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-black"
                >
                  <Facebook size={24} className="text-white" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
