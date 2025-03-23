
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';

const GuideDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  
  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 pb-16">
        <div className="app-container">
          <Link to="/guides" className="inline-flex items-center text-primary hover:underline mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Guides
          </Link>
          
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Guide Profile</h1>
            <p className="text-muted-foreground">Guide ID: {id}</p>
          </div>
          
          <div className="min-h-[400px] flex items-center justify-center">
            <p className="text-muted-foreground">Guide details coming soon.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default GuideDetailsPage;
