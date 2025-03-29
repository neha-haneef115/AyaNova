"use client"
import React, { useEffect, useState } from 'react';
import moon from "@/public/full-moon-1869760_1280-removebg-preview (1).png";
import { GiHamburgerMenu } from "react-icons/gi";
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const section = document.getElementById("section-01");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <header className="top-0 left-0 w-full h-[92px] flex justify-between items-center px-10 border-b border-white backdrop-blur-md bg-[#18230F]/40 z-50 relative">
      {/* Logo */}
    <Link href="/"> <h1 className="text-2xl flex font-semibold tracking-wide bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent cursor-pointer hover:scale-105 transition-transform">
        AyaNova <span><Image src={moon} height={17} width={17} alt="moon" className='ml-0 mt-[14px]' /></span>
      </h1></Link> 

      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-8 text-white text-lg">
      <Link href="/" className="hover:font-bold hover:text-pink-600 transition-transform hover:scale-105 cursor-pointer">
        Home
      </Link>
      <Link href="/category" className="hover:font-bold hover:text-pink-600 transition-transform hover:scale-105 cursor-pointer">
        Category
      </Link>
      <Link href="/about_us" className="hover:font-bold hover:text-pink-600 transition-transform hover:scale-105 cursor-pointer">
        About us
      </Link>
      <Link href="/contact" className="hover:font-bold hover:text-pink-600 transition-transform hover:scale-105 cursor-pointer">
        Contact!
      </Link>
    </nav>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          className="text-white cursor-pointer hover:scale-110 transition-transform"
          onClick={() => setIsOpen(!isOpen)}
        >
          <GiHamburgerMenu size={30} />
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="absolute top-[92px] right-0 w-full md:w-auto md:right-8 bg-black/90 p-6 text-white shadow-lg flex flex-col gap-4 z-50">
         <Link href="/" 
     className="hover:text-pink-600 transition-transform hover:scale-105 cursor-pointer">Home
  </Link>
  <Link href="/category" 
     className="hover:text-pink-600 transition-transform hover:scale-105 cursor-pointer">Category
  </Link>
  <Link href="/about_us" 
  className="hover:text-pink-600 transition-transform hover:scale-105 cursor-pointer">About us
  </Link>
  <Link href="/contact" 
     className="hover:text-pink-600 transition-transform hover:scale-105 cursor-pointer">Contact
  </Link>
        </div>
      )}
    </header>
  );
};

export default Header;