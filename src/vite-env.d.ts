
/// <reference types="vite/client" />

// Google Maps types declaration
declare namespace google {
  namespace maps {
    class Map {
      constructor(mapDiv: Element, opts?: MapOptions);
    }
    
    class Marker {
      constructor(opts?: MarkerOptions);
      setMap(map: Map | null): void;
    }
    
    interface MapOptions {
      center?: LatLng | LatLngLiteral;
      zoom?: number;
      mapTypeControl?: boolean;
      streetViewControl?: boolean;
      zoomControl?: boolean;
      scrollwheel?: boolean;
      fullscreenControl?: boolean;
      styles?: MapTypeStyle[];
    }
    
    interface MarkerOptions {
      position?: LatLng | LatLngLiteral;
      map?: Map;
      title?: string;
    }
    
    interface LatLngLiteral {
      lat: number;
      lng: number;
    }
    
    interface LatLng {
      lat(): number;
      lng(): number;
    }
    
    interface MapTypeStyle {
      featureType?: string;
      elementType?: string;
      stylers: Array<{ [key: string]: string }>;
    }
  }
}

// Declare the google property on the window object
interface Window {
  google: typeof google;
}
