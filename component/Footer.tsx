import React from "react";

const Footer = () => {
  return (
    <footer id="Footer" className="bg-[#282c34] py-5 border-t border-white scroll-snap-align-end">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Rights Reserved Section */}
        <p className="text-white">
          &copy; {new Date().getFullYear()} AyaNova. All rights reserved.
        </p>

        {/* Credit Section */}
        <p className="text-white">
          Made with ❤️ by Neha Haneef
        </p>
      </div>
    </footer>
  );
};

export default Footer;