# GIMPA TEIN NDC - Admin Quick Start Guide
## System Expansion: Elections & Alumni Management

### 🚀 Quick Start (5 Minutes)

---

## 1️⃣ Election Commission Setup

### Create EC Account (Admin Only)
```
1. Login as Admin: kofi.mensah@gimpa.edu.gh / demo123
2. Navigate to Elections page
3. Click "Create EC Account"
4. Enter EC member details:
   - First Name
   - Last Name
   - Email (use @gimpa.edu.gh)
   - Phone
   - Temporary Password
5. Click "Create EC Account"
6. ✅ EC can now login and manage elections
```

---

## 2️⃣ Run an Election (EC/Admin)

### Step-by-Step Election Process
```
Phase 1: CREATE ELECTION
├── Login as EC (ec.chair@gimpa.edu.gh / demo123)
├── Click "Create Election"
├── Fill in:
│   ├── Title: "2024 Executive Elections"
│   ├── Description
│   ├── Start Date & End Date
│   └── Initial Status: "Draft" or "Nomination"
└── Click "Create Election"

Phase 2: OPEN NOMINATIONS
├── Change status to "Nomination" (if started as draft)
├── Members can now submit candidacy
├── Review nominations as they come in
└── Approve/Reject candidates

Phase 3: PUBLISH VOTER LIST
├── Click "Publish Voter List" on election card
├── System auto-generates from active members
└── ✅ Members notified of eligibility

Phase 4: START VOTING
├── Ensure all candidates are approved
├── Change status to "Voting"
├── Monitor participation
└── Wait for voting period to end

Phase 5: PUBLISH RESULTS
├── After voting ends, change status to "Completed"
├── Click "Publish Results"
└── ✅ Results are now public
```

---

## 3️⃣ Verify Alumni (Admin/Secretary)

### Verification Workflow
```
Step 1: CHECK PENDING QUEUE
├── Navigate to Alumni page
├── Click "Verification" tab
└── See all pending alumni

Step 2: REVIEW RECORD
├── Click "Review & Verify" on alumni card
├── Check:
│   ├── Name and membership ID
│   ├── Program and graduation year
│   ├── Contact information
│   └── Graduation confirmation
└── Verify accuracy

Step 3: MAKE DECISION

Option A: VERIFY
├── Click "Verify Alumni"
├── ✅ Alumni status becomes "verified"
├── Contact info becomes visible
└── Can receive communications

Option B: REJECT
├── Enter rejection reason
├── Click "Reject"
└── Alumni notified to provide corrections
```

---

## 4️⃣ Send Bulk Messages to Alumni

### Communication Steps
```
1. Navigate to Alumni page
2. Click "Send Bulk Message"
3. Choose channel: Email / SMS / WhatsApp
4. Select recipients:
   - All verified alumni
   - Or select specific alumni (checkbox)
5. Write message:
   - Use {first_name}, {last_name} for personalization
6. Click "Send Message"
7. ✅ Delivery confirmation
```

---

## 5️⃣ Migrate Graduating Students

### Migration Process
```
1. Navigate to Alumni → Migration tab
2. System shows "Ready for Migration" count
3. Review graduating members list:
   - Level 400 students
   - Completed programs
4. Click "Flag for Migration"
5. Members moved to "Pending" in alumni database
6. Follow verification workflow (Step 3)
```

---

## 📊 Dashboard Overview

### Admin Dashboard
```
┌─────────────────────────────────────────────┐
│ Total Members: 10 | Active: 7 | Pending: 3  │
├─────────────────────────────────────────────┤
│ Recent Activity:                             │
│ • 2 pending member approvals                 │
│ • 3 pending alumni verifications             │
│ • 1 active election                          │
└─────────────────────────────────────────────┘
```

### EC Dashboard
```
┌─────────────────────────────────────────────┐
│ Active Elections: 1 | Pending Approvals: 3  │
├─────────────────────────────────────────────┤
│ Action Items:                                │
│ • 3 candidates awaiting approval             │
│ • Monitor voting in "2024 Elections"         │
│ • Audit Logs: 6 recent actions              │
└─────────────────────────────────────────────┘
```

