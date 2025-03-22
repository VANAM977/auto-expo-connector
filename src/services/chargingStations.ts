
import { supabase } from "@/integrations/supabase/client";
import { ChargingStation, ChargingBooking } from "@/types/database";

export const getChargingStations = async (): Promise<ChargingStation[]> => {
  const { data, error } = await supabase
    .from('charging_stations')
    .select('*');
  
  if (error) {
    console.error('Error fetching charging stations:', error);
    throw error;
  }
  
  return data as ChargingStation[];
};

export const getChargingStationById = async (id: string): Promise<ChargingStation | null> => {
  const { data, error } = await supabase
    .from('charging_stations')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    console.error('Error fetching charging station by ID:', error);
    throw error;
  }
  
  return data as ChargingStation;
};

export const bookChargingStation = async (booking: Omit<ChargingBooking, 'id' | 'created_at' | 'updated_at'>): Promise<ChargingBooking> => {
  const { data, error } = await supabase
    .from('charging_bookings')
    .insert([booking])
    .select()
    .single();
  
  if (error) {
    console.error('Error booking charging station:', error);
    throw error;
  }
  
  return data as ChargingBooking;
};
