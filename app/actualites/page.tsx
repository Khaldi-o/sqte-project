"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { QueryProvider } from "@/components/QueryProvider";

// Types for our API data
type NewsItem = {
  id: number;
  date: string;
  title: string;
  excerpt: string;
  image: string;
};

// Mock API function (would connect to real API in production)
const fetchNews = async (): Promise<NewsItem[]> => {
  // In a real app, this would be an API call
  return [
    {
      id: 1,
      date: "20/12/24",
      title: "Actualité 1",
      excerpt: "jdjdjdjjdjdjdjddjjjjjjjjjjjjjjjjjjjj",
      image: "/images/img4.png",
    },
    {
      id: 2,
      date: "05/02/25",
      title: "Actualité 1",
      excerpt: "jdjdjdjjdjdjdjddjjjjjjjjjjjjjjjjjjjj",
      image: "/images/img4.png",
    },
    {
      id: 3,
      date: "20/12/24",
      title: "Actualité 1",
      excerpt: "jdjdjdjjdjdjdjddjjjjjjjjjjjjjjjjjjjj",
      image: "/images/img4.png",
    },
    {
      id: 4,
      date: "20/11/24",
      title: "Actualité 1",
      excerpt: "jdjdjdjjdjdjdjddjjjjjjjjjjjjjjjjjjjj",
      image: "/images/img4.png",
    },
  ];
};

function NewsPage() {
  const { data: newsItems, isLoading } = useQuery({
    queryKey: ["news"],
    queryFn: fetchNews,
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
          <h1 className="text-4xl font-bold mb-4">Actualités</h1>
          <p className="text-lg max-w-3xl mx-auto">
            Découvrez les dernières nouvelles et événements de l'association
            SQtE.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white rounded-lg overflow-hidden shadow-lg animate-pulse"
              >
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
            {newsItems?.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg overflow-hidden shadow-lg"
              >
                <div className="relative h-64">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-600 mb-2">{item.date}</p>
                  <h2 className="text-2xl font-bold mb-4">{item.title}</h2>
                  <p className="mb-6">{item.excerpt}</p>
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Link
                      href={`/actualites/${item.id}`}
                      className="inline-block bg-black text-white px-6 py-2 rounded-lg"
                    >
                      Lire l'article
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

export default function NewsPageWithProvider() {
  return (
    <QueryProvider>
      <NewsPage />
    </QueryProvider>
  );
}
