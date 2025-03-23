
import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@/components/ui/loader';

interface EventMapProps {
  latitude: number;
  longitude: number;
  title: string;
  zoom?: number;
  interactive?: boolean;
}

const EventMap: React.FC<EventMapProps> = ({
  latitude,
  longitude,
  title,
  zoom = 14,
  interactive = true,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Google Maps API script loading
    const loadGoogleMapsApi = () => {
      const existingScript = document.getElementById('google-maps-script');
      if (!existingScript) {
        const script = document.createElement('script');
        script.id = 'google-maps-script';
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY'}&libraries=places`;
        script.async = true;
        script.defer = true;
        
        script.onload = initializeMap;
        script.onerror = () => {
          setError('Failed to load Google Maps API');
          setIsLoading(false);
        };
        
        document.head.appendChild(script);
      } else {
        initializeMap();
      }
    };

    // Initialize the map
    const initializeMap = () => {
      if (!mapRef.current || !window.google) return;
      
      try {
        const location = { lat: latitude, lng: longitude };
        
        const mapOptions: google.maps.MapOptions = {
          center: location,
          zoom,
          mapTypeControl: interactive,
          streetViewControl: interactive,
          zoomControl: interactive,
          scrollwheel: interactive,
          fullscreenControl: interactive,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: interactive ? 'on' : 'off' }]
            }
          ]
        };
        
        const map = new google.maps.Map(mapRef.current, mapOptions);
        
        new google.maps.Marker({
          position: location,
          map,
          title
        });
        
        setIsLoading(false);
      } catch (err) {
        console.error('Error initializing map:', err);
        setError('Failed to initialize map');
        setIsLoading(false);
      }
    };
    
    loadGoogleMapsApi();
  }, [latitude, longitude, title, zoom, interactive]);

  if (error) {
    return (
      <div className="bg-muted/50 rounded-lg flex items-center justify-center p-6 min-h-[300px]">
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  return (
    <div className="relative rounded-lg overflow-hidden min-h-[300px]">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50">
          <Loader size="lg" text="Loading map..." />
        </div>
      )}
      <div 
        ref={mapRef} 
        className="w-full h-full min-h-[300px]"
      />
    </div>
  );
};

export default EventMap;
