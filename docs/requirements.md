# Product Requirements Document (PRD)
**Product Name:** Eisenhower Matrix Task Prioritizer  
**Document Version:** 1.0 (MVP)  
**Author:** Lead Technical Product Manager  
**Date:** May 1, 2026  

---

## 1. Project Scope
The objective of this project is to build a Minimum Viable Product (MVP) of a web-based Eisenhower Matrix application. The tool will help users visually categorize their tasks by Urgency and Importance to improve time management.

**In-Scope for MVP:**
* A responsive, web-based 2x2 matrix UI (Do, Decide, Delegate, Delete).
* Ability to Create, Read, Update, and Delete (CRUD) text-based tasks.
* Drag-and-drop functionality to move tasks freely between the four quadrants.
* Client-side data persistence so users do not lose their data upon refreshing or closing the tab.

**Out-of-Scope for MVP:**
* User authentication and account creation (SSO, email login).
* Backend database and cloud synchronization across multiple devices.
* Push notifications, due dates, and calendar integrations.
* Collaborative features (sharing matrices, assigning tasks to other users).
* Mobile-native applications (iOS/Android), though the web app will be responsive.

---

## 2. Constraints & Assumptions

### Technical Constraints
1. **Client-Side Storage:** The application must rely entirely on the browser's `localStorage` API for data persistence. No backend database (e.g., PostgreSQL, MongoDB) will be provisioned for the MVP.
2. **Zero Infrastructure Cost:** The MVP must be built as a static Single Page Application (SPA) capable of being hosted on free-tier CDN services (e.g., GitHub Pages, Vercel, or Netlify).
3. **No Third-Party APIs:** The core functionality must not rely on external paid APIs or services to ensure zero ongoing operational costs during the validation phase.

### Assumptions
1. **Device Usage:** We assume the primary MVP user base will access the tool via desktop or laptop computers, where drag-and-drop interactions are heavily utilized with a mouse or trackpad.
2. **Concept Familiarity:** We assume users are already familiar with the Eisenhower Matrix methodology (Urgent vs. Important) and do not require extensive onboarding or in-app tutorials.
3. **Single-Device Workflow:** We assume that users are satisfied managing their priorities on a single primary workstation for this iteration, tolerating the lack of cross-device synchronization.

---

## 3. Personas

**Persona 1: Overwhelmed Ollie (The Startup Founder)**
* **Background:** Founder of a small, bootstrapped tech startup. Wears multiple hats (sales, product, HR).
* **Pain Points:** Constantly putting out fires. Struggles to distinguish between things that are screaming for attention (urgent) and things that actually move the business forward (important).
* **Goals:** Needs a visual, friction-free way to brain-dump tasks and immediately decide what he should do today and what he should delegate to his freelancers.

**Persona 2: Diligent Diana (The Graduate Student)**
* **Background:** Full-time Master's student who also works a part-time job as a Teaching Assistant.
* **Pain Points:** Has long-term thesis work competing with immediate grading deadlines and personal life chores. Traditional lists make her feel paralyzed by the sheer volume.
* **Goals:** Needs to separate her high-value thesis research (Important, Not Urgent) from immediate trivial tasks so she can block out time on her calendar effectively.

---

## 4. User Stories

1. **As an** Overwhelmed Ollie, **I want to** quickly add a new task directly into a specific quadrant **so that** I can categorize its priority the moment it enters my mind.
2. **As a** Diligent Diana, **I want to** drag and drop a task from the "Decide" quadrant to the "Do" quadrant **so that** I can easily re-prioritize my work as deadlines approach.
3. **As a** user, **I want to** edit the text of an existing task **so that** I can add more context or correct typos without having to delete and recreate it.
4. **As a** user, **I want to** click a button to delete a task entirely **so that** my matrix remains uncluttered once a task is completed or no longer relevant.
5. **As an** Overwhelmed Ollie, **I want** my tasks to automatically save without me clicking a "Save" button **so that** I don't lose my prioritized list if I accidentally close the browser tab.

---

## 5. Requirements

### Functional Requirements (FR)
* **FR1: Matrix Interface.** The application shall display a 2x2 grid representing the four standard Eisenhower categories: "Do" (Urgent & Important), "Decide/Schedule" (Not Urgent & Important), "Delegate" (Urgent & Not Important), and "Delete/Eliminate" (Not Urgent & Not Important).
* **FR2: Task Creation.** The application shall provide an input field and submission trigger (e.g., "Enter" key or "Add" button) within each quadrant to generate a new task consisting of a text string (up to 255 characters).
* **FR3: Drag-and-Drop Interaction.** The system shall allow users to click, hold, and drag a task component from its current quadrant and drop it into any of the other three quadrants, updating its underlying status immediately.
* **FR4: State Persistence.** The system shall serialize the current state of all active tasks (ID, text content, and quadrant assignment) and save it to the browser's `localStorage` on every CRUD operation or drag-and-drop event.

### Non-Functional Requirements (NFR)
* **NFR1: Performance.** The application shall render the initial UI and load all saved tasks from `localStorage` in under 1.5 seconds on a standard broadband connection.
* **NFR2: Usability.** The drag-and-drop interface shall provide immediate visual feedback (e.g., a highlighted border or change in background color) on the target quadrant to indicate a valid drop zone to the user.
* **NFR3: Reliability (Offline Capability).** Once the static assets (HTML/CSS/JS) have loaded in the browser, the application shall remain 100% functional even if the user loses internet connection, as all processing and storage are handled client-side.