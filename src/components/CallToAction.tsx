
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, Zap, MapPin, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CallToAction = () => {
  const ctaRef = useRef<HTMLDivElement>(null);
  
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

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => {
      observer.observe(el);
    });

    return () => {
      elements.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <section 
      className="py-20 relative overflow-hidden" 
      ref={ctaRef}
    >
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1983)', 
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-background/90" />
      </div>
      
      <div className="relative app-container">
        <div className="max-w-3xl mx-auto text-center reveal">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Elevate Your Auto Expo Experience?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of automobile enthusiasts who use our platform to make their expo journey seamless, efficient, and memorable.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              {
                icon: CalendarDays,
                label: "Event Booking",
                image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=2070"
              },
              {
                icon: MapPin,
                label: "Travel Planning",
                image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070"
              },
              {
                icon: Zap,
                label: "Charging Stations",
                image: "https://images.unsplash.com/photo-1558424871-c0cc8c6d10b7?q=80&w=2070"
              },
              {
                icon: Bell,
                label: "Event Updates",
                image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1983"
              }
            ].map((feature, index) => (
              <div key={index} className="flex flex-col items-center reveal glass-panel p-3 rounded-xl overflow-hidden" style={{ transitionDelay: `${index * 100}ms` }}>
                <div className="w-full h-24 mb-3 overflow-hidden rounded-lg">
                  <img 
                    src={feature.image} 
                    alt={feature.label} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <span className="text-sm font-medium">{feature.label}</span>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 reveal">
            <Link to="/signup">
              <Button size="lg" className="w-full sm:w-auto">
                Create Free Account
              </Button>
            </Link>
            <Link to="/events">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Browse Events
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
