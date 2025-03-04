"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AssociationPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Notre Association</h1>
          <p className="text-lg max-w-3xl mx-auto">
            Découvrez l'histoire et la mission de SQTE - Sans Que Tu Erres.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative h-[400px] rounded-lg overflow-hidden"
          >
            <img
              src="/images/img5.jpg"
              alt="L'équipe de SQTE en réunion"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-3xl font-bold mb-6">Notre Histoire</h2>
            <p className="mb-4">
              Fondée en 2020, l'association SQTE est née de la volonté de
              démocratiser l'accès aux métiers créatifs pour les jeunes issus de
              quartiers populaires. Notre conviction est que le talent n'a pas
              de frontières sociales ou géographiques.
            </p>
            <p className="mb-4">
              Depuis sa création, SQtE a accompagné plus de 200 jeunes dans leur
              découverte des métiers de l'audiovisuel, de la musique et des
              médias, à travers des ateliers, des formations et des événements.
            </p>
            <p>
              Notre équipe, composée de professionnels passionnés, s'engage à
              transmettre son savoir-faire et à créer des opportunités pour tous
              ceux qui souhaitent s'exprimer à travers l'art et la création.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-[#F5F5DC] p-8 rounded-lg mb-16"
        >
          <h2 className="text-3xl font-bold mb-6 text-center">Notre Mission</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-[#FACC15] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Démocratiser</h3>
              <p>
                Rendre accessibles les métiers créatifs aux jeunes de tous
                horizons.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-[#F43F5E] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Former</h3>
              <p>
                Proposer des formations de qualité, encadrées par des
                professionnels, pour développer les compétences techniques et
                artistiques.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Connecter</h3>
              <p>
                Créer des liens entre les jeunes talents et les professionnels
                du secteur pour favoriser l'insertion professionnelle.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        ></motion.div>
      </div>
    </div>
  );
}
