"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Play } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

// Types pour la partie actualités
type NewsItem = {
  id: number;
  date: string;
  content: string;
  image: string;
};

// pour les évemenements
type EventItem = {
  id: number;
  date: string;
  content: string;
  image: string;
  hasVideo: boolean;
};

// Mock API functions
const fetchLatestNews = async (): Promise<NewsItem> => {
  return {
    id: 1,
    date: "Mon. 20/12/24",
    content:
      "Jolie tu erres » : un sanctuaire en mal de confiance. Un événement collaboratif qui ressemble différents profils et une diversité de compétences qui collaborent étroitement pour donner sens au travail associatif.. tu peux nous rejoindre en t'inscrivant sur l'événement. Un événement collaboratif qui ressemble différents profils SQTE.",
    image: "/images/img4.png",
  };
};

const fetchLatestEvent = async (): Promise<EventItem> => {
  return {
    id: 1,
    date: "Ven. 16/12/24",
    content:
      "Jolie tu erres » : un sanctuaire en mal de confiance. Un événement collaboratif qui ressemble différents profils et une diversité de compétences qui collaborent étroitement pour donner sens au travail associatif.. tu peux nous rejoindre en t'inscrivant .. Un événement collaboratif qui ressemble différents profils. Nulla  Sans que tu erres.",
    image: "/images/img5.jpg",
    hasVideo: true,
  };
};

export default function NewsEventsSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const { data: newsData, isLoading: newsLoading } = useQuery({
    queryKey: ["latestNews"],
    queryFn: fetchLatestNews,
  });

  const { data: eventData, isLoading: eventLoading } = useQuery({
    queryKey: ["latestEvent"],
    queryFn: fetchLatestEvent,
  });

  return (
    <section ref={sectionRef} className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Actu Column - 5 colonnes */}
          <motion.div
            className="lg:col-span-5 bg-[#FACC15] rounded-none overflow-hidden shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {newsLoading ? (
              <div className="animate-pulse p-6">
                <div className="h-4 bg-yellow-300 rounded w-1/3 mb-2"></div>
                <div className="h-6 bg-yellow-300 rounded w-3/4 mb-4"></div>
                <div className="h-48 bg-yellow-300 rounded mb-4"></div>
                <div className="h-4 bg-yellow-300 rounded mb-2"></div>
                <div className="h-4 bg-yellow-300 rounded mb-2"></div>
                <div className="h-4 bg-yellow-300 rounded w-1/2 mb-4"></div>
                <div className="h-8 bg-yellow-300 rounded w-1/4 mx-auto"></div>
              </div>
            ) : (
              newsData && (
                <div>
                  <div className="p-6 pb-3">
                    <div className="font-bold uppercase text-sm mb-2">Actu</div>
                    <div className="font-bold text-xl mb-1">
                      {newsData.date}
                    </div>
                  </div>

                  <div className="flex">
                    <div className="w-2/3 pl-6 pr-2 pb-6">
                      <p className="text-sm leading-relaxed">
                        {newsData.content}
                      </p>
                      <div className="mt-28">
                        <Link
                          href={`/news/${newsData.id}`}
                          className="inline-block font-bold text-black hover:underline"
                          aria-label="Read news article"
                        >
                          Lire l&apos;article
                        </Link>
                      </div>
                    </div>
                    <div className="w-1/3 pr-6">
                      {/* à modifier later */}
                      <div className="h-64 relative">
                        <img
                          src={newsData.image}
                          alt="News illustration"
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
          </motion.div>

          {/* Événements Column - 5 colonnes */}
          <motion.div
            className="lg:col-span-5 bg-orange-400 rounded-none overflow-hidden shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {eventLoading ? (
              <div className="animate-pulse p-6">
                <div className="h-4 bg-orange-300 rounded w-1/3 mb-2"></div>
                <div className="h-6 bg-orange-300 rounded w-3/4 mb-4"></div>
                <div className="h-48 bg-orange-300 rounded mb-4"></div>
                <div className="h-4 bg-orange-300 rounded mb-2"></div>
                <div className="h-4 bg-orange-300 rounded mb-2"></div>
                <div className="h-4 bg-orange-300 rounded w-1/2 mb-4"></div>
                <div className="h-8 bg-orange-300 rounded w-1/4 mx-auto"></div>
              </div>
            ) : (
              eventData && (
                <div>
                  <div className="p-6 pb-3">
                    <div className="font-bold uppercase text-sm mb-2">
                      Événements
                    </div>
                    <div className="font-bold text-xl mb-1">
                      {eventData.date}
                    </div>
                  </div>

                  <div className="flex">
                    <div className="w-2/3 pl-6 pr-2 pb-6">
                      <p className="text-sm leading-relaxed">
                        {eventData.content}
                      </p>
                      <div className="mt-28">
                        <Link
                          href={`/events/${eventData.id}`}
                          className="inline-block font-bold text-black hover:underline"
                          aria-label="Read event details"
                        >
                          Lire l&apos;article
                        </Link>
                      </div>
                    </div>
                    <div className="w-1/3 pr-6">
                      {/*  params image */}
                      <div className="h-64 relative">
                        <img
                          src={eventData.image}
                          alt="Event illustration"
                          className="w-full h-full object-cover object-center"
                        />
                        {eventData.hasVideo && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-black bg-opacity-50 rounded-full p-2">
                              <Play className="h-6 w-6 text-white" />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
          </motion.div>

          {/* Donation Column - 2 colonnes */}
          <motion.div
            className="lg:col-span-2 bg-[#F43F5E] rounded-none overflow-hidden shadow-md flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="p-4 flex flex-col justify-between h-full">
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-white mb-2">
                  Faites un don pour supporter notre Association
                </h2>
              </div>
              <div className="mt-auto text-center">
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link
                    href="/donation"
                    className="inline-flex items-center justify-center border-2 border-white text-white px-4 py-2 rounded-full text-sm font-medium"
                    aria-label="Make a donation"
                  >
                    <span className="mr-2">♥</span>
                    Faire un don
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
