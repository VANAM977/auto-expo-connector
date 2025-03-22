
import { supabase } from "@/integrations/supabase/client";
import { Event } from "@/types/database";

export const getEvents = async (): Promise<Event[]> => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('start_date', { ascending: true });
  
  if (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
  
  return data as Event[];
};

export const getEventById = async (id: string): Promise<Event | null> => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    if (error.code === 'PGRST116') {
      // PGRST116 means no rows returned, handle as not found
      return null;
    }
    console.error('Error fetching event by ID:', error);
    throw error;
  }
  
  return data as Event;
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
