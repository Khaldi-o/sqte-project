"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { QueryProvider } from "@/components/QueryProvider";
import { Play } from "lucide-react";

// Types for our API data
type EventItem = {
  id: number;
  date: string;
  title: string;
  excerpt: string;
  image: string;
  hasVideo: boolean;
};

// Mock API function (would connect to real API in production)
const fetchEvents = async (): Promise<EventItem[]> => {
  // In a real app, this would be an API call
  return [
    {
      id: 1,
      date: "16/12/24",
      title: "Workshop de production musicale",
      excerpt: "Suspendisse ante augue, laoreet interd. Mauris vitae dolor vel sem mattis suspendit nec ut tellus. Nulla vestibulum eget diam sagittis utrices...",
      image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      hasVideo: true
    },
    {
      id: 2,
      date: "20/12/24",
      title: "Projection du film 'Sans Que Tu Erres'",
      excerpt: "Cras efficitur mauris a faucibu pharetra. Cras efficitur mauris a faucibu pharetra. Suspendisse ante augue, laoreet interd...",
      image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      hasVideo: true
    },
    {
      id: 3,
      date: "05/01/25",
      title: "Masterclass avec Caroline Pascal",
      excerpt: "Nulla vestibulum eget diam sagittis utrices. Cras efficitur mauris a faucibu pharetra. Suspendisse ante augue, laoreet interd...",
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      hasVideo: false
    },
    {
      id: 4,
      date: "15/01/25",
      title: "Atelier d'écriture de scénario",
      excerpt: "Mauris vitae dolor vel sem mattis suspendit nec ut tellus. Nulla vestibulum eget diam sagittis utrices. Cras efficitur mauris a faucibu pharetra...",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      hasVideo: false
    },
  ];
};

function EventsPage() {
  const { data: eventItems, isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents
  });

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Événements</h1>
          <p className="text-lg max-w-3xl mx-auto">
            Découvrez nos prochains événements et inscrivez-vous pour y participer.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden shadow-lg animate-pulse">
                <div className="h-64 bg-gray-300"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>
                  <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded w-full mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3 mb-6"></div>
                  <div className="h-10 bg-gray-300 rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {eventItems?.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#F43F5E] rounded-lg overflow-hidden shadow-lg"
              >
                <div className="relative h-64">
                  <div className="absolute inset-0 pole-card-overlay z-10"></div>
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                  />
                  
                  {item.hasVideo && (
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                      <div className="bg-black bg-opacity-70 rounded-full p-3">
                        <Play className="h-8 w-8 text-white" />
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <p className="text-sm font-bold mb-2">{item.date}</p>
                  <h2 className="text-2xl font-bold mb-4">{item.title}</h2>
                  <p className="mb-6">{item.excerpt}</p>
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Link 
                      href={`/evenements/${item.id}`}
                      className="inline-block bg-black text-white px-6 py-2 rounded-lg"
                    >
                      En savoir plus
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function EventsPageWithProvider() {
  return (
    <QueryProvider>
      <EventsPage />
    </QueryProvider>
  );
}