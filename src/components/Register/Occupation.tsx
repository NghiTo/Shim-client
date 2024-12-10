import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMutation } from "react-query";
import { createUser } from "../../apis/user.api";
import { setUser } from "../../store/userSlice";

const Occupation = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mutate: create } = useMutation(createUser, {
    onSuccess: (res) => {
      dispatch(
        setUser({
          id: res.data.id,
          role: res.data.role,
          schoolId: res.data.schoolId,
          avatarUrl: res.data.avatarUrl,
          isAuthUser: res.data.password ? false : true,
        })
      );
      navigate(`/${res.data.role}`);
    },
  });

  const createTeacher = () => {
    if (searchParams.get("userId")) {
      create({
        id: searchParams.get("userId") as string,
        email: searchParams.get("email") as string,
        role: "teacher",
        firstName: searchParams.get("firstName") as string,
        lastName: searchParams.get("lastName") as string,
        avatarUrl: searchParams.get("avatarUrl") as string,
      });
      return;
    }
    navigate("/signup/teacher");
  };

  const createStudent = () => {
    if (searchParams.get("userId")) {
      create({
        id: searchParams.get("userId") as string,
        email: searchParams.get("email") as string,
        role: "student",
        firstName: searchParams.get("firstName") as string,
        lastName: searchParams.get("lastName") as string,
        avatarUrl: searchParams.get("avatarUrl") as string,
      });
      return;
    }
    navigate("/signup/student");
  };

  return (
    <div className="bg-gray-100 w-2/3 min-h-full mx-auto rounded-lg flex flex-col max-md:w-full px-8">
      <h1 className="text-center text-2xl py-8 font-semibold">I am</h1>
      <div className="flex flex-row max-md:flex-col gap-6 pb-8">
        <div
          onClick={createStudent}
          className="w-1/3 max-md:w-full flex flex-col max-md:flex-row max-md:px-2 gap-4 items-center rounded-md text-center px-8 py-4 border-gray-400 cursor-pointer border hover:shadow-xl"
        >
          <img
            src="/src/assets/signup-student.png"
            alt="Student"
            className="w-1/2 max-md:w-1/5 object-cover"
          />
          <div className="flex flex-col max-md:text-left">
            <h1 className="text-xl font-semibold">a student</h1>
            <p>to participate in fun classroom activities</p>
          </div>
        </div>
        <div
          onClick={createTeacher}
          className="w-1/3 max-md:w-full max-md:flex-row max-md:px-2 flex flex-col gap-4 items-center rounded-md text-center px-8 py-4 border-gray-400 cursor-pointer border hover:shadow-xl"
        >
          <img
            src="/src/assets/signup-teacher.png"
            alt="Teacher"
            className="w-1/2 object-cover max-md:w-1/5"
          />
          <div className="flex flex-col max-md:text-left">
            <h1 className="text-xl font-semibold">a teacher</h1>
            <p>to instruct, engage, and assess my students</p>
          </div>
        </div>
        <div className="w-1/3 max-md:w-full max-md:flex-row max-md:px-2 flex flex-col gap-4 items-center rounded-md text-center px-8 py-4 border-gray-400 cursor-pointer border hover:shadow-xl">
          <img
            src="/src/assets/signup-admin.png"
            alt=""
            className="w-1/2 object-cover max-md:w-1/5"
          />
          <div className="flex flex-col max-md:text-left">
            <h1 className="text-xl font-semibold">an administrator</h1>
            <p>instructional coach, curriculum or school lead</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Occupation;