---

## 🔐 Test Accounts Reference

```javascript
// ADMIN (Full Control)
Email: kofi.mensah@gimpa.edu.gh
Password: demo123
Access: Everything

// ELECTION COMMISSION
Email: ec.chair@gimpa.edu.gh
Password: demo123
Access: Elections only

// SECRETARY
Email: akua.asante@gimpa.edu.gh
Password: demo123
Access: Records + Alumni

// MEMBER (Voter)
Email: ama.owusu@gimpa.edu.gh
Password: demo123
Access: Participation
```

---

## ⚠️ Important Notes

### Election Management
- ✅ Always approve candidates before starting voting
- ✅ Publish voter list before voting starts
- ✅ Cannot change status once voting begins
- ✅ All actions are logged for transparency

### Alumni Verification
- ✅ Only verified alumni receive communications
- ✅ Contact info hidden until verified
- ✅ Provide clear rejection reasons
- ✅ Migration requires admin approval

### Security
- ✅ EC accounts have limited access (elections only)
- ✅ All sensitive actions are logged
- ✅ One vote per member enforced
- ✅ Votes are anonymous

---

## 🐛 Quick Troubleshooting

### "Election not visible to members"
```
Check:
1. Status is "nomination" or "voting" (not "draft")
2. Dates are current
3. Member is in voter list
```

### "Cannot cast vote"
```
Check:
1. Election status is "voting"
2. Member hasn't voted already
3. Member is in published voter list
```

### "Alumni not appearing"
```
Check:
1. Verification status is "verified"
2. Admin/Secretary has approved
3. Not in "pending" or "rejected" status
```

### "Bulk message not sent"
```
Check:
1. Recipients are verified alumni
2. Message content is not empty
3. Channel is properly configured
```

---

## 📞 Quick Actions

### View Audit Logs (Admin Only)
```
Elections Page → Click "Audit Logs" button
→ See all election activities with timestamps
```

### Check Pending Tasks
```
Elections: Pending candidate approvals shown in badges
Alumni: Pending count shown in yellow statistics card
Members: Pending registrations in Members page
```

### Access Statistics
```
Dashboard: Overview of all system metrics
Elections Page: Active elections and candidate counts
Alumni Page: Verified vs pending alumni counts
```

---

## ✅ System Health Checklist

### Daily Tasks
- [ ] Check pending member approvals
- [ ] Review pending alumni verifications
- [ ] Monitor active elections
- [ ] Check notification center

### Weekly Tasks
- [ ] Review audit logs
- [ ] Verify graduate migration queue
- [ ] Check communication deliveries
- [ ] Update member records

### Before Elections
- [ ] Create/verify EC accounts
- [ ] Test election workflow
- [ ] Verify voter list accuracy
- [ ] Communicate dates to members

---

## 🎯 Success Metrics

### Elections
- ✅ 100% candidate approval rate before voting
- ✅ Voter list published 3+ days before voting
- ✅ >70% voter participation
- ✅ Zero voting irregularities

### Alumni
- ✅ <7 day verification turnaround
- ✅ 100% graduate migration completion
- ✅ >90% alumni database accuracy
- ✅ Regular bulk communications

---

## 📚 Full Documentation
For detailed information, see:
- `SYSTEM_EXPANSION_GUIDE.md` - Complete system documentation
- `TESTING_GUIDE.md` - Testing procedures
- `ADMIN_CHECKLIST.md` - Administrative tasks

---

**Quick Start Version:** 1.0  
**Last Updated:** November 6, 2024  
**Support:** Contact system administrator

---

### 🚨 Emergency Contacts
```
System Issues: tech@tein-ndc.org
Election Support: ec@tein-ndc.org
Admin Support: admin@tein-ndc.org
```

---

**Remember:** All actions are logged. Act with transparency and integrity. 🎯
