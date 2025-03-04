"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// Définition des types (descrpton association)
interface TeamMember {
  name: string;
  image: string;
  description?: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Audiovisuel",
    image: "/images/img1.jpg",
    description:
      "L’association SANS QUE TU ERRES a pour ambition de contribuer autant que possible au développement de projets artistiques et culturels en mettant en avant les jeunes à découvrir les métiers du milieu tel que l'Audiovisuel, la Musique, la Danse, la Communication et encore l'Évènementiel.  ",
  },
  {
    name: "Musique et dance",
    image: "/images/img2.png",
    description:
      "Notre devise est la transmission de nos compétences artistiques et techniques aux jeunes afin qu'ils puissent s'épanouir dans les domaines qui les interessent.",
  },
  {
    name: "Communication",
    image: "/images/img3.jpg",
    description:
      "L’association SANS QUE TU ERRES a pour ambition de contribuer autant que possible au développement de projets artistiques et culturels en mettant en avant les jeunes à découvrir les métiers du milieu tel que l'Audiovisuel, la Musique, la Danse, la Communication et encore l'Évènementiel",
  },

  {
    name: "Communication",
    image: "/images/img7.jpg",
    description:
      "L’association SANS QUE TU ERRES a pour ambition de contribuer autant que possible au développement de projets artistiques et culturels en mettant en avant les jeunes à découvrir les métiers du milieu tel que l'Audiovisuel, la Musique, la Danse, la Communication et encore l'Évènementiel",
  },
  {
    name: "Médias",
    image: "/images/img8.jpg",
    description:
      "Notre devise est la transmission de nos compétences artistiques et techniques aux jeunes afin qu'ils puissent s'épanouir dans les domaines qui les interessent. .",
  },
];

export default function TeamSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const totalMembers = teamMembers.length;

  // Fonction pour passer à la slide suivante
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalMembers);
  };

  // Fonction pour passer à la slide précédente
  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + totalMembers) % totalMembers
    );
  };

  // Fonction pour aller à une slide spécifique
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Configuration du défilement automatique
  useEffect(() => {
    const startAutoPlay = () => {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, 5000); // 5 secondes de défilement
    };

    startAutoPlay();

    // Nettoyage de l'intervalle lors du démontage du composant
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, []);

  // Arrêter le défilement auto lrsque l'utilisateur interagit avec slider
  const handleMouseEnter = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  };

  // Reprendre le défilement auto
  const handleMouseLeave = () => {
    if (!autoPlayRef.current) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, 5000);
    }
    setHoveredIndex(null);
  };

  // Calculer les indices des slides visibles (un max de 3 slides selon la taille d'écran)
  const getVisibleIndices = () => {
    const indices = [];
    for (let i = 0; i < 4; i++) {
      indices.push((currentIndex + i) % totalMembers);
    }
    return indices;
  };

  const visibleIndices = getVisibleIndices();

  return (
    <section className="bg-[#F5F5DC] py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Notre Association
        </h2>

        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Flèches pour Sliders */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-80 p-2 rounded-full shadow-md hover:bg-opacity-100 transition-all duration-300"
            aria-label="Précédent"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-80 p-2 rounded-full shadow-md hover:bg-opacity-100 transition-all duration-300"
            aria-label="Suivant"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {visibleIndices.map((memberIndex) => (
              <motion.div
                key={memberIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="relative rounded-lg shadow-lg overflow-hidden h-64 cursor-pointer"
                onMouseEnter={() => setHoveredIndex(memberIndex)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => goToSlide(memberIndex)}
              >
                <div className="relative h-64 w-full">
                  <Image
                    src={teamMembers[memberIndex].image}
                    alt={`Portrait de ${teamMembers[memberIndex].name}`}
                    fill
                    style={{ objectFit: "cover" }}
                    className={`transition-all duration-500 ${
                      hoveredIndex === memberIndex
                        ? "scale-110 blur-sm"
                        : "scale-100"
                    }`}
                  />

                  {/* Overlay au survol */}
                  <div
                    className={`absolute inset-0 bg-black transition-opacity duration-500 flex flex-col justify-center p-6 text-white ${
                      hoveredIndex === memberIndex ? "opacity-80" : "opacity-0"
                    }`}
                  >
                    <h3 className="text-xl font-bold mb-1">
                      {teamMembers[memberIndex].name}
                    </h3>
                    <p className="text-sm font-medium text-gray-300 mb-4">
                      {teamMembers[memberIndex].name}
                    </p>
                    <p className="text-sm italic">
                      {teamMembers[memberIndex].description}
                    </p>
                  </div>

                  <div
                    className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent transition-opacity duration-500 ${
                      hoveredIndex === memberIndex ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    <h3 className="text-white font-bold">
                      {teamMembers[memberIndex].name}
                    </h3>
                    <p className="text-gray-300 text-sm">
                      {teamMembers[memberIndex].name}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Indicateurs */}
          <div className="flex justify-center space-x-2 mt-8">
            {teamMembers.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? "bg-black w-8"
                    : "bg-gray-400 hover:bg-gray-600"
                }`}
                aria-label={`Aller à la slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
