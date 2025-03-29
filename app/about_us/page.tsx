"use client"
import React from 'react';
import Header from '@/component/Header';
import { FaGlobe, FaBook, FaStar, FaCode, FaUserAstronaut, FaEnvelope } from 'react-icons/fa';
import Footer from '@/component/Footer';
const AboutUs = () => {
  return (
    <div className='bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900'>
      <Header/>
    <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 min-h-screen py-8 text-gray-200">
      <div className="max-w-4xl mx-auto px-6 text-center mb-9">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-emerald-400">
          About Me
        </h1>
        <div className="bg-slate-800/80 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-cyan-900">
          <p className="text-lg text-gray-300 leading-relaxed">
            Hello, This is <span className="font-semibold text-cyan-400">Neha Haneef</span>, a passionate UI/UX designer and Next.js developer fascinated by the beauty of the cosmos. 
            With a strong love for both <span className="font-semibold text-emerald-400">technology</span> and <span className="font-semibold text-amber-400">astronomy</span>, I designed and created <span className="font-semibold text-cyan-400">Ayanova</span> to bridge the connection between celestial wonders 
            and the divine wisdom found in the Quran.
          </p>
        </div>
      </div>

      {/* Mission Section with starry accent */}
      <div className="max-w-6xl mx-auto px-6 mb-16 relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-800 rounded-full opacity-20 -z-10"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-emerald-800 rounded-full opacity-20 -z-10"></div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-emerald-400">
          Our Mission
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Mission Card 1 */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300 border-t-4 border-cyan-500 hover:translate-y-1">
            <div className="bg-slate-700 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-inner">
              <FaGlobe className="text-3xl text-cyan-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-200 mb-4">
              Explore the Cosmos
            </h3>
            <p className="text-gray-400">
              Discover the beauty and complexity of the universe through stunning visuals and scientific insights.
            </p>
          </div>
          {/* Mission Card 2 */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300 border-t-4 border-emerald-500 hover:translate-y-1">
            <div className="bg-slate-700 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-inner">
              <FaBook className="text-3xl text-emerald-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-200 mb-4">
              Connect with the Quran
            </h3>
            <p className="text-gray-400">
              Reflect on Quranic verses that highlight the signs of Allah's creation in the universe.
            </p>
          </div>
          {/* Mission Card 3 */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300 border-t-4 border-amber-500 hover:translate-y-1">
            <div className="bg-slate-700 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-inner">
              <FaStar className="text-3xl text-amber-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-200 mb-4">
              Inspire Curiosity
            </h3>
            <p className="text-gray-400">
              Encourage a deeper understanding of both science and faith through engaging content.
            </p>
          </div>
        </div>
      </div>

      {/* Personal Journey Section */}
      <div className="max-w-4xl mx-auto px-6 mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-emerald-400">
          My Journey
        </h2>
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-cyan-900">
          <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
            <div className="bg-slate-700 rounded-full p-6 w-24 h-24 flex items-center justify-center shadow-md">
              <FaUserAstronaut className="text-4xl text-cyan-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-200 mb-2">The Beginning</h3>
              <p className="text-gray-400">
                My fascination with the stars began in childhood, gazing at the night sky and wondering about our place in the universe. This curiosity led me to explore both astronomy and religious texts.
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="bg-slate-700 rounded-full p-6 w-24 h-24 flex items-center justify-center shadow-md">
              <FaCode className="text-4xl text-emerald-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-200 mb-2">Tech Meets Faith</h3>
              <p className="text-gray-400">
                As I developed my skills in UI/UX design and Next.js development, I realized I could create a platform that combines scientific knowledge with spiritual reflection, leading to the birth of Ayanova.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
    </div>
    
    <Footer/></div>
  );
};

export default AboutUs;