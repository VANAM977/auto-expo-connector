
import { supabase } from "@/integrations/supabase/client";
import { Event } from "@/types/database";

export const getEvents = async (options?: { status?: string, limit?: number }): Promise<Event[]> => {
  try {
    let query = supabase
      .from('events')
      .select('*');
    
    // Apply filters if provided
    if (options?.status) {
      query = query.eq('status', options.status);
    }
    
    // Apply ordering
    query = query.order('start_date', { ascending: true });
    
    // Apply limit if provided
    if (options?.limit) {
      query = query.limit(options.limit);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
    
    return data as Event[];
  } catch (error) {
    console.error('Error in getEvents:', error);
    throw error;
  }
};

export const getEventById = async (id: string): Promise<Event | null> => {
  try {
    // For single event retrieval, use the edge function for better performance
    const { data, error } = await supabase.functions.invoke('get-events', {
      method: 'GET',
      query: {
        id: id
      }
    });
    
    if (error) {
      throw error;
    }
    
    return (data.events && data.events.length > 0) ? data.events[0] : null;
  } catch (error) {
    // Fallback to direct database query if edge function fails
    console.warn('Edge function failed, falling back to direct query:', error);
    
    const { data, error: dbError } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single();
    
    if (dbError) {
      if (dbError.code === 'PGRST116') {
        // PGRST116 means no rows returned, handle as not found
        return null;
      }
      console.error('Error fetching event by ID:', dbError);
      throw dbError;
    }
    
    return data as Event;
  }
};

export const createEvent = async (event: Omit<Event, 'id' | 'created_at' | 'updated_at'>): Promise<Event> => {
  const { data, error } = await supabase
    .from('events')
    .insert([event])
    .select()
    .single();
  
  if (error) {
    console.error('Error creating event:', error);
    throw error;
  }
  
  return data as Event;
};

export const updateEvent = async (id: string, event: Partial<Omit<Event, 'id' | 'created_at' | 'updated_at'>>): Promise<Event> => {
  const { data, error } = await supabase
    .from('events')
    .update(event)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating event:', error);
    throw error;
  }
  
  return data as Event;
};

export const deleteEvent = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('events')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
};
