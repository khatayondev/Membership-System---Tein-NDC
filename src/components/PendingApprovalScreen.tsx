import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Clock, Mail, AlertCircle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PendingApprovalScreenProps {
  email: string;
  onBackToLogin: () => void;
}

export function PendingApprovalScreen({ email, onBackToLogin }: PendingApprovalScreenProps) {
  return (
    <div className="min-h-screen flex" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* Left Section - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundColor: '#001a0d' }}>
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1643061754995-7e5d031b0183?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwc3R1ZGVudHMlMjBncm91cHxlbnwxfHx8fDE3NjIwMTI1ODV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="GIMPA Students"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom right, rgba(0, 122, 51, 0.95), rgba(0, 122, 51, 0.88), rgba(0, 26, 13, 0.92))' }} />
        </div>
        
        <div className="relative z-10 flex flex-col justify-center px-12 py-10">
          <div className="flex justify-center mb-12">
            <div className="h-32 w-32 rounded-full flex items-center justify-center bg-white/10 border-4 border-white/20">
              <Clock className="h-20 w-20 text-white" />
            </div>
          </div>
          <h1 className="text-5xl mb-6 leading-tight text-white text-center">
            Patience is<br />
            <span className="font-bold">A Virtue</span>
          </h1>
          <p className="text-lg text-white/80 max-w-md mx-auto leading-relaxed text-center">
            Your registration is being reviewed by our admin team. You'll be notified once your account is approved.
          </p>
        </div>
      </div>

      {/* Right Section - Pending Message */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg" style={{ backgroundColor: '#007A33' }}>
                <span className="text-white text-xl font-bold">T</span>
              </div>
            </div>
            <h2 className="text-2xl text-foreground">GIMPA TEIN NDC</h2>
          </div>

          {/* Pending Card */}
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4 lg:hidden">
                <div className="h-20 w-20 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FEF3C7' }}>
                  <Clock className="h-12 w-12" style={{ color: '#F59E0B' }} />
                </div>
              </div>
              <CardTitle className="text-3xl">Account Pending Approval</CardTitle>
              <CardDescription className="text-base mt-2">
                Your registration is under review
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 mt-0.5" style={{ color: '#007A33' }} />
                  <div className="flex-1">
                    <p className="text-sm">
                      Your account has been successfully created but requires approval from an Admin or Secretary before you can access the system.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 mt-0.5" style={{ color: '#007A33' }} />
                  <div className="flex-1">
                    <p className="text-sm">
                      We'll send a confirmation email to <span className="font-semibold">{email}</span> once your account has been approved.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm">What happens next?</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>An admin will review your registration details</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>You'll receive an email notification when approved</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Once approved, you can log in and access all features</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4">
                <Button
                  onClick={onBackToLogin}
                  variant="outline"
                  className="w-full h-11 rounded-full"
                >
                  Back to Login
                </Button>
              </div>

              <div className="text-center">
                <p className="text-xs text-muted-foreground">
                  This usually takes 24-48 hours
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <p className="text-center text-sm text-muted-foreground mt-8">
            © 2024 GIMPA TEIN NDC. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
