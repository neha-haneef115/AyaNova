"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

interface CelestialObject {
  id: string;
  name: string;
  thumbnailImage: string;
  mainVideo: string;
  description: string;
  color: string;
}

const celestialObjects: CelestialObject[] = [
  {
    id: "star",
    name: "Star",
    thumbnailImage: "/Sun_Emits_Flare.jpeg",
    mainVideo: "https://videos.pexels.com/video-files/12275352/12275352-hd_1920_1028_60fps.mp4",
    description: "A star is a luminous sphere of plasma held together by gravity. It produces light and heat through nuclear fusion. Stars vary in size, brightness, and temperature. Our Sun is a medium-sized star that provides energy for life on Earth.",
    color: "#FFD700",
  },
  {
    id: "moon",
    name: "Moon",
    thumbnailImage: "/images (1).jpg",
    mainVideo: "https://cdn.pixabay.com/video/2022/12/20/143598-782758384_large.mp4",
    description: "A moon is a natural satellite that orbits a planet. It does not produce its own light but reflects sunlight. Moons can be rocky or icy, and some planets have many moons. Earth's moon affects tides and has different phases as it moves around the planet.",
    color: "#E1E1E1",
  },
  {
    id: "planet",
    name: "Planet",
    thumbnailImage: "/hubble_uranus.jpg",
    mainVideo: "https://cdn.pixabay.com/video/2023/04/25/160398-821086395_large.mp4",
    description: "A planet is a large celestial body that orbits a star and has enough gravity to maintain a round shape. Planets can be rocky like Earth and Mars or gas giants like Jupiter and Saturn. Some planets have atmospheres, moons, and weather patterns.",
    color: "#4B9CD3",
  },
  {
    id: "galaxy",
    name: "Galaxy",
    thumbnailImage: "/galaxy.jpg",
    mainVideo: "https://videos.pexels.com/video-files/6961824/6961824-uhd_2560_1440_30fps.mp4",
    description: "A galaxy is a vast collection of stars, planets, gas, and dust, all bound together by gravity. Some galaxies have billions or even trillions of stars. The Milky Way is our home galaxy, and it contains our solar system. Galaxies come in different shapes, such as spiral, elliptical, and irregular.",
    color: "#8A2BE2",
  },
  {
    id: "blackhole",
    name: "Black Hole",
    thumbnailImage: "/bh.jpg",
    mainVideo: "https://cdn.pixabay.com/video/2015/08/11/318-135988730_large.mp4",
    description: "A black hole is a region in space where gravity is so strong that nothing, not even light, can escape. It forms when a massive star collapses under its own gravity. Black holes can grow by pulling in nearby matter, and they are often found at the centers of galaxies.",
    color: "#36454F",
  },
  {
    id: "nebula",
    name: "Nebula",
    thumbnailImage: "/nebula.jpg",
    mainVideo: "https://cdn.pixabay.com/video/2024/06/15/216848_large.mp4",
    description: "A nebula is a giant cloud of gas and dust in space. Some nebulae are the birthplaces of new stars, while others are the remains of dead stars. They come in different shapes and colors, creating beautiful patterns in space. The Orion Nebula is one of the most famous nebulae visible from Earth.",
    color: "#FF69B4",
  },
];

