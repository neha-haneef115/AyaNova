import React, { useState, useRef, useEffect } from 'react';
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
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (): Promise<void> => {
    if (!input.trim()) return;
    
    const userMessage: Message = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    try {
      // Make actual API call to your backend
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      
      const botResponse: Message = { 
        text: data.response || "Sorry, I couldn't process your request at this time.", 
        sender: 'bot' 
      };
      
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error("Error sending message:", error);
      
      // Add error message to chat
      const errorMessage: Message = { 
        text: "I apologize, but I'm having trouble connecting to my cosmic network. Please try again later.", 
        sender: 'bot' 
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-15 right-4 flex flex-col items-end z-50">
      {/* Chat Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className={`
          relative overflow-hidden cursor-pointer 
          bg-gradient-to-r from-indigo-900 to-indigo-800 
          hover:from-indigo-700 hover:to-indigo-900
          text-white font-bold px-5 py-3.5 border-white rounded-full 
          shadow-lg hover:shadow-xl
          transition-all duration-300 ease-in-out
          flex items-center justify-center gap-2
          group transform hover:scale-105
          border border-indigo-500/30
        `}
      >
        {isOpen ? (
          <>
            <span className="absolute inset-0 bg-indigo-900/20 font-bold rounded-full transition-opacity duration-300 group-hover:opacity-100 opacity-0"></span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="transform transition-transform duration-300 group-hover:rotate-90"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </>
        ) : (
          <>
            <span className="absolute inset-0 bg-indigo-500/10 rounded-full transition-opacity duration-300 group-hover:opacity-100 opacity-0"></span>
            <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-white/70 shadow-inner">
              <Image 
                src={Tars} 
                width={40} 
                height={40} 
                alt="TARS Avatar" 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
              />
            </div>
            <span className="font-semibold text-sm mx-1 
  transition-all duration-300 
  group-hover:text-pink-600 
  group-hover:font-bold">
  Chat with TARS
</span>

          </>
        )}
        <span className="absolute -bottom-10 -right-10 w-20 h-20 bg-white/10 rounded-full transform transition-transform duration-700 group-hover:scale-150"></span>
      </button>

      {/* Chat Container */}
      {isOpen && (
        <div className="w-96 bg-gray-900 shadow-2xl rounded-lg mt-3 border border-indigo-700 flex flex-col overflow-hidden transition-all duration-300 animate-fadeIn" style={{maxHeight: '80vh', height: '500px'}}>
          {/* Chat Header with gradient theme */}
          <div className="bg-indigo-700 p-3 flex items-center border-b border-indigo-800">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-indigo-400 flex-shrink-0">
              <Image src={Tars} width={40} height={40} alt="TARS Avatar" className="w-full h-full object-cover" />
            </div>
            <div className="ml-3 flex-1">
              <h3 className="text-white font-medium">TARS</h3>
              <div className="flex items-center">
                <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                <span className="text-xs text-white">Online | AyaNova AI Assistant</span>
              </div>
            </div>
           
          </div>

          {/* Chat Background with Stars */}
          <div 
            className="flex-1 p-4 overflow-y-auto space-y-4 relative"
            style={{
              background: 'linear-gradient(to bottom, #0f172a, #1e293b)',
              backgroundImage: `radial-gradient(white, rgba(255, 255, 255, 0.2) 2px, transparent 2px)`,
              backgroundSize: '100px 100px'
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-indigo-500 flex-shrink-0 mr-2">
                    <Image src={Tars} width={32} height={32} alt="TARS" className="w-full h-full object-cover" />
                  </div>
                )}
                <div
                  className={`max-w-3/4 p-3 rounded-lg ${
                    msg.sender === 'user' 
                      ? 'bg-indigo-700 text-white' 
                      : 'bg-gray-800 text-gray-100 border border-indigo-900'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-indigo-500 flex-shrink-0 mr-2">
                  <Image src={Tars} width={32} height={32} alt="TARS" className="w-full h-full object-cover" />
                </div>
                <div className="bg-gray-800 text-gray-100 border border-indigo-900 p-3 rounded-lg max-w-3/4">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Field */}
          <div className="bg-gray-800 p-3 border-t border-indigo-700">
            <div className="flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 p-2 px-4 bg-gray-700 text-gray-100 rounded-l-lg outline-none border border-indigo-700 focus:border-indigo-500"
                placeholder="Type your message..."
              />
              <button 
                onClick={sendMessage} 
                className={`
                  bg-indigo-700 cursor-pointer text-white px-4 py-2 rounded-r-lg transition-colors duration-300 
                  flex items-center justify-center
                  ${!input.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-500'}
                `}
                disabled={!input.trim()}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </div>
            <div className="text-xs text-gray-500 mt-2 flex justify-between items-center">
              <span>Powered by AyaNova AI</span>
              <span className="text-indigo-400 cursor-pointer hover:text-indigo-300 transition-colors">Help</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TarsChat;