

## Quiz Application – Implementation Plan

### 1. Landing Page
- Full-screen centered layout with two placeholder logo images side by side
- Bold "QUIZ" title below logos
- "START QUIZ" button that navigates to the login page

### 2. Login Page
- Form with Name, Roll Number, and Password fields
- Fixed password validation (`Quiz@1`)
- Error message on wrong password
- Redirect to Rules page on success
- Store participant info (name, roll number) in app state

### 3. Rules Page
- Display all quiz rules in a bulleted list
- Checkbox: "I have read and understood the rules"
- "START QUIZ" button (disabled until checkbox is checked)
- Navigates to Quiz page on click

### 4. Quiz Interface
- **Main area**: One question at a time (MCQ with radio buttons or fill-in-the-blank with text input)
- **Sidebar**: Question numbers 1–30 as clickable buttons, color-coded (answered vs unanswered)
- **Timer**: 30-minute countdown displayed prominently at the top
- Navigation buttons: Previous / Next
- 30 placeholder questions hardcoded (you can replace them with your real questions later)

### 5. Submission & Auto-Submit
- "Submit" button visible at all times
- Confirmation dialog before submitting
- Auto-submit when timer reaches 0
- Prevent page refresh during quiz (beforeunload warning)

### 6. Score Card Page
- Display participant name, roll number, and score (e.g., "You scored: 25 / 30")
- "OK" button to finish

### 7. Secret Admin Page (`/admin`)
- Password-protected admin page (separate admin password)
- Table showing all participants: Name, Roll Number, Time Taken, Score
- "Download as Excel/CSV" button
- Data stored in browser's localStorage (since no backend)

### Key Technical Notes
- All state managed via React Context (participant info, answers, timer)
- Quiz data (questions + correct answers) hardcoded in a constants file
- Participant results saved to localStorage for admin page retrieval
- One login per session enforced via sessionStorage flag

