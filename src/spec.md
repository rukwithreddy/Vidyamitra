# Specification

## Summary
**Goal:** Create a frontend-only educational platform (VidyaMitra) with email-based OTP authentication, dashboard navigation, resume upload, job roadmap generation, topic quizzes, progress tracking, and voice-based mock interviews.

**Planned changes:**
- Implement email-based OTP authentication with login/register pages and protected routes redirecting to dashboard
- Create dashboard layout with navbar, sidebar (links: Dashboard, Resume, Roadmap, Quiz, Progress), and main content area using plain CSS
- Build resume upload page with file input, upload button, success message, and analysis result placeholder
- Develop job role roadmap page with role input, roadmap generation showing topics/subtopics with status tracking (not started, in progress, completed), persisted in localStorage
- Create topic quiz module with topic input, dummy questions, answer marking, and score display
- Build progress page showing roadmap completion percentage, quizzes taken count, and last activity from localStorage
- Implement voice-based mock interview page with microphone recording, audio playback, and recording state indicators
- Use JSX format for all components with clear comments and descriptive naming for readability
- Apply custom color palette consistently: primary deep blue #1e3a8a, secondary sky blue #38bdf8, accent green #22c55e, background light gray #f8fafc, text dark slate #0f172a
- Organize frontend with folder structure: components, pages, services, routes, context, styles directories
- Create reusable navbar and sidebar components, centralized API service file
- Use localStorage for data persistence (no backend)

**User-visible outcome:** Users can register/login with email OTP, navigate a dashboard with sidebar, upload resumes, generate job roadmaps with progress tracking, take topic quizzes, view their progress statistics, and practice voice-based mock interviews—all running in the browser with localStorage persistence.
