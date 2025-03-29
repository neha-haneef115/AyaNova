"use client"
import React, { useState, ChangeEvent, FormEvent } from 'react';
import Header from '@/component/Header';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaTwitter, FaLinkedin, FaGithub, FaBehance } from 'react-icons/fa';
import Link from 'next/link';
import Footer from '@/component/Footer';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
  
        // Reset success message after 3 seconds
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 3000);
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData.error);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900'>
      <Header/>
    <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 min-h-screen py-8 text-gray-200">
      <div className="max-w-4xl mx-auto px-6 text-center mb-9">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-emerald-400">
          Contact Us
        </h1>
        <div className="bg-slate-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg mb-12 border border-cyan-900">
          <p className="text-lg text-gray-300 leading-relaxed">
            Have questions about <span className="font-semibold text-cyan-400">AyaNova</span> or interested in collaborating? 
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mb-16">
        
        {/* Contact Form Section */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-3 bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-cyan-900">
            <h2 className="text-2xl font-bold mb-6 text-gray-100">Send a Message</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-300 mb-2">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-cyan-500 text-gray-200"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-300 mb-2">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-cyan-500 text-gray-200"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="subject" className="block text-gray-300 mb-2">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-cyan-500 text-gray-200"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-300 mb-2">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-cyan-500 text-gray-200"
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center shadow-lg disabled:opacity-70"
              >
                {isSubmitting ? 'Sending...' : (
                  <>
                    <FaPaperPlane className="mr-2" />
                    Send Message
                  </>
                )}
              </button>
              
              {submitSuccess && (
                <div className="mt-4 p-3 bg-emerald-900/50 border border-emerald-700 rounded-lg text-emerald-300">
                  Your message has been sent successfully!
                </div>
              )}
            </form>
          </div>
          
          <div className="md:col-span-2 bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-cyan-900">
            <h2 className="text-2xl font-bold mb-6 text-gray-100">Connect With Me</h2>
            <p className="text-gray-400 mb-6">
              Follow me on social media to stay updated with the latest developments of Ayanova and other projects.
            </p>
            
            <div className="space-y-4">
              <Link href="https://www.behance.net/nehahaneef115" className="flex items-center p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors duration-300">
                <FaBehance className="text-xl text-cyan-400 mr-3" />
                <span className="text-gray-300">@nehahaneef115</span>
              </Link>
              
              <Link href="https://www.linkedin.com/in/neha-haneef-299b40243/" className="flex items-center p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors duration-300">
                <FaLinkedin className="text-xl text-blue-400 mr-3" />
                <span className="text-gray-300">@neha-haneef115</span>
              </Link>
              
              <Link href="https://github.com/neha-haneef115" className="flex items-center p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors duration-300">
                <FaGithub className="text-xl text-gray-300 mr-3" />
                <span className="text-gray-300">@neha-haneef115</span>
              </Link>
            </div>
            
            
          </div>
        </div>
      </div>
      
        <div className="grid grid-cols-1 px-4 md:grid-cols-3 gap-5 mb-12">
          {/* Contact Card 1 */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300 border border-cyan-900">
            <div className="bg-slate-700 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-inner">
              <FaEnvelope className="text-2xl text-cyan-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-200 mb-2">
              Email
            </h3>
            <p className="text-cyan-400">
              nehahaneef203@gmail.com
            </p>
          </div>
          
          {/* Contact Card 2 */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300 border border-cyan-900">
            <div className="bg-slate-700 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-inner">
              <FaPhone className="text-2xl text-emerald-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-200 mb-2">
              Phone
            </h3>
            <p className="text-emerald-400">
              +923257220057
            </p>
          </div>
          
          {/* Contact Card 3 */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300 border border-cyan-900">
            <div className="bg-slate-700 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-inner">
              <FaMapMarkerAlt className="text-2xl text-amber-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-200 mb-2">
              Location
            </h3>
            <p className="text-amber-400">
            Karachi, PK
            </p>
          </div>
        </div>
      {/* Contact Section */}
    </div>
      <div className="bg-gradient-to-r from-cyan-900 to-emerald-900 py-12 rounded-t-3xl">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Looking Forward to Hearing From You</h2>
          <p className="text-lg text-cyan-100 mb-8">
            Whether you have a question about AyaNova, want to collaborate on a project, or just want to say hello,
            I'll try my best to get back to you as soon as possible!
          </p>
        </div>
      </div>
    <Footer/>
    </div>
  );
};

export default ContactUs;