# AI Interaction & Model Log

## 1. Model Selection Rationale
- **Gemini 3 Flash:** Chosen for the **Requirements Engineering** phase due to its high speed and ability to generate well-structured, logical PRD documents from scratch.
- **ChatGPT (GPT-4o):** Chosen for **System Architecture**. It excelled at translating the PRD into a modular component tree and defining the Tailwind design system.
- **Claude 3.5 Sonnet:** Chosen for the **Implementation** phase. Claude was selected for its superior ability to handle complex React state logic and its clean Tailwind CSS output.

## 2. Iteration Log
### Implementation Phase (Claude)
- **Initial Prompt:** Requested a single-file React MVP with a basic move-cycling button.
- **Issue Identified:** The cycling button provided a poor User Experience (UX) and the LocalStorage sync logic was slightly decoupled from the state update.
- **Engineering Correction:** I overrode the AI's suggestion and mandated a **Dropdown menu** for task movement. This forced the AI to implement more robust state mapping and improved the functional depth of the application.

### Testing Phase (Gemini)
- **Input:** Provided the final source code and requested a QA plan.
- **Logic:** Gemini correctly identified the edge cases for `localStorage` exceptions in incognito mode, which were subsequently validated in the source code's `try...catch` blocks.