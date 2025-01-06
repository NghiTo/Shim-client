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
import StudentRegister from "./components/Register/StudentRegister";
import StudentSetting from "./components/Student/Setting/StudentSetting";
import MainStudent from "./components/Student/MainStudent";
import QuizDetail from "./components/Teacher/QuizDetail/QuizDetail";
import PreStartQuiz from "./components/Student/PlayQuiz/PreStartQuiz";
import Report from "./components/Teacher/Report/Report";
import PlayQuiz from "./components/Student/PlayQuiz/PlayQuiz";

const Home = lazy(() => import("./pages/Home/Home"));
const Teacher = lazy(() => import("./pages/Teacher/Teacher"));
const Student = lazy(() => import("./pages/Student/Student"));

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const user = useSelector((state: RootState) => state.user);
  const isAuthenticated = Boolean(user?.id);
  const role = user?.role;
  const location = window.location.pathname;

  if (!isAuthenticated) {
    return <Navigate replace to="/" />;
  }
  if (location === "/delete-account") {
    return children;
  }
  if (role === "student" && !location.startsWith("/student")) {
    return <Navigate replace to="/student" />;
  }
  if (role === "teacher" && !location.startsWith("/teacher")) {
    return <Navigate replace to="/teacher" />;
  }

  return children;
};

const RejectedRoute = ({ children }: ProtectedRouteProps) => {
  const user = useSelector((state: RootState) => state.user);
  const isAuthenticated = Boolean(user?.id);
  const role = user?.role;

  if (isAuthenticated) {
    return <Navigate replace to={`/${role}`} />;
  }

  return children;
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
      {
        path: "/signup/student",
        element: <StudentRegister />,
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
    path: "/delete-account",
    element: (
      <ProtectedRoute>
        <DeleteAccount />
      </ProtectedRoute>
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
      {
        path: "/teacher/quiz/:quizId",
        element: <QuizDetail />,
      },
      {
        path: "/teacher/reports",
        element: <Report />,
      },
    ],
  },
  {
    path: "/teacher/create-assessment",
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
    errorElement: <ErrorFallBack />,
  },
  {
    path: "/teacher/create-quiz/:quizId",
    element: (
      <ProtectedRoute>
        <CreateQuiz />
      </ProtectedRoute>
    ),
    errorElement: <ErrorFallBack />,
  },
  {
    path: "/student",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<Loading />}>
          <Student />
        </Suspense>
      </ProtectedRoute>
    ),
    errorElement: <ErrorFallBack />,
    children: [
      {
        path: "",
        element: <MainStudent />,
      },
      {
        path: "/student/settings",
        element: <StudentSetting />,
      },
    ],
  },
  {
    path: "/student/join/quiz/:quizCode",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<Loading />}>
          <PreStartQuiz />
        </Suspense>
      </ProtectedRoute>
    ),
    errorElement: <ErrorFallBack />,
  },
  {
    path: "/student/start/quiz/:quizCode",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<Loading />}>
          <PlayQuiz />
        </Suspense>
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
