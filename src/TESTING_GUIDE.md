# Testing Guide - New Modules
## Elections & Alumni Management System

This guide provides step-by-step instructions for testing the newly implemented Election Management and Alumni Management modules.

---

## Test User Credentials

Use these existing test accounts to test different role perspectives:

### Admin/Chairman
- **Email:** kofi.mensah@gimpa.edu.gh
- **Password:** password123
- **Access:** Full system access

### Secretary
- **Email:** akua.asante@gimpa.edu.gh
- **Password:** password123
- **Access:** Member management, elections, alumni, communications

### Treasurer
- **Email:** kwame.boateng@gimpa.edu.gh
- **Password:** password123
- **Access:** Financial management

### Member
- **Email:** ama.owusu@gimpa.edu.gh
- **Password:** password123
- **Access:** Basic member features, voting, viewing

---

## Election Management System Tests

### Test 1: Admin - View Elections Dashboard
**Login as:** Admin (kofi.mensah@gimpa.edu.gh)

**Steps:**
1. Log in to the platform
2. Click "Elections" in the sidebar
3. Verify you see the Elections page with statistics
4. Verify statistics show:
   - Active Elections: 1
   - Total Positions: 3
   - Total Candidates: 4
   - Eligible Voters: 7

**Expected Result:** ✅ Dashboard displays with accurate statistics

---

### Test 2: Admin - Create New Election
**Login as:** Admin (kofi.mensah@gimpa.edu.gh)

**Steps:**
1. Navigate to Elections page
2. Click "Create Election" button (red)
3. Fill in election details:
   - Title: "2025 Test Elections"
   - Description: "Testing election creation"
   - Start Date: Future date
   - End Date: Future date after start
   - Status: "Draft"
4. Click "Create Election"

**Expected Result:** ✅ Success toast notification appears

---

### Test 3: Admin - View Election Details
**Login as:** Admin (kofi.mensah@gimpa.edu.gh)

**Steps:**
1. Navigate to Elections page
2. Find "2024 TEIN NDC Executive Elections"
3. Click "View Details" button
4. Verify tabs appear: Positions & Candidates, Timeline, Voter List
5. Navigate through each tab

**Expected Result:** ✅ All tabs display with relevant information

---

### Test 4: Admin - Approve Candidate
**Login as:** Admin (kofi.mensah@gimpa.edu.gh)

**Steps:**
1. Navigate to Elections page
2. Click "View Details" on "2024 TEIN NDC Executive Elections"
3. Go to "Positions & Candidates" tab
4. Find candidate with "pending" status (Efua Appiah)
5. Click "Approve" button

**Expected Result:** ✅ Success toast: "Candidate approved"

---

### Test 5: Admin - Publish Voter List
**Login as:** Admin (kofi.mensah@gimpa.edu.gh)

**Steps:**
1. Navigate to Elections page
2. Find "2024 TEIN NDC Executive Elections"
3. Click "Publish Voter List" button

**Expected Result:** ✅ Success toast: "Voter list published"

---

### Test 6: Member - View Elections
**Login as:** Member (ama.owusu@gimpa.edu.gh)

**Steps:**
1. Log in as member
2. Navigate to Elections page
3. Verify you can see elections
4. Verify "Create Election" button is NOT visible
5. Check for nomination alert

**Expected Result:** ✅ Member sees elections but cannot create them

---

### Test 7: Member - Submit Nomination
**Login as:** Member (ama.owusu@gimpa.edu.gh)

**Steps:**
1. Navigate to Elections page
2. Find election with "nomination" status
3. Click "Nominate" button
4. Select a position from dropdown
5. Write manifesto text
6. Click "Submit Nomination"

**Expected Result:** ✅ Success toast: "Nomination submitted for approval"

---

### Test 8: Member - View Candidates & Manifestos
**Login as:** Member (yaw.amoako@gimpa.edu.gh)

**Steps:**
1. Navigate to Elections page
2. Click "View Details" on any election
3. Navigate to "Positions & Candidates" tab
4. Read candidate manifestos
5. Verify approved candidates are shown

**Expected Result:** ✅ All approved candidates visible with manifestos

---

### Test 9: Eligible Voter - Cast Vote (Simulated)
**Login as:** Member (ama.owusu@gimpa.edu.gh)

**Steps:**
1. Navigate to Elections page
2. Look for elections with "voting" status
3. If eligible, green alert should show: "You are eligible to vote"
4. Click "Cast Vote" button

