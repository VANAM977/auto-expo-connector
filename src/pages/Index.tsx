
import React from "react";
import Hero from "@/components/Hero";
import ExpoEvents from "@/components/FeaturedEvents";
import TravelSection from "@/components/TravelSection";
import ChargingSection from "@/components/ChargingSection";
import TestimonialSection from "@/components/TestimonialSection";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

export default function Index() {
  return (
    <div className="min-h-screen">
      <Hero />
      <ExpoEvents />
      <TravelSection />
      <ChargingSection />
      <TestimonialSection />
      <CallToAction />
      <Footer />
    </div>
  );
}
