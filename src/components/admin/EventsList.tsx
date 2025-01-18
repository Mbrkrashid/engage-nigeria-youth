import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
}

export const EventsList = ({ events }: { events: Event[] }) => {
  return (
    <div className="space-y-4">
      {events.map((event) => (
        <Card key={event.id}>
          <CardHeader>
            <CardTitle>{event.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{event.description}</p>
            <p className="mt-2">
              <span className="font-semibold">Date:</span> {event.date}
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