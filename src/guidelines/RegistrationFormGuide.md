# TEIN Registration Form - Integration Guide

## Overview
The GIMPA-TEIN Registration Form is now fully integrated into the membership management platform. It provides a seamless, multi-step registration experience for new members.

## Access Points

### 1. Public Access (Unauthenticated)
- **From Login Page:** Click "Register as a member" link below the sign-up section
- **Direct URL:** Navigate to the registration page without being logged in
- Users can complete registration and return to login

### 2. Dashboard Access (Authenticated)
- **Admin Dashboard:** Navigate via "Register Member" in the sidebar
- **Secretary Dashboard:** Navigate via "Register Member" in the sidebar
- Allows staff to register new members on behalf of students

### 3. Public Website
- **Hero Section:** "Join Us Today" button
- **Join Section:** "Complete Registration Form" button
- Both redirect to the comprehensive registration form

## Form Structure

### Step 1: Personal Information
- Full Name (required)
- Student ID Number (required)
- Email Address (required, validated)
- Phone Number (required, validated)

### Step 2: Academic Details
- School (dropdown, required) - 6 GIMPA schools
- Level (dropdown, required) - 100, 200, 300, 400, Post Graduate
- Course (text input, required)

### Step 3: Membership & Constituency
- Mother Constituency (searchable dropdown, required) - 275 constituencies
- Consent checkbox (required)

## Features

### ✅ Multi-Step Navigation
- Progress bar showing completion percentage
- Visual step indicators (1, 2, 3)
- Next/Previous buttons for easy navigation
- Submit button on final step

### ✅ Validation
- Real-time field validation
- Error messages appear below each field
- Prevents progression to next step if current step has errors
- Email format validation
- Phone number format validation

### ✅ Searchable Constituency Dropdown
- Type-to-filter functionality
- Lists all 275 constituencies in Ghana
- Organized alphabetically
- Using Popover + Command components for UX

### ✅ Success Screen
- Confirmation message
- Shows submitted email and student ID
- Option to register another member
- Option to return to login (public access only)

### ✅ Branding
- Uses official NDC colors (Red #E30613, Green #007A33)
- Icons in brand colors
- Consistent with platform design language
- Mobile-responsive layout

## Data Flow

### Form Submission
```typescript
// Current: Console logging
console.log('Form submitted:', formData);
console.log('Notification email:', 'gabrieldasampana@gmail.com');

// Phase II (Supabase): Database insertion
await supabase.from('registrations').insert({
  full_name: formData.fullName,
  student_id: formData.studentId,
  email: formData.email,
  phone_number: formData.phoneNumber,
  school: formData.school,
  level: formData.level,
  course: formData.course,
  mother_constituency: formData.motherConstituency,
  status: 'pending',
  created_at: new Date().toISOString()
});

// Send notification email to gabrieldasampana@gmail.com
```

## Technical Details

### Component Location
`/components/TeinRegistrationForm.tsx`

### Dependencies
- shadcn/ui components (Card, Input, Select, Button, Progress, Checkbox, Popover, Command)
- lucide-react icons
- sonner for toast notifications
- constituencies data from `/lib/constituencies.ts`

### Props Interface
```typescript
interface TeinRegistrationFormProps {
  onBackToLogin?: () => void;  // Optional: Show "Back to Login" button
}
```

## Notification System
- **System Email:** gabrieldasampana@gmail.com
- **Purpose:** Receives all registration form submissions
- **Future Integration:** Can be connected to email service (SendGrid, Resend, etc.)

## Navigation Integration

### Sidebar Menu Item
```typescript
{ 
  id: 'register', 
  label: 'Register Member', 
  icon: UserPlus, 
  roles: ['admin', 'secretary'] 
}
```

### App.tsx Routing
- Public route: `currentPage === 'register'` without authentication
- Authenticated route: Rendered within DashboardLayout
- PublicWebsite integration: Button click navigation

## Mobile Responsiveness
- Full-width on mobile devices
- Stacked form fields
- Touch-friendly buttons and inputs
- Scrollable constituency dropdown
- Maintains readability on small screens

## Future Enhancements (Phase II)

### Database Integration
- Store registrations in Supabase
- Auto-generate membership IDs
- Track registration status (pending → approved → active)
- Link to member records

### Email Notifications
- Send confirmation email to registrant
- Send notification to admin (gabrieldasampana@gmail.com)
- Include registration details and next steps
- Email templates with NDC branding

### File Uploads
- Upload student ID photo
- Upload passport photo
- Document verification

### Advanced Features
- Duplicate detection (by student ID or email)
- Batch approvals
- Registration analytics
- Export registration data
- QR code membership cards

## Testing Checklist

### ✅ Form Validation
- [ ] Test all required fields
- [ ] Test email format validation
- [ ] Test phone number validation
- [ ] Test form progression with errors
- [ ] Test form progression without errors

### ✅ Navigation
- [ ] Test from login page
- [ ] Test from public website
- [ ] Test from admin dashboard
- [ ] Test from secretary dashboard
- [ ] Test back button functionality
- [ ] Test "Back to Login" button

### ✅ Constituency Search
- [ ] Test search functionality
- [ ] Test selection
- [ ] Test with empty search
- [ ] Test with no results

### ✅ Success Screen
- [ ] Verify confirmation message
- [ ] Verify email display
- [ ] Verify student ID display
- [ ] Test "Register Another Member"
- [ ] Test "Back to Login" (when available)

### ✅ Responsive Design
- [ ] Test on mobile (320px+)
- [ ] Test on tablet (768px+)
- [ ] Test on desktop (1024px+)
- [ ] Test on large screens (1920px+)

## Support & Maintenance

### Common Issues
1. **Constituency dropdown not showing:** Check if data is imported from constituencies.ts
2. **Validation not working:** Ensure error state is properly set
3. **Form not submitting:** Check console for errors
4. **Navigation issues:** Verify routing logic in App.tsx

### Code Maintenance
- Keep constituencies list updated as Ghana's electoral boundaries change
- Update GIMPA schools list if new faculties are added
- Maintain consistent validation patterns across forms
- Test thoroughly after any modifications

## Summary
The TEIN Registration Form is now a core part of the membership onboarding process. It provides a professional, user-friendly experience that aligns with NDC branding and GIMPA's institutional standards. The form is ready for immediate use in Phase I and structured for seamless Supabase integration in Phase II.

---

**Last Updated:** October 31, 2025  
**Notification Email:** gabrieldasampana@gmail.com
