
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { CalendarDays, MapPin, User, ArrowLeft, Clock, Users, Ticket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader } from '@/components/ui/loader';
import Navbar from '@/components/Navbar';
import EventMap from '@/components/EventMap';
import { getEventById } from '@/services/events';
import { Event } from '@/types/database';

const EventDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const data = await getEventById(id);
        setEvent(data);
        
        if (!data) {
          setError('Event not found');
        }
      } catch (err) {
        console.error('Error fetching event:', err);
        setError('Failed to load event details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const formatEventDate = (date: string | undefined) => {
    if (!date) return '';
    return format(new Date(date), 'EEEE, MMMM d, yyyy');
  };

  const formatEventTime = (date: string | undefined) => {
    if (!date) return '';
    return format(new Date(date), 'h:mm a');
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
          <Loader size="lg" text="Loading event details..." />
        </div>
      </>
    );
  }

  if (error || !event) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-24 pb-16">
          <div className="app-container">
            <Link to="/events" className="inline-flex items-center text-primary hover:underline mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Events
            </Link>
            
            <div className="min-h-[400px] flex items-center justify-center">
              <p className="text-destructive">{error || 'Event not found'}</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Default coordinates if not available
  const latitude = event.latitude || 48.8566;
  const longitude = event.longitude || 2.3522;

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 pb-16">
        <div className="app-container">
          <Link to="/events" className="inline-flex items-center text-primary hover:underline mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Events
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="relative mb-6">
                <img 
                  src={event.image_url || 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070'} 
                  alt={event.title} 
                  className="w-full h-[300px] md:h-[400px] object-cover rounded-lg"
                />
                <Badge className="absolute top-4 left-4 text-sm" variant={
                  event.status === 'upcoming' ? 'default' :
                  event.status === 'ongoing' ? 'secondary' :
                  event.status === 'completed' ? 'outline' : 
                  'destructive'
                }>
                  {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                </Badge>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{event.title}</h1>
              
              <div className="flex flex-wrap gap-y-3 mb-6">
                <div className="flex items-center mr-6">
                  <CalendarDays className="h-5 w-5 mr-2 text-muted-foreground" />
                  <span>{formatEventDate(event.start_date)}</span>
                </div>
                <div className="flex items-center mr-6">
                  <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
                  <span>{formatEventTime(event.start_date)} - {formatEventTime(event.end_date)}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-muted-foreground" />
                  <span>{event.location}</span>
                </div>
              </div>
              
              <div className="prose prose-lg max-w-none mb-8">
                <p>{event.description}</p>
              </div>
              
              {/* Map Section */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Location</h2>
                <EventMap 
                  latitude={latitude}
                  longitude={longitude}
                  title={event.title}
                  zoom={14}
                  interactive={true}
                />
              </div>
            </div>
            
            {/* Sidebar */}
            <div>
              <div className="glass-panel p-6 mb-6">
                <h3 className="text-xl font-bold mb-4">Event Details</h3>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-muted-foreground">Date</p>
                    <p className="font-medium">{formatEventDate(event.start_date)}</p>
                  </div>
                  
                  <div>
                    <p className="text-muted-foreground">Time</p>
                    <p className="font-medium">{formatEventTime(event.start_date)} - {formatEventTime(event.end_date)}</p>
                  </div>
                  
                  <div>
                    <p className="text-muted-foreground">Location</p>
                    <p className="font-medium">{event.location}</p>
                  </div>
                  
                  <div>
                    <p className="text-muted-foreground">Ticket Price</p>
                    <p className="font-medium">{event.price === 0 ? 'Free' : `$${event.price.toFixed(2)}`}</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button className="w-full" size="lg">
                    <Ticket className="mr-2 h-4 w-4" />
                    Book Tickets
                  </Button>
                </div>
              </div>
              
              {event.guide_name && (
                <div className="glass-panel p-6">
                  <h3 className="text-xl font-bold mb-4">Event Guide</h3>
                  
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{event.guide_name}</p>
                      <p className="text-sm text-muted-foreground">Local Expert</p>
                    </div>
                  </div>
                  
                  <Button asChild variant="outline" className="w-full">
                    <Link to={`/guides/${event.guide_id}`}>
                      View Guide Profile
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDetailsPage;
