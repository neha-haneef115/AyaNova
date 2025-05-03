"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { FaAngleDoubleDown } from "react-icons/fa";
import Header from "@/component/Header";

const Section01 = () => {
  const videos = [
    "https://videos.pexels.com/video-files/29644229/12754229_2560_1440_30fps.mp4",
    "https://videos.pexels.com/video-files/9440173/9440173-hd_1920_1080_24fps.mp4",
    "https://cdn.pixabay.com/video/2024/09/14/231441_large.mp4",
    "https://cdn.pixabay.com/video/2023/07/26/173398-849308930_large.mp4",
  ];

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const nextVideoRef = useRef<HTMLVideoElement>(null);
  const preloadedVideos = useRef<Map<number, boolean>>(new Map());
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  const preloadNextVideo = useCallback((index: number) => {
    const nextIndex = (index + 1) % videos.length;
    if (!preloadedVideos.current.get(nextIndex) && nextVideoRef.current) {
      nextVideoRef.current.src = videos[nextIndex];
      nextVideoRef.current.load();
      preloadedVideos.current.set(nextIndex, true);
    }
  }, [videos]);

  const playCurrentVideo = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(error => {
        console.warn("Video autoplay was prevented:", error);
        
        const handleUserInteraction = () => {
          videoRef.current?.play();
          document.removeEventListener('click', handleUserInteraction);
          document.removeEventListener('touchstart', handleUserInteraction);
        };
        
        document.addEventListener('click', handleUserInteraction);
        document.addEventListener('touchstart', handleUserInteraction);
      });
      
      // Clear any existing timer
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      
      // Set a new timer for 4 seconds
      timerRef.current = setTimeout(() => {
        cycleVideo();
      }, 4000); // 4 seconds
    }
  }, []);

  const cycleVideo = useCallback(() => {
    setCurrentVideoIndex(prevIndex => {
      const nextIndex = (prevIndex + 1) % videos.length;
      preloadNextVideo(nextIndex);
      return nextIndex;
    });
  }, [videos.length, preloadNextVideo]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = videos[currentVideoIndex];
      videoRef.current.load();
      preloadedVideos.current.set(currentVideoIndex, true);
      playCurrentVideo();
    }
    
    preloadNextVideo(currentVideoIndex);
    
    return () => {
      // Clean up timer when component unmounts or currentVideoIndex changes
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [currentVideoIndex, cycleVideo, playCurrentVideo, preloadNextVideo, videos]);

  const handleScrollToSection02 = () => {
    const section02 = document.getElementById("scroll-target");
    section02?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="section01" className="relative w-full h-screen overflow-hidden">
      <Header />
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
      >
        <source src={videos[currentVideoIndex]} type="video/mp4" />
      </video>
      
      <video 
        ref={nextVideoRef}
        className="hidden" 
        muted 
        preload="auto"
      />

      <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4 sm:px-8 md:px-12 lg:px-16">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white py-0 px-1 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-400 leading-tight max-w-5xl">
          Exploring the Cosmos Through the Wisdom of the Quran
        </h1>

        <p className="text-1xl sm:text-xl md:text-2xl lg:text-[28px] mt-4 md:mt-7 max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl">
          Every star, every galaxy, and every celestial body is a sign of Allah's creation. Explore
          the wonders of astronomy through divine revelation.
        </p>

        <div
          onClick={handleScrollToSection02}
          className="absolute bottom-24 sm:bottom-10 md:bottom-12 lg:bottom-15 left-1/2 transform -translate-x-1/2 cursor-pointer"
        >
          <FaAngleDoubleDown className="h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 animate-bounce text-white" />
        </div>
      </div>
    </section>
  );
};

export default Section01;