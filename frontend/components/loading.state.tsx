import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

interface LoadingStateProps {
  name: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ name }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Skeleton className="w-[400px] h-[20px] rounded-full" />
        <Skeleton className="w-[400px] h-[20px] rounded-full mt-4" />
      </CardContent>
    </Card>
  );
};
