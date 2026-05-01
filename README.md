# Eisenhower Matrix Task Prioritizer (AI-Orchestrated SDLC)

## Overview
A high-performance React/Tailwind CSS application designed to help users prioritize tasks using the Eisenhower Matrix methodology. This project was developed using a multi-model AI orchestration strategy to demonstrate advanced Software Development Life Cycle (SDLC) management.

## Architecture Summary
- **Frontend:** React (Vite)
- **Styling:** Tailwind CSS
- **Icons:** Lucide-React
- **Persistence:** Browser LocalStorage API
- **Design Pattern:** Component-based architecture with centralized state management.

## AI Models and Tools Used
- **Gemini:** Project Planning & Requirements Engineering. Used for its strength in structured, comprehensive documentation.
- **ChatGPT:** System & UI Design. Used to define component hierarchy and Tailwind design rationale based on the Gemini requirements.
- **Claude 3.5 Sonnet:** Implementation & Code Generation. Selected for its superior React/Tailwind code accuracy.

## AI Engineering Analysis
### Strengths and Limitations
The multi-model approach allowed for a strong "separation of concerns." Gemini provided a rigid PRD, which served as a ground truth for ChatGPT’s design. Claude excelled at the initial UI build but required specific engineering intervention regarding state-sync logic and user experience flows.

### Prompting Strategies
- **Iterative Refinement:** Rather than asking for a "finished app," I prompted for a "lightweight MVP" first, then intentionally introduced a correction phase to improve the UX (changing a basic 'Move' button to an explicit Dropdown selector).
- **The "Context Injection" Method:** Feeding the output of the Planning phase directly into the Design phase ensured 100% requirements traceability across different AI models.

## Engineering Reflection
### What AI Improved vs. Degraded
- **Improved:** Speed of scaffolding and CSS styling. The Tailwind configuration and component grid were generated almost instantly.
- **Degraded:** Logical nuance. The AI initially suggested a simple "cycling" move button which didn't meet the high-usability standard I intended, requiring a manual logic override.
- **Difference Without AI:** Without AI, the SDLC documentation (PRD, Architecture, Testing Plan) would have taken significantly longer to draft. However, I would have spent less time "auditing" the state-management logic for subtle bugs.

## AI Interaction Examples
- **Successful Correction:** I identified a flaw where the AI did not provide a direct way to choose a target quadrant. I overrode the AI's suggestion and mandated a dropdown implementation to improve the user experience. (See `/screenshots/4_AI_Correction.png`).

## 🚀 How to Run Locally
1. Clone the repository:
   `git clone https://github.com/vrao1600/eisenhower-matrix-pro.git`
2. Install dependencies:
   `npm install`
3. Start the development server:
   `npm run dev`