import { MdPersonAddAlt } from "react-icons/md";
import TeacherItem from "./TeacherItem";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useState } from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import { getTeachers } from "../../../apis/teacher.api";
import { Teacher } from "../../../types/teacher.type";
import { Skeleton } from "antd";
import { findSchoolById } from "../../../apis/school.api";
import { School } from "../../../types/school.type";
import { RiEmotionSadLine } from "react-icons/ri";

const District = () => {
  const user = useSelector((state: RootState) => state.user);

  const [pageSize] = useState(9);

  const { data: res } = useQuery({
    queryKey: "school",
    queryFn: () => findSchoolById(user.schoolId),
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery(
    ["teachers", user.schoolId],
    ({ pageParam = 1 }) => getTeachers(pageParam, pageSize, user.schoolId),
    {
      getNextPageParam: (lastPage) => {
        const { pagination } = lastPage;
        return pagination.currentPage < pagination.totalPages
          ? pagination.currentPage + 1
          : undefined;
      },
    }
  );

  if (isError) {
    return (
      <div className="bg-gray-100 p-8 h-full flex justify-center items-center">
        <p className="text-center text-lg text-gray-700">
          Something went wrong...
        </p>
      </div>
    );
  }

  const totalTeachers = data?.pages.reduce(
    (total, page) => total + page.data.length,
    0
  );

  return (
    <div className="bg-gray-100 p-8 max-md:py-8 max-md:px-0 max-md:min-h-screen h-full flex flex-col gap-2">
      <h1 className="text-2xl font-semibold max-md:ml-2">
        {!isLoading ? (
          (res?.data as School)?.name
        ) : (
          <Skeleton.Button className="w-48" active></Skeleton.Button>
        )}
      </h1>
      <div className="rounded-xl bg-white p-8 max-md:p-4 flex flex-col gap-4 max-md:gap-2">
        <div className="flex flex-row w-full">
          <h2 className="text-gray-500 font-medium text-lg">
            Teachers in my school
          </h2>
          <button className="flex flex-row gap-2 ml-auto items-center px-2 py-1 rounded-md border border-gray-400 hover:bg-gray-200 transition-all ease-in-out">
            <MdPersonAddAlt className="text-lg" />
            <p>Invite teachers</p>
          </button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-3 gap-2 max-md:grid-cols-1">
            {Array.from({ length: pageSize }).map((_, index) => (
              <Skeleton.Button
                key={index}
                active
                shape="square"
                className="w-full h-20"
              />
            ))}
          </div>
        ) : totalTeachers === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 py-8">
            <p className="text-gray-500 text-lg font-medium">
              There are no other teachers in your school.
            </p>
            <RiEmotionSadLine className="text-6xl text-gray-300" />
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2 max-md:grid-cols-1">
            {data?.pages.map((page) =>
              page.data.map((teacher: Teacher) => (
                <TeacherItem
                  key={teacher.id}
                  id={teacher.id}
                  firstName={teacher.firstName}
                  lastName={teacher.lastName}
                  avatarUrl={teacher.avatarUrl}
                  subject={teacher.subject}
                />
              ))
            )}
          </div>
        )}

        {hasNextPage && (
          <p
            onClick={() => fetchNextPage()}
            className="text-sm ml-auto hover:underline cursor-pointer text-gray-500"
          >
            {isFetchingNextPage ? "Loading..." : "Show More"}
          </p>
        )}
      </div>
    </div>
  );
};

export default District;
