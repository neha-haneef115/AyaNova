"use client";
import React, { useEffect } from "react";
import Section02 from "@/component/Section02";
import Section01 from '@/component/Section01';
import Section03 from '@/component/Section03';
import Chatbot from "@/component/ChatBot";
import Footer from "@/component/Footer";
import { Analytics } from "@vercel/analytics/react";

export default function Home() {
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.top < window.innerHeight) {
          console.log(`Active Section: ${section.id}`);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <Analytics />
      <Section01 />
      <Chatbot />
      <Section02 />
      <Section03 />
      <Chatbot />
      
    </div>
  );
}
