import { Modal, Select } from "antd";
import { memo, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { UserUpdate } from "../../../types/user.type";
import { updateUser } from "../../../apis/user.api";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

interface GradeModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  grade?: string;
}

const GradeModal: React.FC<GradeModalProps> = ({ open, setOpen, grade }) => {
  const [value, setValue] = useState(grade);
  const queryClient = useQueryClient();
  const user = useSelector((state: RootState) => state.user);
  const { mutate, isLoading } = useMutation(
    (data: UserUpdate) => updateUser(user.id, data),
    {
      onSuccess: () => {
        toast.success("Grade updated successfully");
        queryClient.invalidateQueries(["studentProfile", user.id]);
        setOpen(false);
      },
    }
  );
  return (
    <Modal
      onCancel={() => setOpen(false)}
      open={open}
      title="Grade"
      confirmLoading={isLoading}
      onOk={() => mutate({ grade: value })}
    >
      <div>
        <Select
          defaultValue={grade}
          className="w-full"
          onChange={(value) => {
            setValue(value);
          }}
          options={[
            { value: "1st", label: "1st" },
            { value: "2nd", label: "2nd" },
            { value: "3rd", label: "3rd" },
            { value: "4th", label: "4th" },
            { value: "5th", label: "5th" },
            { value: "6th", label: "6th" },
            { value: "7th", label: "7th" },
            { value: "8th", label: "8th" },
            { value: "9th", label: "9th" },
            { value: "10th", label: "10th" },
            { value: "11th", label: "11th" },
            { value: "12th", label: "12th" },
          ]}
        ></Select>
      </div>
    </Modal>
  );
};

export default memo(GradeModal);
