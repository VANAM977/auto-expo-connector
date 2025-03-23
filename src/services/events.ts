
import { supabase } from "@/integrations/supabase/client";
import { Event } from "@/types/database";

interface EventOptions {
  status?: string;
  limit?: number;
  upcoming?: boolean;
  featured?: boolean;
  guideId?: string;
  nearLocation?: string;
}

export const getEvents = async (options?: EventOptions): Promise<Event[]> => {
  try {
    const { data, error } = await supabase.functions.invoke('get-events', {
      method: 'POST',
      body: options || {}
    });
    
    if (error) {
      console.error('Error invoking get-events function:', error);
      throw error;
    }
    
    return data.events as Event[];
  } catch (error) {
    console.error('Error in getEvents:', error);
    throw error;
  }
};

export const getEventById = async (id: string): Promise<Event | null> => {
  try {
    const { data, error } = await supabase.functions.invoke('get-events', {
      method: 'POST',
      body: { id }
    });
    
    if (error) {
      throw error;
    }
    
    return (data.events && data.events.length > 0) ? data.events[0] : null;
  } catch (error) {
    console.error('Error in getEventById:', error);
    throw error;
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
