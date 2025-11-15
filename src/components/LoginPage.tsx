import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Alert, AlertDescription } from './ui/alert';
import { Separator } from './ui/separator';
import { login } from '../lib/auth';
import { User } from '../types';
import { Lock, Mail, Eye, EyeOff } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LoginPageProps {
  onLogin: (user: User) => void;
  onRegister?: () => void;
  onPendingUser?: (user: User) => void;
}

export function LoginPage({ onLogin, onRegister, onPendingUser }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showDemoAccounts, setShowDemoAccounts] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const user = login(email, password);
    if (user) {
      // Check if user is pending approval
      if (user.status === 'pending' && onPendingUser) {
        onPendingUser(user);
      } else if (user.status === 'active') {
        onLogin(user);
      } else {
        setError('Your account is inactive. Please contact the administrator.');
      }
    } else {
      setError('Invalid email or password');
    }
  };

  const demoAccounts = [
    { email: 'kofi.mensah@gimpa.edu.gh', role: 'Admin/Chairman', color: '#E30613' },
    { email: 'akua.asante@gimpa.edu.gh', role: 'Secretary', color: '#007A33' },
    { email: 'kwame.boateng@gimpa.edu.gh', role: 'Treasurer', color: '#3B82F6' },
    { email: 'ama.owusu@gimpa.edu.gh', role: 'Member', color: '#6B7280' }
  ];

  const handleGoogleSignIn = () => {
    // Placeholder for Google OAuth integration
    setError('Google Sign-In will be available soon');
  };

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* Left Section - Image with Dark Overlay */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0" style={{ backgroundColor: '#001a0d' }}>
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1643061754988-d8198b7a4c38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwc3R1ZGVudHMlMjBncm91cHxlbnwxfHx8fDE3NjE4NzU5ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="GIMPA Students"
            className="w-full h-full object-cover opacity-25"
          />
          {/* Very dark overlay with deep green tint - NDC green theme */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom right, rgba(0, 26, 13, 0.95), rgba(0, 61, 30, 0.88), rgba(0, 26, 13, 0.92))' }} />
        </div>
        
        {/* Overlay Content */}
        <div className="relative z-10 flex flex-col px-12 py-10">
          {/* Logo and Back Link */}
          <div className="mb-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white shadow-lg">
                <span className="text-primary font-bold text-lg">T</span>
              </div>
              <span className="text-white text-xl">GIMPA TEIN NDC</span>
            </div>
            <button className="text-white/70 hover:text-white transition-colors text-sm flex items-center gap-2">
              ← Back to Website
            </button>
          </div>

          {/* Main Content - Centered */}
          <div className="mb-auto flex flex-col justify-center flex-1">
            <h1 className="text-5xl mb-6 leading-tight text-white">
              Lead Together. Grow Together.<br />
              <span className="font-bold">Succeed Together.</span>
            </h1>
            <p className="text-lg text-white/80 max-w-md leading-relaxed">
              From managing membership to coordinating events, our powerful platform lets you lead the TEIN NDC community seamlessly.
            </p>
            
            {/* Progress indicator */}
            <div className="flex gap-2 mt-12">
              <div className="w-8 h-1 bg-white rounded-full" />
              <div className="w-8 h-1 bg-white/30 rounded-full" />
              <div className="w-8 h-1 bg-white/30 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-destructive shadow-lg">
                <span className="text-white text-lg">T</span>
              </div>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-primary shadow-lg">
                <span className="text-white text-lg">N</span>
              </div>
            </div>
            <h2 className="text-2xl text-foreground">GIMPA TEIN NDC</h2>
          </div>

          {/* Form Card */}
          <div className="bg-card rounded-2xl shadow-lg p-8 md:p-10">
            <div className="mb-8">
              <h2 className="text-3xl mb-2">Welcome Back!</h2>
              <p className="text-muted-foreground text-sm">Log in to manage your TEIN NDC membership with ease.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Input your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 rounded-lg bg-muted/50 border-muted"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Input your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11 pr-10 rounded-lg bg-muted/50 border-muted"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="remember" 
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <Label 
                    htmlFor="remember" 
                    className="text-sm cursor-pointer font-normal"
                  >
                    Remember Me
                  </Label>
                </div>
                <button 
                  type="button"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Error Alert */}
              {error && (
                <Alert variant="destructive" className="rounded-lg">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Login Button - Black (can also use dark green: #005722) */}
              <Button 
                type="submit" 
                className="w-full h-11 rounded-full text-white"
                style={{ backgroundColor: '#000000' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1a1a1a'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#000000'}
              >
                Login
              </Button>

              {/* Divider */}
              <div className="relative my-6">
                <Separator />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-3 text-xs text-muted-foreground">
                  Or continue with
                </span>
              </div>

              {/* Google Sign In */}
              <Button
                type="button"
                variant="outline"
                className="w-full h-11 rounded-full border bg-white hover:bg-muted/50"
                onClick={handleGoogleSignIn}
              >
                <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </Button>
            </form>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{' '}
                <button 
                  onClick={onRegister}
                  className="text-foreground hover:underline font-medium"
                  style={{ color: '#007A33' }}
                >
                  Register as a member
                </button>
              </p>
            </div>

            {/* Demo Accounts Toggle */}
            <div className="mt-6 pt-6 border-t border-border">
              <button
                type="button"
                onClick={() => setShowDemoAccounts(!showDemoAccounts)}
                className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {showDemoAccounts ? '▼' : '▶'} Demo Accounts (Password: demo123)
              </button>
              
              {showDemoAccounts && (
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {demoAccounts.map((account) => (
                    <button
                      key={account.email}
                      onClick={() => {
                        setEmail(account.email);
                        setPassword('demo123');
                      }}
                      className="text-left px-3 py-2.5 rounded-xl hover:bg-muted transition-all border-2"
                      style={{ borderColor: account.color }}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: account.color }} />
                        <span className="text-xs">{account.role}</span>
                      </div>
                      <div className="text-xs text-muted-foreground truncate">{account.email}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-muted-foreground mt-8">
            © 2024 GIMPA TEIN NDC. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
