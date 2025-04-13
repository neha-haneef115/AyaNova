"use client"
import React, { useEffect, useState } from 'react';
import moon from "@/public/full-moon-1869760_1280-removebg-preview (1).png";
import { GiHamburgerMenu } from "react-icons/gi";
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Removed the auto-scroll effect as it may conflict with navigation
  // useEffect(() => {
  //   const section = document.getElementById("section-01");
  //   if (section) {
  //     section.scrollIntoView({ behavior: "smooth" });
  //   }
  // }, []);

  return (
    <header className="top-0 left-0 w-full h-[92px] flex justify-between items-center px-4 sm:px-10 border-b border-white backdrop-blur-md bg-[#18230F]/40 z-50 sticky">
      {/* Logo with prefetch */}
      <Link href="/" prefetch className="hover:scale-105 active:scale-95 transition-transform">
        <h1 className="text-2xl flex font-semibold tracking-wide bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent cursor-pointer">
          AyaNova <Image src={moon} height={17} width={17} alt="moon" className='ml-0 mt-[14px]' priority />
        </h1>
      </Link> 

      {/* Desktop Navigation with prefetch */}
      <nav className="hidden md:flex gap-6 lg:gap-8 text-white text-base lg:text-lg">
        <Link href="/" prefetch className="hover:text-pink-600 transition-colors">
          Home
        </Link>
        <Link href="/category" prefetch className="hover:text-pink-600 transition-colors">
          Category
        </Link>
        <Link href="/about_us" prefetch className="hover:text-pink-600 transition-colors">
          About us
        </Link>
        <Link href="/contact" prefetch className="hover:text-pink-600 transition-colors">
          Contact
        </Link>
      </nav>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-white hover:scale-110 active:scale-95 transition-transform"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Menu"
      >
        <GiHamburgerMenu size={30} />
      </button>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="absolute top-[92px] left-0 right-0 w-full bg-black/90 p-6 text-white flex flex-col gap-4 z-50">
          <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-pink-600 py-2">
            Home
          </Link>
          <Link href="/category" onClick={() => setIsOpen(false)} className="hover:text-pink-600 py-2">
            Category
          </Link>
          <Link href="/about_us" onClick={() => setIsOpen(false)} className="hover:text-pink-600 py-2">
            About us
          </Link>
          <Link href="/contact" onClick={() => setIsOpen(false)} className="hover:text-pink-600 py-2">
            Contact
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;