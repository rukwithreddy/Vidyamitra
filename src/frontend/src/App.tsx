import { RouterProvider, createRouter, createRootRoute, createRoute, Outlet } from '@tanstack/react-router';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Resume from './pages/Resume';
import Roadmap from './pages/Roadmap';
import Quiz from './pages/Quiz';
import Progress from './pages/Progress';
import MockInterview from './pages/MockInterview';
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
    window.location.href = '/dashboard';
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
    dashboardRoute,
    resumeRoute,
    roadmapRoute,
    quizRoute,
    progressRoute,
    mockInterviewRoute,
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
