import { Tabs, TabsProps } from "antd";
import Published from "./Published";
import Draft from "./Draft";

const tab: TabsProps["items"] = [
  {
    key: "1",
    label: "Published",
    children: <Published />,
  },
  {
    key: "2",
    label: "Draft",
    children: <Draft />,
  },
];

const CreatedByMe = () => {
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
