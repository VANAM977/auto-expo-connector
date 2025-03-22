
import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, MapPin, Users, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface EventCardProps {
  id: string;
  title: string;
  date: string;
  location: string;
  image: string;
  exhibitors: number;
  categories: string[];
  featured?: boolean;
}

const EventCard = ({
  id,
  title,
  date,
  location,
  image,
  exhibitors,
  categories,
  featured = false,
}: EventCardProps) => {
  return (
    <div 
      className={`glass-panel overflow-hidden transition-all duration-300 hover:shadow-glass-strong h-full flex flex-col ${
        featured ? 'border-primary/30' : ''
      }`}
    >
      <div className="relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-48 object-cover"
        />
        {featured && (
          <Badge className="absolute top-3 left-3 bg-primary/90 hover:bg-primary">
            Featured
          </Badge>
        )}
      </div>
      
      <div className="p-5 flex-grow flex flex-col">
        <div className="space-y-2 mb-4 flex-grow">
          <h3 className="font-display text-xl font-bold line-clamp-2">
            {title}
          </h3>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <CalendarDays className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>{date}</span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="truncate">{location}</span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>{exhibitors} Exhibitors</span>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {categories.slice(0, 3).map((category, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {category}
              </Badge>
            ))}
            {categories.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{categories.length - 3} more
              </Badge>
            )}
          </div>
          
          <Link to={`/events/${id}`}>
            <Button className="w-full">View Details</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
