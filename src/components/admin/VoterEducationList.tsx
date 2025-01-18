import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface VoterEducation {
  id: string;
  title: string;
  content: string;
  category: string;
}

export const VoterEducationList = ({ voterEducation }: { voterEducation: VoterEducation[] }) => {
  return (
    <div className="space-y-4">
      {voterEducation.map((education) => (
        <Card key={education.id}>
          <CardHeader>
            <CardTitle>{education.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{education.content}</p>
            <p className="mt-2">
              <span className="font-semibold">Category:</span> {education.category}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};