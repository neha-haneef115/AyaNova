"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

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
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const scrollTimeout = useRef<any>(null);

  useEffect(() => {
    if (selectedIndex === 0) {
      const section01 = document.getElementById("section01");
      if (section01) {
        section01.style.display = "block";
        section01.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [selectedIndex]);

  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, celestialObjects.length);
    
    const handleScroll = (e: WheelEvent) => {
      if (sectionRef.current && isInViewport(sectionRef.current)) {
        e.preventDefault();

        if (isScrolling) return;

        setIsScrolling(true);

        if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

        scrollTimeout.current = setTimeout(() => {
          setIsScrolling(false);
        }, 800);

        if (e.deltaY > 0) {
          if (selectedIndex < celestialObjects.length - 1) {
            setSelectedIndex(selectedIndex + 1);
          }
        } else {
          if (selectedIndex > 0) {
            setSelectedIndex(selectedIndex - 1);
          }
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (sectionRef.current && isInViewport(sectionRef.current)) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          if (selectedIndex < celestialObjects.length - 1) {
            setSelectedIndex(selectedIndex + 1);
          } else if (selectedIndex === celestialObjects.length - 1) {
            const section03 = document.getElementById("section03");
            if (section03) {
              section03.scrollIntoView({ behavior: "smooth" });
            }
          }
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          if (selectedIndex > 0) {
            setSelectedIndex(selectedIndex - 1);
          } else if (selectedIndex === 0) {
            setSelectedIndex(0);
          }
        }
      }
    };

    function isInViewport(element: HTMLElement) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
      );
    }

    window.addEventListener("wheel", handleScroll, { passive: false });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, [selectedIndex, isScrolling]);

  useEffect(() => {
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
  const handleScrollDown = () => selectedIndex < celestialObjects.length - 1 && setSelectedIndex(selectedIndex + 1);
  const handleScrollUp = () => selectedIndex > 0 && setSelectedIndex(selectedIndex - 1);

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

      <div className="hidden md:flex absolute right-4 lg:right-8 top-1/2 transform -translate-y-1/2 flex-col gap-2 lg:gap-4">
        {celestialObjects.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-2 h-2 lg:w-3 lg:h-3 rounded-full ${selectedIndex === index ? "bg-white scale-125" : "bg-gray-500"}`}
            aria-label={`Go to item ${index + 1}`}
          />
        ))}
      </div>

      {selectedIndex > 0 && (
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-center">
          <div className="w-6 h-12 border-2 border-gray-400 rounded-full mx-auto flex justify-center cursor-pointer" onClick={handleScrollUp}>
            <div className="w-2 h-2 bg-white rounded-full mt-6" />
          </div>
          <p className="text-gray-400 mt-2 text-xs sm:text-sm">Scroll up</p>
        </div>
      )}

      <div className="flex h-full w-full flex-col md:flex-row items-center justify-center">
        <div className="w-full md:w-2/3 flex flex-col items-center justify-center px-4 md:px-12">
          {celestialObjects.map((obj, index) => (
            selectedIndex === index && (
              <div key={obj.id} className="text-center max-w-2xl w-full">
                <div className="inline-block relative mb-4 w-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-20 blur-xl rounded-full transform scale-150"></div>
                  <h1 className="relative text-2xl sm:text-4xl lg:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-400 py-2 text-center">
                    {obj.name}
                  </h1>
                </div>
                <div className="relative mb-6 md:mb-10 w-full flex justify-center">
                  <div className="relative w-full max-w-lg aspect-video mx-auto border-2 border-white rounded-lg">
                    {!videoLoaded && (
                      <div className="absolute inset-0 flex items-center justify-center z-10">
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
                <p className="text-sm sm:text-base md:text-xl leading-relaxed px-4 md:px-0 text-center">
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
              className={`flex items-center gap-2 lg:gap-4 cursor-pointer w-full ${selectedIndex === index ? "opacity-100" : "opacity-40 hover:opacity-70"}`}
            >
              <div
                className={`w-10 h-10 lg:w-16 lg:h-16 flex items-center justify-center rounded-full overflow-hidden`}
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
              {selectedIndex === index && <div className="h-0.5 bg-white flex-grow ml-2 lg:ml-4" />}
            </div>
          ))}
        </div>
      </div>

      {selectedIndex < celestialObjects.length - 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
          <p className="text-gray-400 mb-2 text-xs sm:text-sm">Scroll to explore</p>
          <div className="w-6 h-12 border-2 border-gray-400 rounded-full mx-auto flex justify-center cursor-pointer" onClick={handleScrollDown}>
            <div className="w-2 h-2 bg-white rounded-full mt-2" />
          </div>
        </div>
      )}
    </section>
  );
}