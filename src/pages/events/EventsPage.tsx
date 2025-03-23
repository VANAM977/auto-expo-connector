
import React, { useEffect, useState } from 'react';
import { getEvents } from '@/services/events';
import { Event } from '@/types/database';
import Navbar from '@/components/Navbar';
import EventCard from '@/components/EventCard';
import { Loader } from '@/components/ui/loader';
import { format } from 'date-fns';

const EventsPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const data = await getEvents({ upcoming: true });
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
    <>
      <Navbar />
      <div className="min-h-screen pt-24 pb-16">
        <div className="app-container">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Upcoming Events</h1>
            <p className="text-muted-foreground">Discover and book your next auto event experience</p>
          </div>

          {isLoading ? (
            <div className="min-h-[400px] flex items-center justify-center">
              <Loader size="lg" text="Loading events..." />
            </div>
          ) : error ? (
            <div className="min-h-[200px] flex items-center justify-center">
              <p className="text-destructive">{error}</p>
            </div>
          ) : events.length === 0 ? (
            <div className="min-h-[200px] flex items-center justify-center">
              <p className="text-muted-foreground">No events available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <EventCard
                  key={event.id}
                  id={event.id}
                  title={event.title}
                  date={formatEventDate(event.start_date, event.end_date)}
                  location={event.location}
                  image={event.image_url || 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070'}
                  exhibitors={Math.floor(Math.random() * 200) + 50}
                  categories={['Electric', 'Luxury', 'Sports'].slice(0, Math.floor(Math.random() * 3) + 1)}
                  featured={false}
                  guideInfo={event.guide_name ? { name: event.guide_name } : undefined}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EventsPage;