export default function Section02() {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const [videoLoaded, setVideoLoaded] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [isLastItemViewed, setIsLastItemViewed] = useState<boolean>(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const scrollTimeout = useRef<any>(null);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    if (selectedIndex === 0) {
      const section01 = document.getElementById("section01");
      if (section01) {
        section01.style.display = "block";
      }
    }
    
    // Track when the last item has been viewed
    if (selectedIndex === celestialObjects.length - 1) {
      setIsLastItemViewed(true);
    }
  }, [selectedIndex]);

  const isInViewport = useCallback((element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.75 &&
      rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) * 0.25
    );
  }, []);

  const navigateItems = useCallback((direction: 'up' | 'down') => {
    if (isScrolling) return;
    
    setIsScrolling(true);
    
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }
    
    scrollTimeout.current = setTimeout(() => {
      setIsScrolling(false);
    }, 800);
    
    if (direction === 'down') {
      if (selectedIndex < celestialObjects.length - 1) {
        setSelectedIndex(selectedIndex + 1);
      } else if (selectedIndex === celestialObjects.length - 1 && isLastItemViewed) {
        // Only move to next section when last item has been viewed AND user scrolls again
        const section03 = document.getElementById("section03");
        if (section03) {
          section03.scrollIntoView({ behavior: "smooth" });
        }
      }
    } else {
      if (selectedIndex > 0) {
        setSelectedIndex(selectedIndex - 1);
      } else if (selectedIndex === 0) {
        const section01 = document.getElementById("section01");
        if (section01) {
          section01.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  }, [selectedIndex, isScrolling, isLastItemViewed]);

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      if (sectionRef.current && isInViewport(sectionRef.current)) {
        e.preventDefault();
        navigateItems(e.deltaY > 0 ? 'down' : 'up');
      }
    };

    window.addEventListener("wheel", handleScroll, { passive: false });
    
    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, [navigateItems, isInViewport]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (sectionRef.current && isInViewport(sectionRef.current)) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          navigateItems('down');
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          navigateItems('up');
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigateItems, isInViewport]);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (sectionRef.current && isInViewport(sectionRef.current)) {
        setTouchStartY(e.touches[0].clientY);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (touchStartY !== null && sectionRef.current && isInViewport(sectionRef.current)) {
        e.preventDefault();
        const touchEndY = e.touches[0].clientY;
        const diff = touchStartY - touchEndY;
        
        if (Math.abs(diff) > 50) {
          navigateItems(diff > 0 ? 'down' : 'up');
          setTouchStartY(null);
        }
      }
    };

    const handleTouchEnd = () => {
      setTouchStartY(null);
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);
    
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [touchStartY, navigateItems, isInViewport]);

  useEffect(() => {
    return () => {
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, celestialObjects.length);
    
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === selectedIndex) {
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise
              .then(() => setVideoLoaded(true))
              .catch(() => setVideoLoaded(true));
          }
        } else {
          video.pause();
          if (video.currentTime) video.currentTime = 0;
        }
      }
    });
  }, [selectedIndex]);

  const handleItemClick = (index: number) => setSelectedIndex(index);
  const handleDotClick = (index: number) => setSelectedIndex(index);
  const handleScrollDown = () => navigateItems('down');
  const handleScrollUp = () => navigateItems('up');

  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  // Add a visual indicator for mobile that shows when the user can scroll to next section
  const isReadyForNextSection = isLastItemViewed && selectedIndex === celestialObjects.length - 1;
  
  return (
    <section
      ref={sectionRef}
      id="scroll-target"
      className="relative w-full h-screen bg-black text-white overflow-hidden"
      tabIndex={0}
    >
      <div className="absolute top-4 left-4 bg-black/50 text-white px-2 py-1 rounded-md z-50 text-xs sm:text-sm">
        Item: {selectedIndex + 1}/{celestialObjects.length}
      </div>

      <div className="md:hidden absolute top-4 right-4 z-50">
        <button 
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="bg-black/50 text-white p-2 rounded-full"
        >
          {showMobileMenu ? "✕" : "☰"}
        </button>
      </div>

      {isMobile && showMobileMenu && (
        <div className="md:hidden fixed inset-0 bg-black/90 z-40 flex flex-col justify-space-evenly items-center">
          <div className="w-full max-h-[80vh] overflow-y-auto p-4 flex flex-col gap-4">
            {celestialObjects.map((obj, index) => (
              <div
                key={obj.id}
                onClick={() => {
                  handleItemClick(index);
                  setShowMobileMenu(false);
                }}
                className={`flex items-center gap-3 cursor-pointer w-full p-2 ${
                  selectedIndex === index ? "bg-white/10 rounded-lg" : ""
                }`}
              >
                <div
                  className="w-12 h-12 flex items-center justify-center rounded-full overflow-hidden"
                  style={{ backgroundColor: selectedIndex === index ? obj.color : "#2A2A2A" }}
                >
                  <Image
                    src={obj.thumbnailImage}
                    alt={obj.name}
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                  />
                </div>
                <span className={`text-lg font-semibold ${selectedIndex === index ? "text-white" : "text-gray-400"}`}>
                  {obj.name}
                </span>
                {selectedIndex === index && <div className="h-0.5 bg-white flex-grow ml-2" />}
              </div>
            ))}
          </div>
          <button 
            onClick={() => setShowMobileMenu(false)}
            className="mt-6 px-6 py-2 bg-white/10 rounded-full text-white"
          >
            Close
          </button>
        </div>
      )}

      <div className="hidden md:flex absolute right-4 lg:right-8 top-1/2 transform -translate-y-1/2 flex-col gap-2 lg:gap-4 z-30">
        {celestialObjects.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-2 h-2 lg:w-3 lg:h-3 rounded-full transition-all duration-300 ${
              selectedIndex === index ? "bg-white scale-125" : "bg-gray-500 hover:bg-gray-300"
            }`}
            aria-label={`Go to item ${index + 1}`}
          />
        ))}
      </div>

      {selectedIndex > 0 && (
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-center z-30">
          <button 
            className="w-10 h-16 flex flex-col items-center justify-start pt-2 border-2 border-gray-400 rounded-full mx-auto cursor-pointer transition-all hover:border-white hover:bg-white/10"
            onClick={handleScrollUp}
          >
            <FaChevronUp className="text-white animate-bounce" />
          </button>
          <p className="text-gray-400 mt-2 text-xs sm:text-sm">Scroll up</p>
        </div>
      )}

      <div className="flex h-full w-full flex-col md:flex-row items-center justify-center">
        <div className="w-full md:w-2/3 flex flex-col items-center justify-center px-4 md:px-12 h-full">
          {celestialObjects.map((obj, index) => (
            selectedIndex === index && (
              <div key={obj.id} className="text-center max-w-2xl w-full transition-opacity duration-500">
                <div className="inline-block relative mb-4 w-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-20 blur-xl rounded-full transform scale-150"></div>
                  <h1 className="relative text-2xl sm:text-4xl lg:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-400 py-2 text-center">
                    {obj.name}
                  </h1>
                </div>
                <div className="relative mb-6 md:mb-10 w-full flex justify-center">
                  <div className="relative w-full max-w-lg aspect-video mx-auto border-2 border-white rounded-lg overflow-hidden">
                    {!videoLoaded && (
                      <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/50">
                        <div className="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-t-2 border-b-2 border-white"></div>
                      </div>
                    )}
                    <video
                      ref={(el) => { videoRefs.current[index] = el; }}
                      src={obj.mainVideo}
                      className="w-full h-full object-cover rounded-lg"
                      loop
                      muted
                      autoPlay
                      playsInline
                      onLoadedData={() => setVideoLoaded(true)}
                    />
                  </div>
                </div>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed px-4 md:px-0 text-center max-h-40 md:max-h-52 overflow-y-auto">
                  {obj.description}
                </p>
              </div>
            )
          ))}
        </div>

        <div className="hidden md:flex w-1/3 flex-col items-start justify-center gap-4 lg:gap-8 pl-4 lg:pl-12 pr-4 lg:pr-16">
          {celestialObjects.map((obj, index) => (
            <div
              key={obj.id}
              onClick={() => handleItemClick(index)}
              className={`flex items-center gap-2 lg:gap-4 cursor-pointer w-full transition-all duration-300 
                ${selectedIndex === index ? "opacity-100" : "opacity-40 hover:opacity-70"}`}
            >
              <div
                className={`w-10 h-10 lg:w-16 lg:h-16 flex items-center justify-center rounded-full overflow-hidden transition-all duration-300`}
                style={{ backgroundColor: selectedIndex === index ? obj.color : "#2A2A2A" }}
              >
                <Image
                  src={obj.thumbnailImage}
                  alt={obj.name}
                  width={64}
                  height={64}
                  className="object-cover w-full h-full"
                />
              </div>
              <span className={`text-sm lg:text-xl font-semibold ${selectedIndex === index ? "text-white" : "text-gray-400"}`}>
                {obj.name}
              </span>
              {selectedIndex === index && (
                <div className="h-0.5 bg-white flex-grow ml-2 lg:ml-4 animate-pulse" />
              )}
            </div>
          ))}
        </div>
      </div>

      {isReadyForNextSection ? (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center z-30">
          <p className="text-gray-400 mb-2 text-xs sm:text-sm">Scroll to next section</p>
          <button 
            className="w-10 h-16 flex flex-col items-center justify-end pb-2 border-2 border-white rounded-full mx-auto cursor-pointer transition-all animate-pulse hover:bg-white/10"
            onClick={handleScrollDown}
          >
            <FaChevronDown className="text-white animate-bounce" />
          </button>
        </div>
      ) : selectedIndex < celestialObjects.length - 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center z-30">
          <p className="text-gray-400 mb-2 text-xs sm:text-sm">Scroll to explore</p>
          <button 
            className="w-10 h-16 flex flex-col items-center justify-end pb-2 border-2 border-gray-400 rounded-full mx-auto cursor-pointer transition-all hover:border-white hover:bg-white/10"
            onClick={handleScrollDown}
          >
            <FaChevronDown className="text-white animate-bounce" />
          </button>
        </div>
      )}
    </section>
  );
}