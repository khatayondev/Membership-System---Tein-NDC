import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { mockEvents, mockMembers } from '../../lib/mockData';
import { Calendar, Users, Mail, Phone, MapPin } from 'lucide-react';

interface PublicWebsiteProps {
  onNavigateToRegister?: () => void;
}

export function PublicWebsite({ onNavigateToRegister }: PublicWebsiteProps = {}) {
  const executives = mockMembers.filter(m => m.role === 'admin' || m.role === 'secretary' || m.role === 'treasurer');
  const upcomingPublicEvents = mockEvents.filter(e => e.status === 'upcoming' && (e.type === 'program' || e.type === 'fundraiser')).slice(0, 3);

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="py-20 px-4" style={{ background: 'linear-gradient(135deg, #E30613 0%, #007A33 100%)' }}>
        <div className="container mx-auto max-w-6xl text-center text-white">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-white" />
            <div className="w-16 h-16 rounded-full" style={{ backgroundColor: '#007A33' }} />
            <div className="w-16 h-16 rounded-full" style={{ backgroundColor: '#E30613' }} />
          </div>
          <h1 className="text-4xl md:text-5xl mb-4">GIMPA TEIN NDC</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Tertiary Education Institutions Network - National Democratic Congress at Ghana Institute of Management and Public Administration</p>
          <div className="flex gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-black hover:bg-gray-100"
              onClick={onNavigateToRegister}
            >
              Join Us Today
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl mb-4">Our Mission</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              GIMPA TEIN NDC is committed to fostering political awareness, leadership development, and community engagement among students at GIMPA. We promote the values and principles of the National Democratic Congress while empowering the next generation of leaders.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full mb-4 flex items-center justify-center" style={{ backgroundColor: '#E30613' }}>
                  <Users className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Unity & Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Building a strong, united community of politically aware and engaged students.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full mb-4 flex items-center justify-center" style={{ backgroundColor: '#007A33' }}>
                  <Users className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Leadership Development</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Nurturing future leaders through training, mentorship, and active participation.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full mb-4 flex items-center justify-center" style={{ backgroundColor: '#E30613' }}>
                  <Users className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Social Responsibility</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Engaging in community service and advocating for positive social change.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl mb-4">Our Leadership</h2>
            <p className="text-muted-foreground">Meet the dedicated executives leading GIMPA TEIN NDC</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {executives.map((executive) => (
              <Card key={executive.id}>
                <CardHeader className="text-center">
                  <div className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl text-white" style={{ backgroundColor: '#007A33' }}>
                    {executive.firstName.charAt(0)}{executive.lastName.charAt(0)}
                  </div>
                  <CardTitle>{executive.firstName} {executive.lastName}</CardTitle>
                  <CardDescription>
                    <Badge variant="outline" style={{ borderColor: '#E30613', color: '#E30613' }}>
                      {executive.role === 'admin' ? 'Chairman' : executive.role.charAt(0).toUpperCase() + executive.role.slice(1)}
                    </Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center justify-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>{executive.email}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>{executive.phone}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl mb-4">Upcoming Events</h2>
            <p className="text-muted-foreground">Join us for our upcoming programs and activities</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {upcomingPublicEvents.map((event) => (
              <Card key={event.id}>
                <CardHeader>
                  <CardTitle>{event.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{event.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{event.date} at {event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                  <Badge variant="outline" style={{ borderColor: '#007A33', color: '#007A33' }}>
                    {event.type}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact/Join Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl mb-4">Join GIMPA TEIN NDC</h2>
            <p className="text-muted-foreground">Ready to become a proud member of GIMPA TEIN NDC? Complete the official registration form to join us.</p>
          </div>

          <Card>
            <CardContent className="pt-12 pb-12 text-center">
              <div className="flex justify-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="h-16 w-16 rounded-full flex items-center justify-center" style={{ backgroundColor: '#E30613' }}>
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <div className="h-16 w-16 rounded-full flex items-center justify-center" style={{ backgroundColor: '#007A33' }}>
                    <Users className="h-8 w-8 text-white" />
                  </div>
                </div>
              </div>
              <h3 className="text-2xl mb-3">Official TEIN Registration</h3>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Fill out our comprehensive registration form to officially join GIMPA TEIN NDC. Together, we make a difference!
              </p>
              <Button 
                size="lg" 
                className="text-white hover:opacity-90"
                style={{ backgroundColor: '#007A33' }}
                onClick={onNavigateToRegister}
              >
                Complete Registration Form
              </Button>
              <p className="text-xs text-muted-foreground mt-4">
                Takes about 3 minutes to complete
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t">
        <div className="container mx-auto max-w-6xl text-center text-muted-foreground">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full" style={{ backgroundColor: '#E30613' }} />
            <div className="w-8 h-8 rounded-full" style={{ backgroundColor: '#007A33' }} />
          </div>
          <p>&copy; 2024 GIMPA TEIN NDC. All rights reserved.</p>
          <p className="mt-2 text-sm">Ghana Institute of Management and Public Administration</p>
        </div>
      </footer>
    </div>
  );
}
