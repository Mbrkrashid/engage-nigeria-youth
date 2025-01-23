import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { format } from "date-fns";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
}

interface EventsListProps {
  events: Event[];
  onDelete: (id: string) => void;
}

export const EventsList = ({ events, onDelete }: EventsListProps) => {
  return (
    <div className="space-y-4">
      {events.map((event) => (
        <Card key={event.id}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{event.title}</CardTitle>
            <Button
              variant="destructive"
              size="icon"
              onClick={() => onDelete(event.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <p>{event.description}</p>
            <p className="mt-2">
              <span className="font-semibold">Date:</span>{" "}
              {format(new Date(event.date), "PPP 'at' p")}
            </p>
            <p>
              <span className="font-semibold">Location:</span> {event.location}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};