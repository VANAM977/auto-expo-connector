
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Plane, Hotel, Train, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TravelSection = () => {
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
    <section className="section app-container bg-secondary rounded-3xl p-8 md:p-12" ref={sectionRef}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold reveal">
            Seamless Travel Planning for Your Expo Experience
          </h2>
          <p className="text-muted-foreground reveal">
            Book flights, hotels, and ground transportation in one place. Our integrated travel platform ensures you have a stress-free journey to and from automobile expos worldwide.
          </p>
          
          <div className="space-y-4 reveal">
            {[
              {
                icon: Plane,
                title: "Flight Bookings",
                description: "Compare and book flights from hundreds of airlines worldwide",
              },
              {
                icon: Hotel,
                title: "Hotel Reservations",
                description: "Find accommodation near expo venues with exclusive discounts",
              },
              {
                icon: Train,
                title: "Ground Transportation",
                description: "Book trains, buses, and car rentals for seamless travel",
              },
              {
                icon: MapPin,
                title: "Local Guides",
                description: "Access city guides and transportation tips for each destination",
              },
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="pt-2 reveal">
            <Link to="/travel">
              <Button>Explore Travel Options</Button>
            </Link>
          </div>
        </div>
        
        <div className="relative hidden lg:block reveal">
          <div className="absolute -top-28 -right-28 w-72 h-72 bg-primary/10 rounded-full blur-3xl z-0"></div>
          <img 
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074" 
            alt="Luxury travel" 
            className="w-full rounded-xl shadow-lg relative z-10 object-cover h-[500px]"
          />
          <div className="glass-panel absolute bottom-6 right-6 p-4 max-w-xs z-20">
            <div className="flex items-center space-x-2 mb-2">
              <Plane className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Premium Travel Packages</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Exclusive travel deals for auto enthusiasts attending international expos
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TravelSection;
