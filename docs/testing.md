# Eisenhower Matrix Task Prioritizer - Test Document

## 1. Test Strategy
For this MVP release, our testing strategy focuses on **Manual Exploratory and Functional Testing**. Since the application relies entirely on client-side state and browser storage, we will validate the core user flows (CRUD operations), UI state transitions, and data persistence mechanisms.

**Scope:**
* **Functional Testing:** Verifying task creation, movement through the lifecycle (Do -> Decide -> Delegate -> Delete), and individual deletion.
* **Data Persistence:** Ensuring `localStorage` reliably saves and retrieves state between sessions.
* **UI/UX:** Validating conditional rendering (e.g., empty states, counters, disabled buttons) and responsive layout constraints.
* **Environment:** Modern web browsers (Chrome, Firefox, Safari, Edge).

---

## 2. Manual Test Scripts

### TC-01: Functional - Adding a task to the "Do" quadrant
**Pre-conditions:** The application is loaded and the "Do" quadrant is empty.
1. Locate the "Do" quadrant (red header).
2. Click into the "Add a task…" input field.
3. Type "Finalize quarterly report".
4. Click the "Add" button (or press `Enter`).
**Expected Result:** * The task card appears in the "Do" list.
* A red badge with "1" appears in the header.
* The total task counter at the top right displays "1 task".
* The input field clears automatically.

### TC-02: Functional - Moving a task from "Do" to "Decide" using the button
**Pre-conditions:** There is at least one task in the "Do" quadrant.
1. Hover the mouse cursor over the task card in the "Do" quadrant.
2. Locate the "Decide" button (with the right-arrow icon) that appears on hover.
3. Click the "Decide" button.
**Expected Result:**
* The task is immediately removed from the "Do" quadrant.
* The task appears in the "Decide" quadrant (blue header).
* The "Do" count decreases to 0, and the "Decide" count increases to 1.

### TC-03: Functional - Deleting a task
**Pre-conditions:** There is an existing task in any quadrant.
1. Hover the mouse cursor over the target task card.
2. Locate the `X` (Remove task) button that appears on hover.
3. Click the `X` button.
**Expected Result:**
* The task is permanently removed from the UI.
* The quadrant counter and total global counter update accordingly.

### TC-04: Persistence - LocalStorage Validation
**Pre-conditions:** The application has a few tasks distributed across different quadrants.
1. Note the exact text and locations of all current tasks.
2. Hard-refresh the browser tab (Cmd/Ctrl + Shift + R).
3. Wait for the application to reload.
**Expected Result:**
* All tasks remain in their exact quadrants.
* Total counts and quadrant counts are perfectly preserved.

### TC-05: UI/UX - "Clear All" Confirmation Modal
**Pre-conditions:** The application has at least one task.
1. Locate the "Clear all" button in the top right header.
2. Click the "Clear all" button.
3. Observe the browser's native confirmation dialog (`window.confirm`).
4. Click **Cancel**.
   * **Expected:** The dialog closes, and no tasks are deleted.
5. Click the "Clear all" button again.
6. Click **OK**.
   * **Expected:** All tasks are deleted. The "Clear all" button and total task counter completely disappear from the header.

---

## 3. Edge Case Analysis

1. **Edge Case: Extremely Long Task Text**
   * **Scenario:** A user pastes a massive block of text or a long continuous string without spaces (e.g., a URL) into the input field.
   * **Expected Handling:** The UI should not break or overflow horizontally. Based on the implemented `break-words` and `min-w-0` Tailwind classes, the text should wrap neatly to the next line within the confines of the task card, maintaining the alignment of the action buttons.

2. **Edge Case: Empty or Whitespace-Only Inputs**
   * **Scenario:** A user focuses on the input field, hits the Spacebar five times, and tries to submit.
   * **Expected Handling:** The system should prevent the creation of empty tasks. The implemented code utilizes `value.trim()`. The "Add" button should remain in a visually `disabled` state (reduced opacity, not allowed cursor), and pressing `Enter` should silently fail without adding a blank card.

3. **Edge Case: LocalStorage Disabled or Quota Exceeded**
   * **Scenario:** A user accesses the app in a strict incognito mode where `localStorage` throws an exception, or their storage limit is hit.
   * **Expected Handling:** The application must not crash. The `try...catch` blocks implemented around the `localStorage.setItem` and `getItem` calls should catch the exception and fail silently. The app will continue to function entirely in React state (memory), though data will naturally be lost upon refresh.

---

## 4. Validation Results

*(Use this section during your testing phase to log the outcomes.)*

| Test ID | Description | Status | Notes / Bugs Found |
| :--- | :--- | :--- | :--- |
| **TC-01** | Add task to "Do" quadrant | [ ] PENDING | |
| **TC-02** | Move task "Do" -> "Decide" | [ ] PENDING | |
| **TC-03** | Delete a single task | [ ] PENDING | |
| **TC-04** | Refresh browser (Persistence) | [ ] PENDING | |
| **TC-05** | "Clear All" modal & cancel logic | [ ] PENDING | |
| **EC-01** | Long text string wrapping | [ ] PENDING | |
| **EC-02** | Whitespace-only input rejection | [ ] PENDING | |
| **EC-03** | LocalStorage exception handling | [ ] PENDING | |
