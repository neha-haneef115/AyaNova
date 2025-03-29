"use client";
import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { FaAngleDoubleDown } from "react-icons/fa";
import Header from "@/component/Header";

const Section01 = () => {
  // Memoize videos array with preload hints
  const videos = useMemo(() => [
    {
      src: "https://videos.pexels.com/video-files/29644229/12754229_2560_1440_30fps.mp4",
      preloaded: false
    },
    {
      src: "https://videos.pexels.com/video-files/9440173/9440173-hd_1920_1080_24fps.mp4",
      preloaded: false
    },
    {
      src: "https://cdn.pixabay.com/video/2024/09/14/231441_large.mp4",
      preloaded: false
    },
    {
      src: "https://cdn.pixabay.com/video/2023/07/26/173398-849308930_large.mp4",
      preloaded: false
    },
  ], []);

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoElementsRef = useRef<HTMLVideoElement[]>([]);

  // Preload all videos in the background
  useEffect(() => {
    videos.forEach((video, index) => {
      if (!video.preloaded) {
        const preloadVideo = document.createElement('video');
        preloadVideo.src = video.src;
        preloadVideo.preload = 'auto';
        preloadVideo.load();
        videoElementsRef.current[index] = preloadVideo;
        videos[index].preloaded = true;
      }
    });
  }, [videos]);

  // Ensure video plays if it stops
  const ensureVideoPlays = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      const playPromise = videoRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.warn("Video autoplay was prevented:", error);
          // Fallback play attempt
          videoRef.current?.play().catch(() => {
            console.error("Could not play video");
          });
        });
      }
    }
  }, []);

  // Cycle through videos with pre-buffering
  const cycleVideo = useCallback(() => {
    setCurrentVideoIndex((prev) => {
      const nextIndex = (prev + 1) % videos.length;
      // Preload next video in sequence
      const nextNextIndex = (nextIndex + 1) % videos.length;
      if (!videos[nextNextIndex].preloaded) {
        const preloadVideo = document.createElement('video');
        preloadVideo.src = videos[nextNextIndex].src;
        preloadVideo.preload = 'auto';
        preloadVideo.load();
        videoElementsRef.current[nextNextIndex] = preloadVideo;
        videos[nextNextIndex].preloaded = true;
      }
      return nextIndex;
    });
  }, [videos]);

  // Video event handlers
  useEffect(() => {
    const videoElement = videoRef.current;
    
    const handleCanPlay = () => {
      ensureVideoPlays();
    };

    const handleVideoEnd = () => {
      cycleVideo();
    };

    const handleVideoError = (e: Event) => {
      console.error("Video error:", e);
      cycleVideo(); // Try next video if current one fails
    };

    if (videoElement) {
      videoElement.addEventListener('canplay', handleCanPlay);
      videoElement.addEventListener('ended', handleVideoEnd);
      videoElement.addEventListener('error', handleVideoError);

      // Ensure initial play
      ensureVideoPlays();

      return () => {
        videoElement.removeEventListener('canplay', handleCanPlay);
        videoElement.removeEventListener('ended', handleVideoEnd);
        videoElement.removeEventListener('error', handleVideoError);
      };
    }
  }, [cycleVideo, ensureVideoPlays, currentVideoIndex]);

  // Scroll to next section
  const handleScrollToSection02 = useCallback(() => {
    const section02 = document.getElementById("scroll-target");
    if (section02) {
      section02.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <section id="section01" className="relative w-full h-screen overflow-hidden">
      <Header />
      <video
        ref={videoRef}
        key={videos[currentVideoIndex].src}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1] transition-opacity duration-1000 ease-in-out"
      >
        <source src={videos[currentVideoIndex].src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-8 max-w-[80%] mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white py-0 px-1 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-400 leading-tight">
          Exploring the Cosmos Through the Wisdom of the Quran
        </h1>

        <p className="text-xl md:text-[28px] mt-7 max-w-[1200px]">
          Every star, every galaxy, and every celestial body is a sign of Allah's creation. Explore
          the wonders of astronomy through divine revelation.
        </p>

        <div
          onClick={handleScrollToSection02}
          className="absolute bottom-15 left-1/2 transform -translate-x-1/2 cursor-pointer"
        >
          <div className="relative flex items-center justify-center">
            <FaAngleDoubleDown
              className="h-12 w-12 animate-bounce text-white"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Section01);