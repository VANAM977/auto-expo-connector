
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

const AuthCallback = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleEmailConfirmation = async () => {
      const { error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Error getting session:', error);
        toast({
          title: "Error",
          description: "There was an error confirming your email. Please try again.",
          variant: "destructive",
        });
        navigate('/auth/login');
        return;
      }
      
      // Email confirmed successfully
      toast({
        title: "Email verified",
        description: "Your email has been successfully verified.",
      });
      
      // Redirect to home page or dashboard
      navigate('/');
    };

    handleEmailConfirmation();
  }, [navigate, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Verifying your email...</h1>
        <p>Please wait while we confirm your email address.</p>
      </div>
    </div>
  );
};

export default AuthCallback;
