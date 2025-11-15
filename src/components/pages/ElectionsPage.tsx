import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Vote, Calendar, Shield } from 'lucide-react';
import { User } from '../../types';

interface ElectionsPageProps {
  user: User;
}

export function ElectionsPage({ user }: ElectionsPageProps) {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#007A33' }}>
            <Vote className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-3xl">Election Management</h1>
            <p className="text-sm text-muted-foreground">Manage elections and voting processes</p>
          </div>
        </div>
      </div>

      <Card className="border-2" style={{ borderColor: '#007A3320' }}>
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full flex items-center justify-center" style={{ backgroundColor: '#007A3310' }}>
                <Vote className="h-12 w-12" style={{ color: '#007A33' }} />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#E30613' }}>
                <Calendar className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>
          <CardTitle className="text-2xl mb-2">Election Management System</CardTitle>
          <CardDescription className="text-base">
            Coming Soon in Phase II
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center pb-8">
          <div className="max-w-md mx-auto space-y-4">
            <p className="text-muted-foreground text-sm leading-relaxed">
              The comprehensive Election Management System will be available in Phase II of the platform. 
              This module will include candidate nominations, secure voting, real-time results, and complete audit trails.
            </p>
            
            <div className="grid gap-3 mt-6 text-left">
              <div className="flex items-start gap-3 p-3 rounded-lg" style={{ backgroundColor: '#F7F8FA' }}>
                <Shield className="h-5 w-5 mt-0.5" style={{ color: '#007A33' }} />
                <div>
                  <p className="text-sm">Election Commission (EC) Role</p>
                  <p className="text-xs text-muted-foreground">Independent election oversight and management</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg" style={{ backgroundColor: '#F7F8FA' }}>
                <Vote className="h-5 w-5 mt-0.5" style={{ color: '#007A33' }} />
                <div>
                  <p className="text-sm">Secure Voting System</p>
                  <p className="text-xs text-muted-foreground">Anonymous and tamper-proof voting mechanism</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg" style={{ backgroundColor: '#F7F8FA' }}>
                <Calendar className="h-5 w-5 mt-0.5" style={{ color: '#007A33' }} />
                <div>
                  <p className="text-sm">Nomination & Results</p>
                  <p className="text-xs text-muted-foreground">Candidate nomination workflows and transparent results</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
