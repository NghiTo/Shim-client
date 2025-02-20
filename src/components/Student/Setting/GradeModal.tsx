import { message, Modal, Select } from "antd";
import { memo, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { UserUpdate } from "../../../types/user.type";
import { updateUser } from "../../../apis/user.api";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { gradeOptions } from "../../../constants/constants";
import { onError } from "../../../constants/onError";

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
        message.success("Grade updated successfully");
        queryClient.invalidateQueries(["studentProfile", user.id]);
        setOpen(false);
      },
      onError: onError,
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
          options={gradeOptions}
        ></Select>
      </div>
    </Modal>
  );
};

export default memo(GradeModal);