**Expected Result:** ✅ Voting dialog appears (Note: Current mock election is in "nomination" status, so change status to "voting" to test)

---

## Alumni Management System Tests

### Test 10: Admin - View Alumni Dashboard
**Login as:** Admin (kofi.mensah@gimpa.edu.gh)

**Steps:**
1. Click "Alumni" in the sidebar
2. Verify statistics display:
   - Total Alumni: 6
   - Programs Represented: 5
   - Latest Batch: 2023
   - Graduating This Year: 1
3. Verify "Send Bulk Message" button is visible

**Expected Result:** ✅ Dashboard displays with accurate alumni statistics

---

### Test 11: Admin - Search Alumni
**Login as:** Admin (kofi.mensah@gimpa.edu.gh)

**Steps:**
1. Navigate to Alumni page
2. In search box, type "Samuel"
3. Verify results filter to show Samuel Addo
4. Clear search
5. Search by email: "grace.boakye@yahoo.com"
6. Verify Grace Boakye appears

**Expected Result:** ✅ Search returns accurate results

---

### Test 12: Admin - Filter Alumni by Program
**Login as:** Admin (kofi.mensah@gimpa.edu.gh)

**Steps:**
1. Navigate to Alumni page
2. Click program dropdown
3. Select "MBA"
4. Verify only MBA alumni show
5. Change to "IT"
6. Verify only IT alumni show

**Expected Result:** ✅ Filters work correctly

---

### Test 13: Admin - Filter by Graduation Year
**Login as:** Admin (kofi.mensah@gimpa.edu.gh)

**Steps:**
1. Navigate to Alumni page
2. Click year dropdown
3. Select "2022"
4. Verify only 2022 graduates show
5. Try combined filter: MBA + 2022

**Expected Result:** ✅ Year filter works correctly

---

### Test 14: Admin - Select Specific Alumni
**Login as:** Admin (kofi.mensah@gimpa.edu.gh)

**Steps:**
1. Navigate to Alumni page
2. Check checkbox on 2-3 alumni cards
3. Verify selection count updates
4. Click "Select all" checkbox
5. Verify all filtered alumni selected
6. Click "Clear Selection"

**Expected Result:** ✅ Selection system works correctly

---

### Test 15: Admin - Send Bulk Email
**Login as:** Admin (kofi.mensah@gimpa.edu.gh)

**Steps:**
1. Navigate to Alumni page
2. Select 2 alumni using checkboxes
3. Click "Send Bulk Message" button
4. Select "Email" as channel
5. Verify "2 alumni selected" shows
6. Enter subject: "Test Email"
7. Enter message: "This is a test message"
8. Click "Send Message"

**Expected Result:** ✅ Success toast: "Email sent to 2 alumni successfully"

---

### Test 16: Admin - Send Bulk SMS
**Login as:** Admin (kofi.mensah@gimpa.edu.gh)

**Steps:**
1. Navigate to Alumni page
2. Filter by year: 2023
3. Click "Send Bulk Message" button
4. Select "SMS" as channel
5. Note: Recipients shows "All filtered alumni"
6. Enter message (no subject for SMS)
7. Click "Send Message"

**Expected Result:** ✅ Success toast: "SMS sent to X alumni successfully"

---

### Test 17: Admin - Send Bulk WhatsApp
**Login as:** Admin (kofi.mensah@gimpa.edu.gh)

**Steps:**
1. Navigate to Alumni page
2. Click "Send Bulk Message"
3. Select "WhatsApp" as channel
4. Enter message
5. Click "Send Message"

**Expected Result:** ✅ Success toast: "WhatsApp sent to X alumni successfully"

---

### Test 18: Admin - View Graduate Migration Tab
**Login as:** Admin (kofi.mensah@gimpa.edu.gh)

**Steps:**
1. Navigate to Alumni page
2. Click "Graduate Migration" tab
3. Verify graduating members list shows
4. Check count matches dashboard statistic
5. Review member details (program, level)

**Expected Result:** ✅ Graduating members display correctly

---

### Test 19: Admin - Migrate Graduates
**Login as:** Admin (kofi.mensah@gimpa.edu.gh)

**Steps:**
1. Navigate to Alumni page
2. Click "Graduate Migration" tab
3. Click "Migrate X Graduates" button
4. Verify success notification

**Expected Result:** ✅ Success toast: "X members migrated to alumni database"

---

### Test 20: Member - View Alumni Directory
**Login as:** Member (yaw.amoako@gimpa.edu.gh)

