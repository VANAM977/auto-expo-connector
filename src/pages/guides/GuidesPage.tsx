
import React from 'react';
import Navbar from '@/components/Navbar';

const GuidesPage = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 pb-16">
        <div className="app-container">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Travel Guides</h1>
            <p className="text-muted-foreground">Meet our expert guides who will enhance your event experience</p>
          </div>
          
          <div className="min-h-[400px] flex items-center justify-center">
            <p className="text-muted-foreground">Guide listings coming soon.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default GuidesPage;
