"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const poles = [
  {
    title: "Pôle Audiovisuel",
    description:
      "Découvrez l'univers de la production audiovisuelle, de la réalisation à la post-production. Apprenez les techniques de tournage, de montage et d'étalonnage avec des professionnels du secteur.",
    image: "/images/img3.jpg",
    href: "/poles/audiovisuel",
    alt: "Pôle Audiovisuel - Studio recording setup",
  },

  {
    title: "Pôle Musique",
    description:
      "Explorez le monde de la production musicale, de la composition à l'enregistrement. Développez vos compétences en MAO (Musique Assistée par Ordinateur) et apprenez à créer vos propres morceaux.",
    image: "/images/img1.jpg",
    href: "/poles/musique",
    alt: "Pôle Musique - Person pointing at a screen, desk with keyboard",
  },
  {
    title: "Pôle Média",
    description:
      "Initiez-vous aux métiers des médias numériques, du journalisme au community management. Apprenez à créer du contenu engageant pour différentes plateformes et à gérer votre présence en ligne.",
    image: "/images/img5.jpg",
    href: "/poles/media",
    alt: "Pôle Média - Desk with multiple monitors",
  },
];

export default function PolesPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Nos Pôles d'Activités</h1>
          <p className="text-lg max-w-3xl mx-auto">
            Découvrez nos différents pôles d'activités et trouvez celui qui
            correspond à vos passions et aspirations et inscrivez vous au pôle
            qui vous convient le mieux..
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {poles.map((pole, index) => (
            <motion.div
              key={pole.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-lg overflow-hidden shadow-lg"
            >
              <div className="relative h-64">
                <div className="absolute inset-0 pole-card-overlay z-10"></div>
                <img
                  src={pole.image}
                  alt={pole.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                  <h2 className="text-white text-2xl font-bold">
                    {pole.title}
                  </h2>
                </div>
              </div>

              <div className="p-6">
                <p className="mb-6">{pole.description}</p>
                <Link
                  href={pole.href}
                  className="inline-block bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  En savoir plus
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
