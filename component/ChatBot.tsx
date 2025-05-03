"use client";
import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Tars from "@/public/tr2.png";

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

const TarsChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Welcome to AyaNova! I'm TARS. How can I assist you on your cosmic journey?", sender: 'bot' }
  ]);
  const [input, setInput] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const dragHandleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (!isOpen || !isMobile || !chatContainerRef.current || !dragHandleRef.current) return;

    const handleTouchStart = (e: TouchEvent) => {
      if (dragHandleRef.current?.contains(e.target as Node)) {
        setIsDragging(true);
        e.preventDefault();
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      const touch = e.touches[0];
      setPosition({
        x: Math.min(0, touch.clientX - window.innerWidth + 100),
        y: Math.min(0, touch.clientY - window.innerHeight + 100)
      });
      e.preventDefault();
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, isOpen, isMobile]);

  const sendMessage = useCallback(async () => {
    if (!input.trim()) return;
    
    const userMessage: Message = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      
      const data = await response.json();
      setMessages(prev => [...prev, { 
        text: data.response || "Sorry, I couldn't process your request.", 
        sender: 'bot' 
      }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages(prev => [...prev, { 
        text: "I'm having connection issues. Please try again later.", 
        sender: 'bot' 
      }]);
    } finally {
      setIsTyping(false);
    }
  }, [input]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') sendMessage();
  }, [sendMessage]);

  const toggleChat = useCallback(() => {
    setIsOpen(prev => !prev);
    setPosition({ x: 0, y: 0 });
  }, []);

  return (
    <div className="fixed bottom-34 right-20 sm:bottom-6 sm:right-6 z-50">
      <button 
        onClick={toggleChat}
        className={`
          flex items-center justify-center gap-2
          bg-gradient-to-r from-indigo-900 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900
          text-white font-bold px-4 py-3 rounded-full shadow-lg hover:shadow-xl
          border border-indigo-500/30 transition-all duration-300
          transform hover:scale-105
        `}
      >
        <div className="relative w-7 h-7 rounded-full overflow-hidden border-2 border-white/70 shadow-inner">
          <Image 
            src={Tars} 
            width={40} 
            height={40} 
            alt="TARS Avatar" 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            priority
          />
        </div>
        <span className="font-semibold text-sm transition-all duration-300 hover:text-pink-600">
          {isMobile ? 'TARS' : 'Chat with TARS'}
        </span>
      </button>

      {isOpen && (
        <div 
          ref={chatContainerRef}
          className={`
            fixed ${isMobile ? 'bottom-30 right-16' : 'bottom-34 right-18'}
            ${isMobile ? 'w-[85vw] max-w-[320px] h-[60vh]' : 'w-96 h-[500px]'}
            bg-gray-900 shadow-2xl rounded-lg border border-indigo-700 flex flex-col
            transition-transform duration-300
            ${isDragging ? 'cursor-grabbing' : 'cursor-default'}
          `}
          style={{
            transform: isMobile ? `translate(${position.x}px, ${position.y}px)` : 'none',
            touchAction: 'none'
          }}
        >
          <div 
            ref={dragHandleRef}
            className={`bg-indigo-700 p-3 flex items-center border-b border-indigo-800 ${isMobile ? 'cursor-move' : ''}`}
          >
            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-indigo-400 flex-shrink-0">
              <Image src={Tars} width={32} height={32} alt="TARS Avatar" className="w-full h-full object-cover" />
            </div>
            <div className="ml-3 flex-1 min-w-0">
              <h3 className="text-white font-medium truncate">TARS</h3>
              <div className="flex items-center">
                <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                <span className="text-xs text-white truncate">Online | AyaNova AI</span>
              </div>
            </div>
            <button 
              onClick={toggleChat}
              className="ml-2 text-white hover:text-indigo-300 transition-colors"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div 
            className="flex-1 p-3 overflow-y-auto space-y-2"
            style={{
              background: 'linear-gradient(to bottom, #0f172a, #1e293b)',
              backgroundImage: 'radial-gradient(white, rgba(255,255,255,0.2) 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}
          >
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-full overflow-hidden border border-indigo-500 flex-shrink-0 mr-2">
                    <Image src={Tars} width={28} height={28} alt="TARS" className="w-full h-full object-cover" />
                  </div>
                )}
                <div
                  className={`
                    max-w-[85%] p-2 rounded-lg text-sm
                    ${msg.sender === 'user' 
                      ? 'bg-indigo-700 text-white' 
                      : 'bg-gray-800 text-gray-100 border border-indigo-900'
                    }
                  `}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="w-7 h-7 rounded-full overflow-hidden border border-indigo-500 flex-shrink-0 mr-2">
                  <Image src={Tars} width={28} height={28} alt="TARS" className="w-full h-full object-cover" />
                </div>
                <div className="bg-gray-800 text-gray-100 border border-indigo-900 p-2 rounded-lg max-w-[85%]">
                  <div className="flex space-x-1">
                    {[0, 0.2, 0.4].map(delay => (
                      <div 
                        key={delay} 
                        className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce"
                        style={{ animationDelay: `${delay}s` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="bg-gray-800 p-2 border-t border-indigo-700">
            <div className="flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 p-2 px-3 bg-gray-700 text-gray-100 rounded-l-lg outline-none border border-indigo-700 focus:border-indigo-500 text-sm"
                placeholder="Type your message..."
              />
              <button 
                onClick={sendMessage}
                disabled={!input.trim()}
                className="bg-indigo-700 text-white px-3 py-2 rounded-r-lg transition-colors duration-300 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </div>
            <div className="text-xs text-gray-500 mt-1 flex justify-between items-center">
              <span>Powered by AyaNova AI</span>
              <span className="text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer">Help</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(TarsChat);