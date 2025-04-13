"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaAngleDoubleDown } from "react-icons/fa";
import Header from "@/component/Header";

const videoSources = [
  "https://videos.pexels.com/video-files/29644229/12754229_2560_1440_30fps.mp4",
  "https://videos.pexels.com/video-files/9440173/9440173-hd_1920_1080_24fps.mp4",
  "https://cdn.pixabay.com/video/2024/09/14/231441_large.mp4",
  "https://cdn.pixabay.com/video/2023/07/26/173398-849308930_large.mp4"
];

const Section01 = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const preloadedVideos = useRef<boolean[]>(Array(videoSources.length).fill(false));

  // Preload next video in sequence
  useEffect(() => {
    const preloadVideo = (index: number) => {
      if (!preloadedVideos.current[index]) {
        const video = document.createElement('video');
        video.src = videoSources[index];
        video.preload = 'auto';
        video.load();
        preloadedVideos.current[index] = true;
      }
    };

    // Preload first video immediately
    preloadVideo(0);

    // Preload next video when current changes
    const nextIndex = (currentVideoIndex + 1) % videoSources.length;
    preloadVideo(nextIndex);

  }, [currentVideoIndex]);

  // Handle video playback
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const playVideo = () => {
      videoElement.play().catch(e => console.log("Autoplay prevented:", e));
    };

    const handleEnded = () => {
      setCurrentVideoIndex(prev => (prev + 1) % videoSources.length);
    };

    videoElement.addEventListener('ended', handleEnded);
    playVideo();

    return () => {
      videoElement.removeEventListener('ended', handleEnded);
    };
  }, [currentVideoIndex]);

  const handleScrollToSection02 = () => {
    const section02 = document.getElementById("scroll-target");
    section02?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="section01" className="relative w-full h-screen overflow-hidden">
      <Header />
      <video
        ref={videoRef}
        key={videoSources[currentVideoIndex]}
        autoPlay
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
      >
        <source src={videoSources[currentVideoIndex]} type="video/mp4" />
      </video>

      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-8 max-w-[80%] mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-400 leading-tight">
          Exploring the Cosmos Through the Wisdom of the Quran
        </h1>

        <p className="text-xl md:text-[28px] mt-7 max-w-[1200px] text-white">
          Every star, every galaxy, and every celestial body is a sign of Allah's creation. Explore
          the wonders of astronomy through divine revelation.
        </p>

        <button 
          onClick={handleScrollToSection02}
          className="absolute bottom-15 left-1/2 transform -translate-x-1/2 cursor-pointer"
          aria-label="Scroll down"
        >
          <FaAngleDoubleDown className="h-12 w-12 animate-bounce text-white" />
        </button>
      </div>
    </section>
  );
};

export default Section01;