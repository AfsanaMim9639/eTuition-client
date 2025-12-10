import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import PrivateRoute from './PrivateRoute';
import RoleBasedRoute from './RoleBasedRoute';

// Public Pages
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import About from '../pages/About';
import Contact from '../pages/Contact';

// Tuition Pages
import AllTuitions from '../pages/tuition/AllTuitions';
import TuitionDetailsPage from '../pages/tuition/TuitionDetailsPage';

// Tutor Pages
import AllTutors from '../pages/tutor/AllTutors';
import TutorProfilePage from '../pages/tutor/TutorProfilePage';

// Student Dashboard Pages
import StudentDashboard from '../pages/dashboard/student/StudentDashboard';
import StudentDashboardHome from '../pages/dashboard/student/StudentDashboardHome'; 
import MyTuitions from '../pages/dashboard/student/MyTuitions';
import PostNewTuition from '../pages/dashboard/student/PostNewTuition';
import AppliedTutors from '../pages/dashboard/student/AppliedTutors';
import StudentPayments from '../pages/dashboard/student/StudentPayments';
import StudentProfile from '../pages/dashboard/student/StudentProfile';

// Tutor Dashboard Pages
import TutorDashboard from '../pages/dashboard/tutor/TutorDashboard';
import MyApplications from '../pages/dashboard/tutor/MyApplications';
import OngoingTuitions from '../pages/dashboard/tutor/OngoingTuitions';
import RevenueHistory from '../pages/dashboard/tutor/RevenueHistory';

// Admin Dashboard Pages
import AdminDashboard from '../pages/dashboard/admin/AdminDashboard';
import UserManagement from '../pages/dashboard/admin/UserManagement';
import TuitionManagement from '../pages/dashboard/admin/TuitionManagement';
import ReportsAnalytics from '../pages/dashboard/admin/ReportsAnalytics';

// Error Page
import ErrorPage from '../components/shared/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/contact',
        element: <Contact />
      },
      {
        path: '/tuitions',
        element: <AllTuitions />
      },
      {
        path: '/tuitions/:id',
        element: <TuitionDetailsPage />
      },
      {
        path: '/tutors',
        element: <AllTutors />
      },
      {
        path: '/tutors/:id',
        element: <TutorProfilePage />
      }
    ]
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      // Student Routes - UPDATED WITH NESTED STRUCTURE
      {
        path: 'student',
        element: (
          <RoleBasedRoute allowedRoles={['student']}>
            <StudentDashboard />
          </RoleBasedRoute>
        ),
        children: [
          {
            index: true, // Renders at /dashboard/student
            element: <StudentDashboardHome />
          },
          {
            path: 'tuitions',
            element: <MyTuitions />
          },
          {
            path: 'post-tuition',
            element: <PostNewTuition />
          },
          {
            path: 'tuition/:id/applications',
            element: <AppliedTutors />
          },
          {
            path: 'payments',
            element: <StudentPayments />
          },
          {
            path: 'profile',
            element: <StudentProfile />
          }
        ]
      },

      // Tutor Routes
      {
        path: 'tutor',
        element: (
          <RoleBasedRoute allowedRoles={['tutor']}>
            <TutorDashboard />
          </RoleBasedRoute>
        )
      },
      {
        path: 'tutor/applications',
        element: (
          <RoleBasedRoute allowedRoles={['tutor']}>
            <MyApplications />
          </RoleBasedRoute>
        )
      },
      {
        path: 'tutor/ongoing',
        element: (
          <RoleBasedRoute allowedRoles={['tutor']}>
            <OngoingTuitions />
          </RoleBasedRoute>
        )
      },
      {
        path: 'tutor/revenue',
        element: (
          <RoleBasedRoute allowedRoles={['tutor']}>
            <RevenueHistory />
          </RoleBasedRoute>
        )
      },

      // Admin Routes
      {
        path: 'admin',
        element: (
          <RoleBasedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </RoleBasedRoute>
        )
      },
      {
        path: 'admin/users',
        element: (
          <RoleBasedRoute allowedRoles={['admin']}>
            <UserManagement />
          </RoleBasedRoute>
        )
      },
      {
        path: 'admin/tuitions',
        element: (
          <RoleBasedRoute allowedRoles={['admin']}>
            <TuitionManagement />
          </RoleBasedRoute>
        )
      },
      {
        path: 'admin/reports',
        element: (
          <RoleBasedRoute allowedRoles={['admin']}>
            <ReportsAnalytics />
          </RoleBasedRoute>
        )
      }
    ]
  }
]);

export default router;