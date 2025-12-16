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
import StudentMessages from '../pages/dashboard/student/Messages';
import MyReviews from '../pages/dashboard/student/MyReviews';
import StudentSchedule from '../pages/dashboard/student/MySchedule';
import Checkout from '../pages/dashboard/student/Checkout';
// Tutor Dashboard Pages
import TutorDashboard from '../pages/dashboard/tutor/TutorDashboard';
import TutorDashboardHome from '../pages/dashboard/tutor/TutorDashboardHome';
import MyApplications from '../pages/dashboard/tutor/MyApplications';
import OngoingTuitions from '../pages/dashboard/tutor/OngoingTuitions';
import RevenueHistory from '../pages/dashboard/tutor/RevenueHistory';
import TutorProfile from '../pages/dashboard/tutor/TutorProfile';
import TutorMessages from '../pages/dashboard/tutor/Messages';
import TutorSchedule from '../pages/dashboard/tutor/MySchedule';

// Admin Dashboard Pages
import AdminDashboard from '../pages/dashboard/admin/AdminDashboard';
import AdminDashboardHome from '../pages/dashboard/admin/AdminDashboardHome';
import UserManagement from '../pages/dashboard/admin/UserManagement';
import TuitionManagement from '../pages/dashboard/admin/TuitionManagement';
import ReportsAnalytics from '../pages/dashboard/admin/ReportsAnalytics';
import AdminMessages from '../pages/dashboard/admin/Messages';
import AdminTuitionApproval from '../pages/dashboard/admin/AdminTuitionApproval'; // 🆕 NEW

// Notification Page (shared for all roles)
import Notifications from '../pages/dashboard/Notifications';

// Error Page
import ErrorPage from '../components/shared/ErrorPage';
import ProfileTab from '../components/dashboard/admin/tabs/ProfileTab';
import ProfileRedirect from '../components/ProfileRedirect';

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
      },
      {
        path: '/profile',
        element: (
          <PrivateRoute>
            {/* Create a ProfileRedirect component or handle redirect */}
            <ProfileRedirect />
          </PrivateRoute>
        )
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
      // Student Routes
      {
        path: 'student',
        element: (
          <RoleBasedRoute allowedRoles={['student']}>
            <StudentDashboard />
          </RoleBasedRoute>
        ),
        children: [
          {
            index: true,
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
            path: 'edit-tuition/:id',
            element: <PostNewTuition />
          },
          {
            path: 'applications',
            element: <AppliedTutors />
          },
          {
            path: 'payments',
            element: <StudentPayments />
          },
          {
            path: 'checkout',
            element: <Checkout />
          },
          {
            path: 'profile',
            element: <StudentProfile />
          },
          {
            path: 'my-reviews',
            element: <MyReviews />
          },
          {
            path: 'messages',
            element: <StudentMessages />
          },
          {
            path: 'notifications',
            element: <Notifications />
          },
          {
            path: 'schedule',
            element: <StudentSchedule />
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
        ),
        children: [
          {
            index: true,
            element: <TutorDashboardHome />
          },
          {
            path: 'applications',
            element: <MyApplications />
          },
          {
            path: 'ongoing',
            element: <OngoingTuitions />
          },
          {
            path: 'revenue',
            element: <RevenueHistory />
          },
          {
            path: 'profile',
            element: <TutorProfile />
          },
          {
            path: 'messages',
            element: <TutorMessages />
          },
          {
            path: 'notifications',
            element: <Notifications />
          },
          {
            path: 'schedule',
            element: <TutorSchedule />
          }
        ]
      },

      // Admin Routes
      {
        path: 'admin',
        element: (
          <RoleBasedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </RoleBasedRoute>
        ),
        children: [
          {
            index: true,
            element: <AdminDashboardHome />
          },
          {
            path: 'users',
            element: <UserManagement />
          },
          {
            path: 'tuitions',
            element: <TuitionManagement />
          },
          // 🆕 NEW: Admin Tuition Approval Route
          {
            path: 'tuition-approval',
            element: <AdminTuitionApproval />
          },
          {
            path: 'reports',
            element: <ReportsAnalytics />
          },
          {
            path: 'messages',
            element: <AdminMessages />
          },
          {
            path: 'notifications',
            element: <Notifications />
          },
          {
          path: 'profile',
          element: <ProfileTab />
          }
        ]
      }
    ]
  }
]);

export default router;