import React, { useState, useEffect, useRef } from "react";
import { FaArrowUp } from "react-icons/fa";
import { motion, useInView } from "framer-motion";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import AiTools from "../components/AiTools";
import Plan from "../components/Plan";
import Footer from "../components/Footer";

const Section = ({ children }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.2 }); // 20% of section must be visible

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

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

      {/* Wrapping all sections with Section component */}
      
        <Hero />
      
      <Section>
        <AiTools />
      </Section>

      <Section>
        <Plan />
      </Section>

      <Section>
        <Footer />
      </Section>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-5 right-5 p-3 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 ease-in-out transform 
          ${showButton ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5 pointer-events-none"}`}
      >
        <FaArrowUp size={18} />
      </button>
    </>
  );
};

export default Home;
