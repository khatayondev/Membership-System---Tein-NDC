import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { mockElections, mockAuditLogs } from '../../lib/mockData';
import { Vote, Users, FileText, Award, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

export function ECDashboard() {
  const activeElections = mockElections.filter(e => e.status === 'voting' || e.status === 'nomination');
  const recentAudits = mockAuditLogs.filter(log => log.module === 'election').slice(0, 5);

  const pendingApprovals = mockElections.reduce((count, election) => {
    return count + election.positions.reduce((pCount, position) => {
      return pCount + position.candidates.filter(c => c.status === 'pending').length;
    }, 0);
  }, 0);

  const totalVoters = mockElections.reduce((sum, e) => sum + (e.voterList?.length || 0), 0);
  const totalCandidates = mockElections.reduce((sum, e) => 
    sum + e.positions.reduce((pSum, p) => pSum + p.candidates.length, 0), 0
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="mb-2">Election Commission Dashboard</h1>
        <p className="text-muted-foreground">
          Manage all TEIN NDC elections with transparency and accountability
        </p>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Vote className="h-4 w-4" style={{ color: '#007A33' }} />
              Active Elections
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl" style={{ color: '#007A33' }}>
              {activeElections.length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" style={{ color: '#FFA500' }} />
              Pending Approvals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl" style={{ color: '#FFA500' }}>
              {pendingApprovals}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Users className="h-4 w-4" style={{ color: '#E30613' }} />
              Total Voters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl" style={{ color: '#E30613' }}>
              {totalVoters}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Award className="h-4 w-4" style={{ color: '#000' }} />
              Total Candidates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl" style={{ color: '#000' }}>
              {totalCandidates}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Active Elections */}
        <Card>
          <CardHeader>
            <CardTitle>Active Elections</CardTitle>
            <CardDescription>Elections requiring your attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activeElections.length > 0 ? (
                activeElections.map((election) => (
                  <div key={election.id} className="p-4 border rounded-lg space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">{election.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {election.startDate} to {election.endDate}
                        </p>
                      </div>
                      <Badge 
                        variant="outline"
                        style={{ 
                          borderColor: election.status === 'voting' ? '#007A33' : '#FFA500',
                          color: election.status === 'voting' ? '#007A33' : '#FFA500'
                        }}
                      >
                        {election.status}
                      </Badge>
                    </div>
                    <div className="flex gap-2 text-xs text-muted-foreground">
                      <span>{election.positions.length} positions</span>
                      <span>•</span>
                      <span>{election.voterList?.length || 0} voters</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No active elections
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Audit Logs */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Audit Logs</CardTitle>
            <CardDescription>Latest election management activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentAudits.map((log) => (
                <div key={log.id} className="flex items-start gap-3 pb-3 border-b last:border-0">
                  <div className="mt-1">
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: '#007A33' }} />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm">{log.action}</p>
                    <p className="text-xs text-muted-foreground">{log.details}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(log.timestamp).toLocaleDateString()} - {log.userName}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Items */}
      <Card>
        <CardHeader>
          <CardTitle>Action Items</CardTitle>
          <CardDescription>Tasks requiring immediate attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {pendingApprovals > 0 && (
              <div className="flex items-center justify-between p-4 border rounded-lg" style={{ backgroundColor: '#FFF9F0' }}>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5" style={{ color: '#FFA500' }} />
                  <div>
                    <p className="font-medium">Candidate Approvals Pending</p>
                    <p className="text-sm text-muted-foreground">
                      {pendingApprovals} candidate(s) awaiting approval
                    </p>
                  </div>
                </div>
                <Button size="sm" style={{ backgroundColor: '#007A33' }}>
                  Review
                </Button>
              </div>
            )}
            
            {activeElections.some(e => e.status === 'voting') && (
              <div className="flex items-center justify-between p-4 border rounded-lg" style={{ backgroundColor: '#F0FFF4' }}>
                <div className="flex items-center gap-3">
                  <Vote className="h-5 w-5" style={{ color: '#007A33' }} />
                  <div>
                    <p className="font-medium">Voting in Progress</p>
                    <p className="text-sm text-muted-foreground">
                      Monitor ongoing elections and voter participation
                    </p>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  Monitor
                </Button>
              </div>
            )}

            {pendingApprovals === 0 && !activeElections.some(e => e.status === 'voting') && (
              <div className="text-center py-8 text-muted-foreground">
                <CheckCircle className="h-12 w-12 mx-auto mb-2 opacity-20" style={{ color: '#007A33' }} />
                <p>All tasks completed. No immediate action required.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
