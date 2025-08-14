import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import AiTools from '../components/AiTools';
import Testimonial from '../components/Testimonial';
import Plan from '../components/Plan';
import Footer from '../components/Footer';

const Home = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Navbar />
      <Hero />
      <AiTools />
      <Testimonial />
      <Plan />
      <Footer />

      {/* Smooth appearing button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-5 right-5  text-blue-600 p-3 rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out transform 
        ${showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5 pointer-events-none'}`}
      >
        <FaArrowUp size={18} />
      </button>
    </>
  );
};

export default Home;
