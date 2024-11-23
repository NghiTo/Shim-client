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
import MultipleChoice from "./components/Assessment/MultipleChoice";
import CreateQuiz from "./components/Assessment/CreateQuiz";

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

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <Home />
      </Suspense>
    ),
    errorElement: <ErrorFallBack />,
  },
  {
    path: "/signup",
    element: <Register />,
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
    element: <Login />,
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
    ],
  },
  {
    path: "/create-assessment",
    element: (
      <ProtectedRoute>
        <Assessment />
      </ProtectedRoute>
    ),
    errorElement: <ErrorFallBack />,
  },
  {
    path: "/create-quiz",
    element: (
      <ProtectedRoute>
        <CreateQuiz />
      </ProtectedRoute>
    ),
    errorElement: <ErrorFallBack />,
    children: [
      {
        path: "/create-quiz/multiple-choice",
        element: <MultipleChoice />,
      },
    ],
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
