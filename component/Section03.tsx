"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import Footer from "./Footer";

const categories = [
  {
    title: "Celestial Bodies & Their Motion",
    slug: "celestial-bodies-and-motion",
    verses: 10,
    emoji: "",
    color: "from-indigo-600 to-purple-700",
    bgGlow: "after:bg-indigo-600/20",
    textColor: "text-indigo-100",
    icon: "",
  },
  {
    title: "The Universe & Its Creation",
    slug: "universe-and-creation",
    verses: 3,
    emoji: "",
    color: "from-amber-600 to-orange-700",
    bgGlow: "after:bg-amber-600/20",
    textColor: "text-amber-100",
    icon: "",
  },
  {
    title: "Signs & Cosmic Events",
    slug: "signs-and-cosmic-events",
    verses: 2,
    emoji: "",
    color: "from-teal-600 to-cyan-700",
    bgGlow: "after:bg-teal-600/20",
    textColor: "text-teal-100",
    icon: "",
  },
  {
    title: "The End of the Universe",
    slug: "end-of-the-universe-",
    verses: 3,
    emoji: "",
    color: "from-rose-600 to-pink-700",
    bgGlow: "after:bg-rose-600/20",
    textColor: "text-rose-100",
    icon: "",
  },
];

const CategorySection = () => {
  const router = useRouter();
  const totalVerses = useMemo(() => 
    categories.reduce((sum, category) => sum + category.verses, 0), 
  []);

  const handleScrollUp = useCallback(() => {
    const section02 = document.getElementById("scroll-target");
    section02?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleCategoryClick = useCallback((slug: string) => {
    router.prefetch(`/category?category=${slug}`);
    router.push(`/category?category=${slug}`);
  }, [router]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        handleScrollUp();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleScrollUp]);

  return (
    <div id="section03" className="relative min-h-screen">
      <section className="bg-gradient-to-b from-gray-900 via-gray-900 to-black pt-6 px-4">
        <div className="max-w-4xl mx-auto pb-20">
          <div className="text-center mb-8">
            <div className="inline-block relative mb-4">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-20 blur-xl rounded-full scale-150" />
              <h1 className="relative text-3xl sm:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-400 py-2">
                Astronomy in the Quran
              </h1>
            </div>
            <div className="flex justify-center">
              <div className="text-xs inline-flex items-center px-3 py-1 rounded-full bg-blue-900/30 text-blue-300 border border-blue-700/50 backdrop-blur-sm">
                {totalVerses} Scientifically Justified Verses
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:gap-4">
            {categories.map((category, index) => (
              <div 
                key={category.slug} 
                className="rounded-lg shadow-lg relative overflow-hidden transition-transform hover:scale-[1.02] active:scale-100"
              >
                <div
                  className={`bg-gradient-to-r ${category.color} p-4 cursor-pointer relative after:absolute after:inset-0 after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300 ${category.bgGlow}`}
                  onClick={() => handleCategoryClick(category.slug)}
                >
                  <div className="absolute top-0 right-0 opacity-10 text-6xl -mt-4 -mr-4 blur-sm">
                    {category.emoji}
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className={`text-lg sm:text-xl font-bold ${category.textColor} flex items-center`}>
                        <span className="mr-2 text-xl">{category.emoji}</span>
                        {category.title}
                      </h2>
                      <div className="mt-1 text-white/70 flex items-center text-xs sm:text-sm">
                        <span className="text-white font-semibold">
                          {category.verses}
                        </span>
                        <span className="ml-1">verses</span>
                      </div>
                    </div>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 text-white/80" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="sticky bottom-0 left-0 right-0 z-10">
        <Footer />
      </div>
    </div>
  );
};

export default React.memo(CategorySection);