**Steps:**
1. Navigate to Alumni page
2. Verify you can see Alumni Directory tab
3. Verify you CANNOT see Graduate Migration tab
4. Verify "Send Bulk Message" button is NOT visible
5. Browse alumni profiles
6. Click email button on an alumni card

**Expected Result:** ✅ Member has read-only access to directory

---

### Test 21: Secretary - Full Alumni Access
**Login as:** Secretary (akua.asante@gimpa.edu.gh)

**Steps:**
1. Navigate to Alumni page
2. Verify "Send Bulk Message" button is visible
3. Verify "Graduate Migration" tab is visible
4. Test sending a bulk message
5. Test accessing graduate migration

**Expected Result:** ✅ Secretary has full alumni management access

---

### Test 22: Treasurer - Alumni Access
**Login as:** Treasurer (kwame.boateng@gimpa.edu.gh)

**Steps:**
1. Navigate to Alumni page
2. Verify you can view Alumni Directory
3. Verify "Send Bulk Message" button is NOT visible
4. Verify "Graduate Migration" tab is NOT visible

**Expected Result:** ✅ Treasurer has read-only directory access

---

## Events Module Test

### Test 23: Events "Coming Soon" Page
**Login as:** Any user

**Steps:**
1. Navigate to Events page from sidebar
2. Verify "Coming Soon" placeholder displays
3. Check for calendar icon
4. Read message about upcoming development

**Expected Result:** ✅ Professional "Coming Soon" page displays

---

## Navigation & UI Tests

### Test 24: Sidebar Navigation
**Login as:** Admin (kofi.mensah@gimpa.edu.gh)

**Steps:**
1. Check sidebar for new menu items:
   - Elections (Vote icon)
   - Alumni (Graduation Cap icon)
2. Verify they appear between "Dues Status" and "Events"
3. Click each to verify navigation works
4. Verify active state highlights correctly

**Expected Result:** ✅ New navigation items appear and work correctly

---

### Test 25: Mobile Responsiveness
**Login as:** Any user

**Steps:**
1. Resize browser to mobile width (< 768px)
2. Navigate to Elections page
3. Verify cards stack vertically
4. Navigate to Alumni page
5. Verify alumni cards stack properly
6. Test opening dialogs on mobile

**Expected Result:** ✅ All pages responsive on mobile

---

### Test 26: Search Functionality Integration
**Login as:** Admin (kofi.mensah@gimpa.edu.gh)

**Steps:**
1. Click search icon in top bar (or press Ctrl+K)
2. Type "election" in search
3. Note: Elections don't appear in search yet (future enhancement)
4. Search functionality currently covers members, events, transactions

**Expected Result:** ✅ Search dialog works (elections/alumni search is future enhancement)

---

## Cross-Browser Testing

Test the following scenarios in:
- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari (if available)

**Scenarios:**
1. Login and navigation
2. Creating an election
3. Viewing alumni directory
4. Sending bulk messages
5. Responsive design

---

## Performance Tests

### Test 27: Load Time
**Login as:** Any user

**Steps:**
1. Clear browser cache
2. Log in
3. Navigate to Elections page
4. Note load time
5. Navigate to Alumni page
6. Note load time

**Expected Result:** ✅ Pages load within 1-2 seconds

---

### Test 28: Filter Performance
**Login as:** Admin (kofi.mensah@gimpa.edu.gh)

**Steps:**
1. Navigate to Alumni page
2. Rapidly change filters multiple times
3. Verify no lag or freezing
4. Clear all filters
5. Apply multiple filters simultaneously

**Expected Result:** ✅ Filters respond instantly without lag

---

## Bug Testing Scenarios

### Test 29: Boundary Conditions
**Test various edge cases:**

1. **Empty Election:**
   - Create election with no positions
   - Verify appropriate message

2. **No Alumni:**
   - Clear filters to show no results
   - Verify "No alumni found" message

3. **Long Text:**
   - Enter very long manifesto (500+ characters)
   - Verify text wraps correctly

4. **Special Characters:**
   - Use special characters in election title
   - Verify they display correctly

**Expected Result:** ✅ System handles edge cases gracefully

---

## Notification Integration Tests

### Test 30: Election Notifications
**Login as:** Admin (kofi.mensah@gimpa.edu.gh)

**Steps:**
1. Navigate to Elections page
2. Perform actions (approve candidate, publish results)
3. Check if notifications appear in notification dropdown
4. Future enhancement: Election-specific notifications

