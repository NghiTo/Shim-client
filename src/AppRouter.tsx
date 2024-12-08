/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter, Navigate } from "react-router-dom";
import ErrorFallBack from "./pages/Error/ErrorFallBack";
import { lazy, Suspense } from "react";
import Loading from "./components/Loading/Loading";
import NotFound from "./pages/Error/NotFound";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import RegisterBody from "./components/Register/RegisterBody";
import Occupation from "./components/Register/Occupation";
import TeacherRegister from "./components/Register/TeacherRegister";
import Profile from "./components/Teacher/Profile/Profile";
import Setting from "./components/Teacher/Setting/Setting";
import DeleteAccount from "./pages/DeleteAccount/DeleteAccount";
import District from "./components/Teacher/District/District";
import Assessment from "./pages/Assessment/Assessment";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import CreateQuiz from "./components/Assessment/CreateQuiz";
import Library from "./components/Teacher/Library/MyLibrary";
import CreatedByMe from "./components/Teacher/Library/CreatedByMe";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ForgotPassword/ResetPassword";
import MainTeacher from "./components/Teacher/MainTeacher";
import Search from "./pages/Search/Search";

const Home = lazy(() => import("./pages/Home/Home"));
const Teacher = lazy(() => import("./pages/Teacher/Teacher"));

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const user = useSelector((state: RootState) => state.user);
  const isAuthenticated = Boolean(user?.id);

  return isAuthenticated ? children : <Navigate replace to="/login" />;
};

const RejectedRoute = ({ children }: ProtectedRouteProps) => {
  const user = useSelector((state: RootState) => state.user);
  const isAuthenticated = Boolean(user?.id);
  return isAuthenticated ? <Navigate replace to="/teacher" /> : children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <RejectedRoute>
          <Home />
        </RejectedRoute>
      </Suspense>
    ),
    errorElement: <ErrorFallBack />,
  },
  {
    path: "/signup",
    element: (
      <RejectedRoute>
        <Register />
      </RejectedRoute>
    ),
    errorElement: <ErrorFallBack />,
    children: [
      {
        path: "",
        element: <RegisterBody />,
      },
      {
        path: "/signup/occupation",
        element: <Occupation />,
      },
      {
        path: "/signup/teacher",
        element: <TeacherRegister />,
      },
    ],
  },
  {
    path: "/login",
    element: (
      <RejectedRoute>
        <Login />
      </RejectedRoute>
    ),
    errorElement: <ErrorFallBack />,
  },
  {
    path: "/forgot-password",
    element: (
      <RejectedRoute>
        <ForgotPassword />
      </RejectedRoute>
    ),
    errorElement: <ErrorFallBack />,
  },
  {
    path: "/reset-password/:token",
    element: (
      <RejectedRoute>
        <ResetPassword />
      </RejectedRoute>
    ),
    errorElement: <ErrorFallBack />,
  },
  {
    path: "/teacher",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<Loading />}>
          <Teacher />
        </Suspense>
      </ProtectedRoute>
    ),
    errorElement: <ErrorFallBack />,
    children: [
      {
        path: "",
        element: <MainTeacher />,
      },
      {
        path: "/teacher/profile/:profileId",
        element: <Profile />,
      },
      {
        path: "/teacher/settings",
        element: <Setting />,
      },
      {
        path: "/teacher/district",
        element: <District />,
      },
      {
        path: "/teacher/library",
        element: <Library />,
        children: [
          {
            path: "/teacher/library/created-by-me",
            element: <CreatedByMe />,
          },
        ],
      },
    ],
  },
  {
    path: "/create-assessment",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<Loading />}>
          <Assessment />
        </Suspense>
      </ProtectedRoute>
    ),
    errorElement: <ErrorFallBack />,
  },
  {
    path: "/teacher/search/:query",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<Loading />}>
          <Search />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: "/create-quiz/:quizId",
    element: (
      <ProtectedRoute>
        <CreateQuiz />
      </ProtectedRoute>
    ),
    errorElement: <ErrorFallBack />,
  },
  {
    path: "/delete-account",
    element: (
      <ProtectedRoute>
        <DeleteAccount />
      </ProtectedRoute>
    ),
    errorElement: <ErrorFallBack />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
