import { Calendar } from 'lucide-react';
import { User } from '../../types';

interface EventsPageProps {
  user?: User;
}

export function EventsPage({ user }: EventsPageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2">Events & Activities</h1>
        <p className="text-muted-foreground">
          Schedule and manage TEIN NDC events
        </p>
      </div>

      <div className="flex flex-col items-center justify-center min-h-[400px] rounded-lg border-2 border-dashed p-12 text-center">
        <Calendar className="h-24 w-24 mb-6 opacity-20" style={{ color: '#007A33' }} />
        <h2 className="mb-3">Coming Soon</h2>
        <p className="text-muted-foreground max-w-md">
          Our events platform is currently being upgraded. Please check back soon!
        </p>
      </div>
    </div>
  );
}
