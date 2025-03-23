
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Event } from "@/types/database";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

export const EventsApiDemo = () => {
  const [directEvents, setDirectEvents] = useState<Event[]>([]);
  const [edgeFunctionEvents, setEdgeFunctionEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState({ direct: false, edgeFunction: false });
  const { toast } = useToast();
  const { session } = useAuth();

  const fetchDirectEvents = async () => {
    setLoading(prev => ({ ...prev, direct: true }));
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .limit(3);
      
      if (error) throw error;
      setDirectEvents(data as Event[]);
      toast({
        title: "Direct Database Query Successful",
        description: `Retrieved ${data?.length || 0} events directly from the database.`,
      });
    } catch (error) {
      console.error('Error fetching events directly:', error);
      toast({
        title: "Error",
        description: "Failed to fetch events directly from the database.",
        variant: "destructive",
      });
    } finally {
      setLoading(prev => ({ ...prev, direct: false }));
    }
  };

  const fetchEventsViaEdgeFunction = async () => {
    setLoading(prev => ({ ...prev, edgeFunction: true }));
    try {
      // Use the authenticated client to call the edge function
      const response = await supabase.functions.invoke('get-events', {
        method: 'GET',
        headers: session?.access_token ? {
          Authorization: `Bearer ${session.access_token}`,
        } : undefined,
      });
      
      if (!response.data) throw new Error('No data returned from edge function');
      
      console.log('Edge function response:', response.data);
      setEdgeFunctionEvents(response.data.events as Event[]);
      
      toast({
        title: "Edge Function Call Successful",
        description: `Retrieved ${response.data.events?.length || 0} events via the edge function.`,
      });
    } catch (error) {
      console.error('Error fetching events via edge function:', error);
      toast({
        title: "Error",
        description: `Failed to fetch events via the edge function: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
    } finally {
      setLoading(prev => ({ ...prev, edgeFunction: false }));
    }
  };

  // Update the services/events.ts file to use the edge function for certain operations
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>API Demo</CardTitle>
          <CardDescription>
            Test both direct database access and edge function API calls
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Direct Database Access</h3>
            <Button
              onClick={fetchDirectEvents}
              disabled={loading.direct}
            >
              {loading.direct ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : "Fetch Events Directly"}
            </Button>
            {directEvents.length > 0 && (
              <div className="border rounded-md p-4 mt-2">
                <h4 className="font-medium mb-2">Results:</h4>
                <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto max-h-40">
                  {JSON.stringify(directEvents, null, 2)}
                </pre>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Edge Function API</h3>
            <Button
              onClick={fetchEventsViaEdgeFunction}
              disabled={loading.edgeFunction}
              variant="secondary"
            >
              {loading.edgeFunction ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : "Fetch Events via Edge Function"}
            </Button>
            {edgeFunctionEvents.length > 0 && (
              <div className="border rounded-md p-4 mt-2">
                <h4 className="font-medium mb-2">Results:</h4>
                <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto max-h-40">
                  {JSON.stringify(edgeFunctionEvents, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-500">
            Click the buttons above to test different API access methods.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EventsApiDemo;
