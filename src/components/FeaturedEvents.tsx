
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EventCard from './EventCard';
import { getEvents } from '@/services/events';
import { Event } from '@/types/database';
import { Loader } from './ui/loader';
import { format } from 'date-fns';

const FeaturedEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const data = await getEvents({ 
          upcoming: true,
          featured: true,
          limit: 3
        });
        setEvents(data);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Failed to load events');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchEvents();
  }, []);
  
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

  const formatEventDate = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // If same day event
    if (start.toDateString() === end.toDateString()) {
      return `${format(start, 'MMM d, yyyy')}`;
    }
    
    // If same month event
    if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
      return `${format(start, 'MMM d')} - ${format(end, 'd, yyyy')}`;
    }
    
    // Different months
    return `${format(start, 'MMM d')} - ${format(end, 'MMM d, yyyy')}`;
  };

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

      {isLoading ? (
        <div className="min-h-[400px] flex items-center justify-center">
          <Loader size="lg" text="Loading featured events..." />
        </div>
      ) : error ? (
        <div className="min-h-[200px] flex items-center justify-center">
          <p className="text-destructive">{error}</p>
        </div>
      ) : events.length === 0 ? (
        <div className="min-h-[200px] flex items-center justify-center">
          <p className="text-muted-foreground">No featured events available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <div key={event.id} className="reveal" style={{ transitionDelay: `${index * 100}ms` }}>
              <EventCard 
                id={event.id}
                title={event.title}
                date={formatEventDate(event.start_date, event.end_date)}
                location={event.location}
                image={event.image_url || 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070'}
                exhibitors={Math.floor(Math.random() * 200) + 50} // This would be better as a real field in the database
                categories={['Electric', 'Luxury', 'Sports'].slice(0, Math.floor(Math.random() * 3) + 1)} // This would be better as a real field
                featured={true}
                guideInfo={event.guide_name ? { name: event.guide_name } : undefined}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedEvents;
