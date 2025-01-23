import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface Media {
  id: string;
  title: string;
  description: string;
  url: string;
}

interface MediaListProps {
  mediaList: Media[];
  onDelete: (id: string) => void;
}

export const MediaList = ({ mediaList, onDelete }: MediaListProps) => {
  return (
    <div className="space-y-4">
      {mediaList.map((media) => (
        <Card key={media.id}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{media.title}</CardTitle>
            <Button
              variant="destructive"
              size="icon"
              onClick={() => onDelete(media.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
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