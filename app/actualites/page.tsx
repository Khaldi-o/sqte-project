"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { QueryProvider } from "@/components/QueryProvider";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useEffect, useState } from "react";

const fetchNews = async ({
  queryKey,
}: {
  queryKey: [string, { page: number; pageSize: number }];
}) => {
  const [_key, { page, pageSize }] = queryKey;
  const response = await fetch(`/api/news?page=${page}&pageSize=${pageSize}`);
  if (!response.ok) {
    throw new Error("Failed to fetch news");
  }
  return response.json();
};

function NewsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 2;

  const {
    data: newsItems,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["news", { page: currentPage, pageSize }],
    queryFn: fetchNews,
  });

  const handleNextPage = () =>
    setCurrentPage((next) => (next < totalPages ? next + 1 : totalPages));
  const handlePrevPage = () =>
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : 1));

  useEffect(() => {
    if (newsItems && newsItems.totalPages) {
      setTotalPages(newsItems.totalPages);
    }
  }, [newsItems]);

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
          <div className="flex flex-col gap-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {newsItems.news?.map((news, index) => (
                <motion.div
                  key={news.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg overflow-hidden shadow-lg"
                >
                  <div className="relative h-64">
                    <img
                      src={`data:image/jpeg;base64,${news.image}`}
                      alt={news.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-gray-600 mb-2">{news.date}</p>
                    <h2 className="text-2xl font-bold mb-4">{news.title}</h2>
                    <p className="mb-6">{news.excerpt}</p>
                    <motion.div whileHover={{ scale: 1.05 }}>
                      <Link
                        href={`/actualites/${news.id}`}
                        className="inline-block bg-black text-white px-6 py-2 rounded-lg"
                      >
                        Lire l'article
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div>
              <Pagination>
                <PaginationContent>
                  <PaginationPrevious onClick={() => handlePrevPage()} />
                  {Array.from({ length: totalPages }, (_, index) => (
                    <PaginationItem key={index}>
                      <PaginationLink
                        isActive={currentPage === index + 1}
                        onClick={() => setCurrentPage(index + 1)}
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationNext onClick={() => handleNextPage()} />
                </PaginationContent>
              </Pagination>
            </div>
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
