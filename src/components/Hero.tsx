
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, MapPin, Zap, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
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

    const featuresElements = document.querySelectorAll('.reveal');
    featuresElements.forEach((el) => {
      observer.observe(el);
    });

    return () => {
      featuresElements.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="relative pt-20" ref={heroRef}>
      {/* Hero Background with Gradient Overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?q=80&w=2942)', 
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/90" />
      </div>
      
      {/* Hero Content */}
      <div className="relative pt-24 pb-20 md:pt-32 md:pb-28 app-container">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold reveal">
            The Ultimate Automobile Expo Experience
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground reveal">
            Connect with leading car manufacturers, discover latest models, and experience the future of automotive technology - all in one place.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 reveal">
            <Link to="/events">
              <Button size="lg" className="w-full sm:w-auto">
                <CalendarDays className="mr-2 h-5 w-5" />
                Browse Events
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Register Now
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="relative app-container pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Event Booking",
              description: "Browse and book international auto expos with ease",
              icon: CalendarDays,
              delay: 0,
            },
            {
              title: "Travel Planning",
              description: "Book flights, trains, hotels - all in one platform",
              icon: MapPin,
              delay: 100,
            },
            {
              title: "Charging Stations",
              description: "Pre-book EV charging or fuel stations along your route",
              icon: Zap,
              delay: 200,
            },
            {
              title: "Networking",
              description: "Connect with industry professionals and enthusiasts",
              icon: Users,
              delay: 300,
            },
          ].map((feature, index) => (
            <div 
              key={index}
              className="glass-panel p-6 flex flex-col items-center text-center reveal"
              style={{ transitionDelay: `${feature.delay}ms` }}
            >
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