**Expected Result:** ✅ Toast notifications appear for actions

---

## Accessibility Tests

### Test 31: Keyboard Navigation
**Login as:** Any user

**Steps:**
1. Use Tab key to navigate Elections page
2. Verify all interactive elements are reachable
3. Press Enter to activate buttons
4. Use arrow keys in dropdowns
5. Test on Alumni page

**Expected Result:** ✅ Full keyboard accessibility

---

### Test 32: Screen Reader Compatibility
**If screen reader available:**

**Steps:**
1. Navigate Elections page with screen reader
2. Verify labels are read correctly
3. Verify buttons have descriptive names
4. Test form fields on Alumni page

**Expected Result:** ✅ Screen reader can navigate effectively

---

## Data Integrity Tests

### Test 33: Mock Data Verification
**Login as:** Admin (kofi.mensah@gimpa.edu.gh)

**Steps:**
1. Navigate to Elections page
2. Verify mock election data displays:
   - 2024 TEIN NDC Executive Elections (nomination status)
   - 2025 TEIN NDC Executive Elections (draft status)
3. Navigate to Alumni page
4. Verify 6 alumni profiles display
5. Check data accuracy against mockData.ts

**Expected Result:** ✅ All mock data displays accurately

---

## Integration Tests

### Test 34: Role-Based Access Control
**Test access for each role:**

| Feature | Admin | Secretary | Treasurer | Member |
|---------|-------|-----------|-----------|--------|
| View Elections | ✅ | ✅ | ✅ | ✅ |
| Create Election | ✅ | ❌ | ❌ | ❌ |
| Approve Candidates | ✅ | ❌ | ❌ | ❌ |
| Nominate | ❌ | ❌ | ❌ | ✅ |
| Vote | ✅* | ✅* | ✅* | ✅* |
| View Alumni | ✅ | ✅ | ✅ | ✅ |
| Send Bulk Message | ✅ | ✅ | ❌ | ❌ |
| Migrate Graduates | ✅ | ✅ | ❌ | ❌ |

*If on voter list

**Expected Result:** ✅ All access controls work correctly

---

## Regression Tests

### Test 35: Existing Features
**Verify new modules don't break existing features:**

**Steps:**
1. Navigate to Members page → ✅ Works
2. Navigate to Finances page → ✅ Works
3. Navigate to Communications page → ✅ Works
4. Test member registration → ✅ Works
5. Test notifications → ✅ Works
6. Test profile page → ✅ Works

**Expected Result:** ✅ All existing features still work

---

## Documentation Tests

### Test 36: Documentation Completeness
**Review documentation files:**

**Steps:**
1. Open NEW_MODULES_DOCUMENTATION.md
2. Verify all features are documented
3. Check for clear explanations
4. Verify code examples are accurate
5. Open TESTING_GUIDE.md
6. Verify all tests are clear

**Expected Result:** ✅ Documentation is complete and clear

---

## Test Results Summary

After completing all tests, fill out this summary:

```
Date: _____________
Tester: _____________

Elections Module:
✅ Admin Functions: ___/___
✅ Member Functions: ___/___
✅ Security: ___/___

Alumni Module:
✅ Admin Functions: ___/___
✅ Member Functions: ___/___
✅ Communication Tools: ___/___
✅ Migration: ___/___

General:
✅ Navigation: ___/___
✅ Responsiveness: ___/___
✅ Performance: ___/___
✅ Accessibility: ___/___

Total Pass Rate: ____%
```

---

## Known Limitations (As Expected)

1. **Mock Data:** System uses frontend mock data. Backend integration required for production.
2. **Actual Voting:** Vote casting is simulated. Real vote storage requires backend.
3. **Email/SMS:** Bulk messaging shows success toasts but doesn't send real messages.
4. **File Uploads:** Manifesto file uploads are UI-only. File storage requires backend.
5. **Search Integration:** Elections and alumni not yet in global search (future enhancement).

---

## Reporting Issues

If you find bugs during testing, report them with:
1. Test number
2. User role used
3. Steps to reproduce
4. Expected behavior
5. Actual behavior
6. Screenshot (if applicable)

---

## Next Steps After Testing

1. ✅ Verify all core functionality works
2. ✅ Document any issues found
3. ✅ Prioritize fixes
4. ✅ Plan backend integration
5. ✅ Design production deployment

---

*Testing Guide - GIMPA TEIN NDC Platform Phase I - November 6, 2024*
