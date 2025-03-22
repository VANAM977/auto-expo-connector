
import React from "react";
import Hero from "@/components/Hero";
import FeaturedEvents from "@/components/FeaturedEvents";
import TravelSection from "@/components/TravelSection";
import ChargingSection from "@/components/ChargingSection";
import TestimonialSection from "@/components/TestimonialSection";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import EventsApiDemo from "@/components/EventsApiDemo";

export default function Index() {
  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturedEvents />
      <TravelSection />
      <ChargingSection />
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">API Demo</h2>
        <EventsApiDemo />
      </div>
      <TestimonialSection />
      <CallToAction />
      <Footer />
    </div>
  );
}
