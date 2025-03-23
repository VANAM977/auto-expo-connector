
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.1'

// Define the event type for the function response
interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  start_date: string;
  end_date: string;
  image_url?: string;
  organizer_id: string;
  price: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create a Supabase client with the request Authorization header
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    // Get parameters from request
    let eventId, status, limit;
    
    // Check request method to determine how to get parameters
    if (req.method === 'GET') {
      // For GET requests, use URL parameters
      const url = new URL(req.url);
      eventId = url.searchParams.get('id');
      status = url.searchParams.get('status');
      limit = url.searchParams.get('limit') ? parseInt(url.searchParams.get('limit')!) : null;
    } else {
      // For POST requests, use the request body
      const body = await req.json().catch(() => ({}));
      eventId = body.id;
      status = body.status;
      limit = body.limit;
    }
    
    // Start the query
    let query = supabaseClient
      .from('events')
      .select('*');
    
    // Add filters based on parameters
    if (eventId) {
      // Fetch a specific event by ID
      query = query.eq('id', eventId);
    } else {
      // Apply other filters
      if (status) {
        query = query.eq('status', status);
      }
      
      // Apply ordering
      query = query.order('start_date', { ascending: true });
      
      // Apply limit if provided
      if (limit) {
        query = query.limit(limit);
      }
    }
    
    // Execute the query
    const { data, error } = eventId 
      ? await query.single() 
      : await query;
    
    if (error) {
      console.error('Database error:', error);
      throw error;
    }
    
    // Return the data
    return new Response(
      JSON.stringify({ 
        events: eventId ? [data] : data,
        count: Array.isArray(data) ? data.length : (data ? 1 : 0)
      }),
      { 
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders
        } 
      },
    )
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400, 
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders
        } 
      },
    )
  }
})
