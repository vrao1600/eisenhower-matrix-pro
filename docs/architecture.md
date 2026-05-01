# System & UI Design Document
## Eisenhower Matrix Task Prioritizer

**Product Name:** Eisenhower Matrix Task Prioritizer  
**Document Version:** 1.0 MVP  
**Date:** May 1, 2026  
**Technical Stack:** React, Tailwind CSS, Lucide-react  
**Application Type:** Static Single Page Application SPA  

---

## 1. Architecture Overview

The Eisenhower Matrix Task Prioritizer will be built as a client-side Single Page Application using React. The application will run entirely in the browser and will not require a backend server, database, authentication system, or third-party API.

The application will allow users to organize tasks into four Eisenhower Matrix categories:

1. **Do**
   - Urgent and Important

2. **Decide / Schedule**
   - Not Urgent and Important

3. **Delegate**
   - Urgent and Not Important

4. **Delete / Eliminate**
   - Not Urgent and Not Important

The SPA will manage all task data in React state during the active session. To preserve user data after refreshes or browser restarts, the application will synchronize task state with the browser’s `localStorage`.

### High-Level Flow

```text
User opens app
      |
React app loads
      |
Tasks are loaded from localStorage
      |
User creates, edits, deletes, or drags tasks
      |
React state updates immediately
      |
Updated task state is saved to localStorage
      |
UI re-renders with latest task data