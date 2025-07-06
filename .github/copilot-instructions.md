## Copilot Instructions: Wedding Timeline (Azure Static Web Apps)

### Project Summary
Build and maintain a visually engaging, mobile-first, accessible wedding timeline web app for Lina & Thor. The app is deployed on Azure Static Web Apps, uses Next.js (TypeScript), and Tailwind CSS. It is public, non-interactive (static), and designed for wedding guests of all ages.

### Audience & UX Priorities
- Guests (varied tech familiarity); must be easy, clear, and mobile-friendly
- Instantly see event times, locations, and details
- High accessibility: readable, keyboard/screen reader friendly, high contrast

### Technical Stack & Deployment
- Next.js 14 (TypeScript), Tailwind CSS
- Azure Static Web Apps (Free tier, no backend/serverless required)
- GitHub Actions for CI/CD
- All secrets managed via environment variables or Azure portal (never hardcoded)

### Security & Secret Management
- Never hardcode API keys, secrets, or sensitive data
- Use environment variables and Azure Static Web Apps config for runtime secrets
- No .env files or secrets in repo
- No client secrets exposed in frontend code

**Security Checklist:**
- [ ] No hardcoded secrets, API keys, or sensitive data in any code or config
- [ ] No .env files or secret values committed to the repo
- [ ] All runtime secrets must use Azure Static Web Apps config or environment variables
- [ ] Never expose secrets or sensitive config in frontend code (browser)
- [ ] Use Azure Key Vault or GitHub Secrets for CI/CD if needed

### Accessibility & Mobile-First
- Large, legible fonts; high color contrast
- All interactive elements must be keyboard accessible
- Use ARIA labels/roles and descriptive alt text for icons
- Responsive: vertical timeline on mobile, adaptive on desktop

### Code Style & Modularity
- Use component-based design (React/Next.js)
- Timeline receives event data from a single source (data file or prop)
- Use Tailwind CSS for styling; prefer utility classes over custom CSS
- Use SVG or inline SVG icons for scalability
- Keep code clean, readable, and maintainable

### Functionality Requirements
- Timeline with event cards/bubbles, icons, and alternating layout
- Filtering: All, Next, Upcoming events
- Highlight current/next event based on time
- Expandable event cards for more info (location, map link, notes)
- Location links open Google Maps in a new tab
- Quick links for WhatsApp group and board games app

### "Do Not" Rules
- Do not add unnecessary files, boilerplate, or unused code
- Do not include phone numbers or personal info in code or docs
- Do not add backend/serverless code unless explicitly requested
- Do not use deprecated or unsupported libraries

### Example Copilot Prompts
- "Add a new event to the timeline for Friday evening."
- "Improve accessibility for the timeline navigation."
- "Update the WhatsApp group link."
- "Remove debugging code from WeddingTimeline.tsx."
- "Deploy the latest build to Azure Static Web Apps."

### Keywords for Copilot
Azure Static Web Apps, Next.js wedding timeline, Tailwind CSS, accessible timeline, event card, mobile-first, GitHub Actions deploy, SVG icons, public static site, no backend

---

## Action Workflow & Oversight (Context Engineering)

For any significant or destructive action (e.g., file removal, refactor, or bulk update):

1. **Planning**
   - Clearly outline the intended action, rationale, and expected impact.
   - List files, features, or areas affected.

2. **In-Progress Oversight**
   - Maintain notes on progress, checks, and any blockers or unexpected findings.
   - If possible, log intermediate results or decisions.

3. **Final Action & Approval**
   - Summarize what was done and what is ready for removal or change.
   - For destructive actions, require explicit user approval before proceeding (e.g., "Approve file removal").
   - After approval, perform the action and confirm success.

**This workflow ensures safe, auditable, and maintainable changes, and should be followed for all major updates or cleanups.**

---

**Summary:**
Keep the app simple, beautiful, and guest-friendly. Prioritize accessibility, security, and maintainability. All code and documentation must be Azure-ready and free of sensitive information.
