import { Button, Select } from "antd";
import { FaArrowLeft } from "react-icons/fa6";
import { Outlet, useNavigate } from "react-router-dom";

const CreateQuiz = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-white border-b border-gray-400 py-3 px-4 flex flex-row">
        <div className="flex flex-row gap-4">
          <div
            onClick={() => navigate(-1)}
            className="rounded-sm bg-gray-200 w-fit p-2 cursor-pointer"
            title="Back"
          >
            <FaArrowLeft />
          </div>
          <Select
            defaultValue="multipleChoice"
            title="Point"
            style={{ width: 140 }}
            options={[
              { value: "multipleChoice", label: "Multiple choice" },
              { value: "2", label: "2 points" },
              { value: "3", label: "3 points" },
              { value: "4", label: "4 points" },
            ]}
          ></Select>
        </div>
        <div className="ml-auto flex flex-row gap-2">
          <Select
            defaultValue="1"
            title="Point"
            style={{ width: 100 }}
            options={[
              { value: "1", label: "1 point" },
              { value: "2", label: "2 points" },
              { value: "3", label: "3 points" },
              { value: "4", label: "4 points" },
            ]}
          ></Select>
          <Select
            defaultValue="10"
            title="Time"
            style={{ width: 70 }}
            options={[
              { value: "10", label: "10s" },
              { value: "20", label: "20s" },
              { value: "30", label: "30s" },
              { value: "60", label: "1m" },
            ]}
          ></Select>
          <Button type="primary">Save question</Button>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default CreateQuiz;
