import { RouterProvider, createRouter, createRootRoute, createRoute, Outlet } from '@tanstack/react-router';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';
import Resume from './pages/Resume';
import Roadmap from './pages/Roadmap';
import Quiz from './pages/Quiz';
import Progress from './pages/Progress';
import MockInterview from './pages/MockInterview';
import Profile from './pages/Profile';
import ProfileBuilder from './pages/ProfileBuilder';
import TemplateSelection from './pages/TemplateSelection';
import ResumeReady from './pages/ResumeReady';
import ResumeAnalysis from './pages/ResumeAnalysis';
import DomainSelection from './pages/DomainSelection';
import RoleSelection from './pages/RoleSelection';
import Jobs from './pages/Jobs';
import DashboardLayout from './components/DashboardLayout';
import './styles/variables.css';
import './styles/global.css';

/**
 * Root Layout Component
 * Wraps all routes with authentication context
 */
function RootLayout() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}

/**
 * Protected Layout Component
 * Redirects to login if not authenticated
 */
function ProtectedLayout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    window.location.href = '/login';
    return null;
  }

  return <Outlet />;
}

/**
 * Index Route Component
 * Redirects to appropriate page based on auth status
 */
function IndexRedirect() {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    window.location.href = '/home';
  } else {
    window.location.href = '/login';
  }
  return null;
}

// Create root route
const rootRoute = createRootRoute({
  component: RootLayout,
});

// Public routes
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: Login,
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/register',
  component: Register,
});

// Protected routes wrapper
const protectedRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'protected',
  component: ProtectedLayout,
});

const dashboardRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: '/dashboard',
  component: Dashboard,
});

const homeRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: '/home',
  component: Landing,
});

const resumeRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: '/resume',
  component: Resume,
});

const roadmapRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: '/roadmap',
  component: Roadmap,
});

const quizRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: '/quiz',
  component: Quiz,
});

const progressRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: '/progress',
  component: Progress,
});

const mockInterviewRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: '/mock-interview',
  component: MockInterview,
});

const profileBuilderRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: '/profile-builder',
  component: ProfileBuilder,
});

const profileRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: '/my-profile',
  component: Profile,
});

const templateSelectionRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: '/template-selection',
  component: TemplateSelection,
});

const resumeReadyRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: '/resume-ready',
  component: ResumeReady,
});

const resumeAnalysisRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: '/resume-analysis',
  component: ResumeAnalysis,
});

const domainSelectionRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: '/domain-selection',
  component: DomainSelection,
});

const roleSelectionRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: '/role-selection',
  component: RoleSelection,
});

const jobsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: '/jobs',
  component: Jobs,
});

// Index route redirects to dashboard
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: IndexRedirect,
});

// Create route tree
const routeTree = rootRoute.addChildren([
  loginRoute,
  registerRoute,
  indexRoute,
  protectedRoute.addChildren([
    homeRoute,
    dashboardRoute,
    resumeRoute,
    profileRoute,
    profileBuilderRoute,
    templateSelectionRoute,
    resumeReadyRoute,
    resumeAnalysisRoute,
    domainSelectionRoute,
    roleSelectionRoute,
    roadmapRoute,
    quizRoute,
    progressRoute,
    mockInterviewRoute,
    jobsRoute,
  ]),
]);

// Create router instance
const router = createRouter({ routeTree });

/**
 * Main App Component
 * Sets up routing for the entire application
 */
function App() {
  return <RouterProvider router={router} />;
}

export default App;
