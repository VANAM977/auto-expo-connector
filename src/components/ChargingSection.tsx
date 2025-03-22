
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Fuel, CreditCard, Map } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ChargingSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
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
    <section className="section app-container" ref={sectionRef}>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
        <div className="lg:col-span-2 relative h-[500px] reveal order-2 lg:order-1">
          <div className="absolute -top-10 -left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl z-0"></div>
          <img 
            src="https://images.unsplash.com/photo-1558424871-c0cc8c6d10b7?q=80&w=2070" 
            alt="EV Charging Station" 
            className="w-full h-full rounded-xl object-cover shadow-lg relative z-10"
          />
          <div className="grid grid-cols-2 gap-4 absolute -bottom-6 -right-6 max-w-xs z-20">
            <div className="glass-panel p-4 col-span-1">
              <Zap className="h-6 w-6 text-primary mb-2" />
              <h4 className="text-sm font-semibold">Fast Charging</h4>
              <p className="text-xs text-muted-foreground mt-1">30+ min quick charge</p>
            </div>
            <div className="glass-panel p-4 col-span-1">
              <Fuel className="h-6 w-6 text-primary mb-2" />
              <h4 className="text-sm font-semibold">Fuel Stations</h4>
              <p className="text-xs text-muted-foreground mt-1">5000+ locations</p>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-3 space-y-6 order-1 lg:order-2">
          <h2 className="text-3xl md:text-4xl font-bold reveal">
            Fuel & Charging Station Pre-Booking
          </h2>
          <p className="text-muted-foreground reveal">
            Never worry about finding a charging point or fuel station on your journey to auto expos. Pre-book your slots at thousands of stations across the country.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 reveal">
            {[
              {
                icon: Map,
                title: "Station Locator",
                description: "Find and filter charging/fuel stations along your route",
              },
              {
                icon: CreditCard,
                title: "Secure Payments",
                description: "Pay in advance to guarantee availability upon arrival",
              },
              {
                icon: Zap,
                title: "EV Compatibility",
                description: "Filter by connector type and charging speed for your vehicle",
              },
              {
                icon: Fuel,
                title: "Fuel Reservations",
                description: "Pre-book fuel quantity and skip the lines at peak times",
              }
            ].map((item, index) => (
              <div key={index} className="glass-panel p-5">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
          
          <div className="pt-4 reveal">
            <Link to="/charging">
              <Button>Find Charging Stations</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChargingSection;
