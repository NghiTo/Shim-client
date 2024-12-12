import { Outlet } from "react-router-dom";
import StudentHeader from "../../components/Student/StudentHeader";

const Student = () => {
  return (
    <div className="min-h-screen">
      <StudentHeader />
      <Outlet/>
    </div>
  );
};

export default Student;
