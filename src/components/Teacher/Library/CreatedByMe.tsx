import { Tabs, TabsProps } from "antd";
import Published from "./Published";
import Draft from "./Draft";
import { useQuery } from "react-query";
import { getAllQuizzes } from "../../../apis/quiz.api";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

const CreatedByMe = () => {
  const user = useSelector((state: RootState) => state.user);
  const { data: published } = useQuery({
    queryKey: "published",
    queryFn: () => getAllQuizzes({ status: "finished", userId: user.id }),
  });

  const { data: draft } = useQuery({
    queryKey: "draft",
    queryFn: () => getAllQuizzes({ status: "unFinished", userId: user.id }),
  });

  const tab: TabsProps["items"] = [
    {
      key: "1",
      label: `Published (${published?.length})`,
      children: <Published />,
    },
    {
      key: "2",
      label: `Draft (${draft?.length})`,
      children: <Draft />,
    },
  ];

  return (
    <div>
      <Tabs
        defaultActiveKey="1"
        items={tab}
        className="custom-tabs rounded-b-xl w-full Shim"
        tabBarGutter={40}
      />
    </div>
  );
};

export default CreatedByMe;
