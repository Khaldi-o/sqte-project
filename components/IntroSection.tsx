"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function IntroSection() {
  const logoRef = useRef(null);
  const textRef = useRef(null);
  const isLogoInView = useInView(logoRef, { once: true, amount: 0.5 });
  const isTextInView = useInView(textRef, { once: true, amount: 0.5 });

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Introduction */}
          <div className="flex flex-col items-center text-center">
            <motion.div
              ref={logoRef}
              initial={{ scale: 0.9, rotate: 0 }}
              animate={
                isLogoInView
                  ? { scale: 1, rotate: 0 }
                  : { scale: 0.9, rotate: 0 }
              }
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <img
                src="/images/logo2.jpg"
                alt="SQtE Logo"
                className="h-[150px] mx-auto"
              />
            </motion.div>

            <motion.div
              ref={textRef}
              initial={{ opacity: 0, x: -20 }}
              animate={
                isTextInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
              }
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <p className="text-base mb-6">
                L'association SQTE vous ouvre les portes de l'audiovisuel, de la
                musique et des médias. Plongez dans des mondes d'expression
                artistique illimitée et participez à une aventure inoubliable.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div
                  whileHover={{
                    scale: 1.1,
                    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                  }}
                >
                  <Link
                    href="/association"
                    className="bg-transparent text-black text-[13px] font-bold px-6 py-3 rounded-lg inline-block hover:bg-gray-100"
                    aria-label="Discover our association page"
                  >
                    Découvrez notre association
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{
                    scale: 1.1,
                    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                  }}
                >
                  <Link
                    href="/poles"
                    className="bg-transparent text-black text-[14px] font-bold px-6 py-3 rounded-lg inline-flex items-center hover:bg-gray-100"
                    aria-label="Discover our creative poles"
                  >
                    Découvrez nos pôles créatifs{" "}
                    <ArrowRight className="ml-2 h-4 w-4 text-black" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>

          <div className="col-span-1 lg:col-span-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Pôle Audiovisuel",
                image: "/images/img1.jpg",
                href: "/poles/audiovisuel",
                alt: "Pôle Audiovisuel",
              },
              {
                title: "Pôle Musique",
                image: "/images/img2.png",
                href: "/poles/musique",
                alt: "Pôle Musique",
              },
              {
                title: "Pôle Média",
                image: "/images/img3.jpg",
                href: "/poles/media",
                alt: "Pôle Média",
              },
            ].map((pole, index) => (
              <motion.div
                key={pole.title}
                whileHover={{ scale: 1.05 }}
                className="relative overflow-hidden rounded-lg shadow-lg h-80"
              >
                <Link href={pole.href} className="block h-full">
                  <div className="absolute inset-0 pole-card-overlay z-10"></div>
                  <motion.img
                    src={pole.image}
                    alt={pole.alt}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }} // Effet de zoom sur l'image (à adapter)
                    transition={{ duration: 0.3 }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                    <h3 className="text-white text-xl md:text-2xl font-heading font-bold text-center">
                      {pole.title}
                      <span className="absolute bottom-[14px] left-1/2 transform -translate-x-1/2 w-[185px] h-0.5 bg-yellow-400 block"></span>
                    </h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
