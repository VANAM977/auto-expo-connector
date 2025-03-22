
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EventCard from './EventCard';

// Sample data for featured events
const featuredEvents = [
  {
    id: '1',
    title: 'Paris International Auto Show 2023',
    date: 'Oct 15-22, 2023',
    location: 'Paris Expo Porte de Versailles, France',
    image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070',
    exhibitors: 350,
    categories: ['Luxury', 'Electric', 'Concept', 'Vintage'],
    featured: true,
  },
  {
    id: '2',
    title: 'Tokyo Motor Show',
    date: 'Nov 5-12, 2023',
    location: 'Tokyo Big Sight, Japan',
    image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=2025',
    exhibitors: 280,
    categories: ['Technology', 'Compact', 'Hybrid', 'Sports'],
    featured: true,
  },
  {
    id: '3',
    title: 'Dubai International Motor Show',
    date: 'Jan 8-14, 2024',
    location: 'Dubai World Trade Centre, UAE',
    image: 'https://images.unsplash.com/photo-1583267746897-2cf415887172?q=80&w=2070',
    exhibitors: 210,
    categories: ['Luxury', 'Supercar', 'Off-road', 'Limited Edition'],
    featured: false,
  },
];

const FeaturedEvents = () => {
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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-2 reveal">Featured Events</h2>
          <p className="text-muted-foreground max-w-2xl reveal">
            Discover the most anticipated automobile exhibitions around the world
          </p>
        </div>
        <Link to="/events" className="mt-4 md:mt-0">
          <Button variant="outline" className="group reveal">
            View All Events
            <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredEvents.map((event, index) => (
          <div key={event.id} className="reveal" style={{ transitionDelay: `${index * 100}ms` }}>
            <EventCard {...event} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedEvents;
