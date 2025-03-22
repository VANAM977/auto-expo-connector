
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FeaturedEvents from '../components/FeaturedEvents';
import TravelSection from '../components/TravelSection';
import ChargingSection from '../components/ChargingSection';
import TestimonialSection from '../components/TestimonialSection';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';

const Index = () => {
  useEffect(() => {
    // Animation observer for revealing elements on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => {
      observer.observe(el);
    });

    // Cleanup
    return () => {
      revealElements.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        <FeaturedEvents />
        <TravelSection />
        <ChargingSection />
        <TestimonialSection />
        <CallToAction />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
