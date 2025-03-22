
import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center">
        <div className="app-container py-16 md:py-24 flex flex-col items-center text-center">
          <div className="glass-panel-strong p-8 md:p-12 max-w-md mx-auto animate-fade-in">
            <h1 className="text-6xl md:text-8xl font-bold text-primary mb-6">404</h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Page Not Found</h2>
            <p className="text-muted-foreground mb-8">
              We couldn't find the page you were looking for. The URL <span className="font-mono text-sm bg-secondary px-2 py-1 rounded">{location.pathname}</span> might be incorrect or the page may have been moved.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button className="w-full">
                  <Home className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
              <Button variant="outline" onClick={() => window.history.back()} className="w-full">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
