import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Media {
  id: string;
  title: string;
  description: string;
  url: string;
}

export const MediaList = ({ mediaList }: { mediaList: Media[] }) => {
  return (
    <div className="space-y-4">
      {mediaList.map((media) => (
        <Card key={media.id}>
          <CardHeader>
            <CardTitle>{media.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{media.description}</p>
            <img 
              src={media.url} 
              alt={media.title} 
              className="w-full h-48 object-cover rounded-md"
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};