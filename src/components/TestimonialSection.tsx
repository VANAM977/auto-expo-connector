
import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    id: 1,
    name: 'Michael Chen',
    role: 'Automotive Journalist',
    company: 'Auto Weekly',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887',
    testimonial: 'The Auto Expo Connector platform transformed how I cover international auto shows. The seamless travel booking and event registration made my work so much more efficient.',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    role: 'Car Enthusiast',
    company: '',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887',
    testimonial: 'I\'ve been attending auto expos for years, but the charging station pre-booking feature is a game-changer for EV owners like me. I can plan my entire journey without range anxiety.',
  },
  {
    id: 3,
    name: 'David Martinez',
    role: 'Marketing Director',
    company: 'LuxCars Inc.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1887',
    testimonial: 'As an exhibitor, the platform provides valuable insights about attendees and helps us prepare better for each expo. The admin dashboard is intuitive and feature-rich.',
  },
];

const TestimonialSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };
  
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

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="section app-container" ref={sectionRef}>
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 reveal">What Our Users Say</h2>
        <p className="text-muted-foreground reveal">
          Hear from automotive enthusiasts, industry professionals, and exhibitors who use our platform
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <div className="glass-panel-strong p-8 md:p-12 reveal">
          <div className="text-primary mb-6">
            <Quote className="h-12 w-12 mx-auto opacity-50" />
          </div>
          
          <blockquote className="text-lg md:text-xl text-center mb-8">
            {testimonials[activeIndex].testimonial}
          </blockquote>
          
          <div className="flex flex-col items-center">
            <div className="h-16 w-16 rounded-full overflow-hidden mb-4">
              <img 
                src={testimonials[activeIndex].image} 
                alt={testimonials[activeIndex].name} 
                className="object-cover w-full h-full"
              />
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-lg">{testimonials[activeIndex].name}</h4>
              <p className="text-sm text-muted-foreground">
                {testimonials[activeIndex].role}
                {testimonials[activeIndex].company && (
                  <>, {testimonials[activeIndex].company}</>
                )}
              </p>
            </div>
          </div>
          
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  index === activeIndex 
                    ? 'bg-primary w-8' 
                    : 'bg-primary/30'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        <div className="flex justify-center space-x-4 mt-6">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={prevTestimonial}
            className="h-10 w-10 rounded-full"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={nextTestimonial}
            className="h-10 w-10 rounded-full"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
