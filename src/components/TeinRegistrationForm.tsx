import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { ChevronLeft, ChevronRight, CheckCircle, User, GraduationCap, MapPin } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { ghanaConstituencies, gimpaSchools, levelOptions } from '../lib/constituencies';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useNotifications } from '../lib/notificationContext';

interface FormData {
  fullName: string;
  studentId: string;
  email: string;
  phoneNumber: string;
  school: string;
  level: string;
  course: string;
  motherConstituency: string;
  consentGiven: boolean;
}

const initialFormData: FormData = {
  fullName: '',
  studentId: '',
  email: '',
  phoneNumber: '',
  school: '',
  level: '',
  course: '',
  motherConstituency: '',
  consentGiven: false,
};

interface FormErrors {
  [key: string]: string;
}

interface TeinRegistrationFormProps {
  onBackToLogin?: () => void;
}

export function TeinRegistrationForm({ onBackToLogin }: TeinRegistrationFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openConstituencySelect, setOpenConstituencySelect] = useState(false);
  const [constituencySearch, setConstituencySearch] = useState('');
  const [redirectCountdown, setRedirectCountdown] = useState(3);
  const { addNotification } = useNotifications();

  const totalSteps = 3;

  // Auto-redirect countdown after successful registration
  useEffect(() => {
    if (isSubmitted && onBackToLogin) {
      const timer = setInterval(() => {
        setRedirectCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            onBackToLogin();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isSubmitted, onBackToLogin]);

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};

    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Required';
      if (!formData.studentId.trim()) newErrors.studentId = 'Required';
      if (!formData.email.trim()) {
        newErrors.email = 'Required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Invalid email';
      }
      if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Required';
    }

    if (step === 2) {
      if (!formData.school) newErrors.school = 'Required';
      if (!formData.level) newErrors.level = 'Required';
      if (!formData.course.trim()) newErrors.course = 'Required';
    }

    if (step === 3) {
      if (!formData.motherConstituency) newErrors.motherConstituency = 'Required';
      if (!formData.consentGiven) newErrors.consentGiven = 'Please confirm';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    if (!validateStep(currentStep)) {
      return;
    }

    // Add notification for admins/secretaries
    addNotification({
      type: 'approval',
      title: 'New Member Registration',
      message: `${formData.fullName} has registered and is awaiting approval. Email: ${formData.email}`,
      link: '/members'
    });

    toast.success('Registration submitted successfully! Awaiting approval.');
    setIsSubmitted(true);
  };

  // Success Screen
  if (isSubmitted) {
    return (
      <div className="min-h-screen flex" style={{ fontFamily: "'Poppins', sans-serif" }}>
        {/* Left Section */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          <div className="absolute inset-0" style={{ backgroundColor: '#001a0d' }}>
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1643061754995-7e5d031b0183?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwc3R1ZGVudHMlMjBncm91cHxlbnwxfHx8fDE3NjIwMTI1ODV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="GIMPA Students"
              className="w-full h-full object-cover opacity-25"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom right, rgba(0, 122, 51, 0.95), rgba(0, 122, 51, 0.88), rgba(0, 26, 13, 0.92))' }} />
          </div>
          
          <div className="relative z-10 flex flex-col justify-center px-12">
            <div className="flex justify-center mb-8">
              <div className="h-24 w-24 rounded-full flex items-center justify-center" style={{ backgroundColor: '#007A33' }}>
                <CheckCircle className="h-16 w-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl mb-4 leading-tight text-white text-center">
              Welcome to<br />
              <span>GIMPA TEIN NDC!</span>
            </h1>
            <p className="text-base text-white/80 max-w-md mx-auto leading-relaxed text-center">
              Your registration has been submitted successfully. Together, we make a difference.
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 flex items-center justify-center p-6 bg-white">
          <div className="w-full max-w-md">
            <div className="lg:hidden text-center mb-6">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg" style={{ backgroundColor: '#007A33' }}>
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg" style={{ backgroundColor: '#E30613' }}>
                  <User className="h-6 w-6 text-white" />
                </div>
              </div>
              <h2 className="text-xl text-foreground">GIMPA TEIN NDC</h2>
            </div>

            <div className="bg-card rounded-xl shadow-lg p-6">
              <div className="text-center">
                <div className="flex justify-center mb-4 lg:hidden">
                  <div className="h-16 w-16 rounded-full flex items-center justify-center" style={{ backgroundColor: '#007A33' }}>
                    <CheckCircle className="h-10 w-10 text-white" />
                  </div>
                </div>
                
                <h2 className="text-2xl mb-3">Registration Successful!</h2>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                  Your account is pending approval. You'll receive a notification once activated.
                </p>

                {onBackToLogin && (
                  <div className="space-y-3">
                    <Button
                      onClick={onBackToLogin}
                      className="w-full h-10 rounded-full text-white"
                      style={{ backgroundColor: '#007A33' }}
                    >
                      Go to Login
                    </Button>
                    
                    <p className="text-xs text-muted-foreground">
                      Redirecting in {redirectCountdown} second{redirectCountdown !== 1 ? 's' : ''}...
                    </p>
                  </div>
                )}
              </div>
            </div>

            <p className="text-center text-xs text-muted-foreground mt-6">
              © 2024 GIMPA TEIN NDC. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Step Content Renderer
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-3.5">
            <div className="space-y-1.5">
              <Label htmlFor="fullName" className="text-xs">
                Full Name <span style={{ color: '#E30613' }}>*</span>
              </Label>
              <Input
                id="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                className={`h-9 rounded-lg ${errors.fullName ? 'border-red-500' : ''}`}
              />
              {errors.fullName && (
                <p className="text-xs text-red-500">{errors.fullName}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="studentId" className="text-xs">
                Student ID Number <span style={{ color: '#E30613' }}>*</span>
              </Label>
              <Input
                id="studentId"
                placeholder="e.g., 2024/001234"
                value={formData.studentId}
                onChange={(e) => handleInputChange('studentId', e.target.value)}
                className={`h-9 rounded-lg ${errors.studentId ? 'border-red-500' : ''}`}
              />
              {errors.studentId && (
                <p className="text-xs text-red-500">{errors.studentId}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs">
                Email Address <span style={{ color: '#E30613' }}>*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@gimpa.edu.gh"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`h-9 rounded-lg ${errors.email ? 'border-red-500' : ''}`}
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="phoneNumber" className="text-xs">
                Phone Number <span style={{ color: '#E30613' }}>*</span>
              </Label>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="+233 XX XXX XXXX"
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                className={`h-9 rounded-lg ${errors.phoneNumber ? 'border-red-500' : ''}`}
              />
              {errors.phoneNumber && (
                <p className="text-xs text-red-500">{errors.phoneNumber}</p>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-3.5">
            <div className="space-y-1.5">
              <Label htmlFor="school" className="text-xs">
                School <span style={{ color: '#E30613' }}>*</span>
              </Label>
              <Select
                value={formData.school}
                onValueChange={(value) => handleInputChange('school', value)}
              >
                <SelectTrigger className={`h-9 rounded-lg ${errors.school ? 'border-red-500' : ''}`}>
                  <SelectValue placeholder="Select your school" />
                </SelectTrigger>
                <SelectContent>
                  {gimpaSchools.map((school) => (
                    <SelectItem key={school} value={school}>
                      {school}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.school && (
                <p className="text-xs text-red-500">{errors.school}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="level" className="text-xs">
                Level <span style={{ color: '#E30613' }}>*</span>
              </Label>
              <Select
                value={formData.level}
                onValueChange={(value) => handleInputChange('level', value)}
              >
                <SelectTrigger className={`h-9 rounded-lg ${errors.level ? 'border-red-500' : ''}`}>
                  <SelectValue placeholder="Select your level" />
                </SelectTrigger>
                <SelectContent>
                  {levelOptions.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.level && (
                <p className="text-xs text-red-500">{errors.level}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="course" className="text-xs">
                Course <span style={{ color: '#E30613' }}>*</span>
              </Label>
              <Input
                id="course"
                placeholder="e.g., Business Administration"
                value={formData.course}
                onChange={(e) => handleInputChange('course', e.target.value)}
                className={`h-9 rounded-lg ${errors.course ? 'border-red-500' : ''}`}
              />
              {errors.course && (
                <p className="text-xs text-red-500">{errors.course}</p>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-3.5">
            <div className="space-y-1.5">
              <Label htmlFor="motherConstituency" className="text-xs">
                Mother Constituency <span style={{ color: '#E30613' }}>*</span>
              </Label>
              <Popover open={openConstituencySelect} onOpenChange={setOpenConstituencySelect}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openConstituencySelect}
                    className={`w-full h-9 rounded-lg justify-between ${errors.motherConstituency ? 'border-red-500' : ''}`}
                  >
                    <span className="truncate">
                      {formData.motherConstituency || "Select constituency..."}
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="start">
                  <Command>
                    <CommandInput
                      placeholder="Search constituency..."
                      value={constituencySearch}
                      onValueChange={setConstituencySearch}
                    />
                    <CommandList>
                      <CommandEmpty>No constituency found.</CommandEmpty>
                      <CommandGroup>
                        {ghanaConstituencies
                          .filter(constituency =>
                            constituency.toLowerCase().includes(constituencySearch.toLowerCase())
                          )
                          .map((constituency) => (
                            <CommandItem
                              key={constituency}
                              value={constituency}
                              onSelect={(value) => {
                                handleInputChange('motherConstituency', value);
                                setOpenConstituencySelect(false);
                                setConstituencySearch('');
                              }}
                            >
                              {constituency}
                            </CommandItem>
                          ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              {errors.motherConstituency && (
                <p className="text-xs text-red-500">{errors.motherConstituency}</p>
              )}
              <p className="text-xs text-muted-foreground">
                Search from {ghanaConstituencies.length} constituencies
              </p>
            </div>

            <div className="flex items-start space-x-2 pt-3">
              <Checkbox
                id="consent"
                checked={formData.consentGiven}
                onCheckedChange={(checked) => handleInputChange('consentGiven', checked as boolean)}
                className={errors.consentGiven ? 'border-red-500' : ''}
              />
              <div className="grid gap-1 leading-none">
                <label
                  htmlFor="consent"
                  className="text-xs cursor-pointer"
                >
                  I confirm that the above information is accurate <span style={{ color: '#E30613' }}>*</span>
                </label>
                {errors.consentGiven && (
                  <p className="text-xs text-red-500">{errors.consentGiven}</p>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Main Registration Form
  return (
    <div className="min-h-screen flex" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* Left Section */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundColor: '#001a0d' }}>
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1643061754995-7e5d031b0183?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwc3R1ZGVudHMlMjBncm91cHxlbnwxfHx8fDE3NjIwMTI1ODV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="GIMPA Students"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom right, rgba(0, 26, 13, 0.95), rgba(0, 61, 30, 0.88), rgba(0, 26, 13, 0.92))' }} />
        </div>
        
        <div className="relative z-10 flex flex-col px-12 py-8">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-white shadow-lg">
                <span className="text-primary text-base">T</span>
              </div>
              <span className="text-white text-lg">GIMPA TEIN NDC</span>
            </div>
            {onBackToLogin && (
              <button
                onClick={onBackToLogin}
                className="text-white/70 hover:text-white transition-colors text-sm flex items-center gap-2"
              >
                ← Back to Login
              </button>
            )}
          </div>

          <div className="flex flex-col justify-center flex-1">
            <h1 className="text-4xl mb-4 leading-tight text-white">
              Join GIMPA TEIN.<br />
              <span>Make a Difference.</span>
            </h1>
            <p className="text-base text-white/80 max-w-md leading-relaxed">
              Complete your registration to become a proud member of GIMPA-TEIN.
            </p>
            
            {/* Progress dots */}
            <div className="flex gap-2 mt-8">
              <div className={`h-1 rounded-full transition-all ${currentStep === 1 ? 'w-8 bg-white' : 'w-8 bg-white/30'}`} />
              <div className={`h-1 rounded-full transition-all ${currentStep === 2 ? 'w-8 bg-white' : 'w-8 bg-white/30'}`} />
              <div className={`h-1 rounded-full transition-all ${currentStep === 3 ? 'w-8 bg-white' : 'w-8 bg-white/30'}`} />
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Registration Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-6">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg" style={{ backgroundColor: '#007A33' }}>
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg" style={{ backgroundColor: '#E30613' }}>
                <User className="h-6 w-6 text-white" />
              </div>
            </div>
            <h2 className="text-xl text-foreground">GIMPA TEIN NDC</h2>
          </div>

          {/* Form Card */}
          <div className="bg-card rounded-xl shadow-lg p-6">
            <div className="mb-5">
              <h2 className="text-2xl mb-1">Registration Form</h2>
              <p className="text-muted-foreground text-xs">Step {currentStep} of {totalSteps}</p>
            </div>

            {/* Step Indicators */}
            <div className="flex justify-between mb-6">
              {[
                { num: 1, label: 'Personal', icon: User },
                { num: 2, label: 'Academic', icon: GraduationCap },
                { num: 3, label: 'Membership', icon: MapPin },
              ].map(({ num, label, icon: Icon }) => (
                <div key={num} className="flex flex-col items-center flex-1">
                  <div
                    className={`h-9 w-9 rounded-full flex items-center justify-center transition-all ${
                      currentStep >= num ? 'text-white' : 'bg-gray-200 text-gray-400'
                    }`}
                    style={currentStep >= num ? { backgroundColor: '#007A33' } : {}}
                  >
                    {currentStep > num ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <Icon className="h-4 w-4" />
                    )}
                  </div>
                  <span className={`text-xs mt-1.5 ${currentStep >= num ? 'text-green-600' : 'text-gray-400'}`}>
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Form Content */}
            <div>
              {renderStepContent()}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-5 border-t mt-5">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="h-9 px-4 rounded-full text-sm"
              >
                <ChevronLeft className="mr-1 h-4 w-4" />
                Previous
              </Button>

              {currentStep < totalSteps ? (
                <Button
                  onClick={handleNext}
                  className="h-9 px-4 rounded-full text-white text-sm"
                  style={{ backgroundColor: '#007A33' }}
                >
                  Next
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  className="h-9 px-4 rounded-full text-white text-sm"
                  style={{ backgroundColor: '#E30613' }}
                >
                  <CheckCircle className="mr-1 h-4 w-4" />
                  Submit
                </Button>
              )}
            </div>

            {/* Login Link */}
            {onBackToLogin && (
              <div className="mt-4 text-center">
                <p className="text-xs text-muted-foreground">
                  Already a member?{' '}
                  <button
                    onClick={onBackToLogin}
                    className="text-foreground hover:underline"
                    style={{ color: '#007A33' }}
                  >
                    Login here
                  </button>
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-muted-foreground mt-6">
            © 2024 GIMPA TEIN NDC. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
