import { Input, Modal } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { UserUpdate } from "../../../types/user.type";
import { updateUser } from "../../../apis/user.api";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { memo, useState } from "react";

interface FirstNameModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  firstName: string;
}

const FirstNameModal: React.FC<FirstNameModalProps> = ({
  open,
  setOpen,
  firstName,
}) => {
  const user = useSelector((state: RootState) => state.user);
  const queryClient = useQueryClient();
  const [value, setValue] = useState(firstName);
  const { mutate, isLoading } = useMutation(
    (data: UserUpdate) => updateUser(user.id, data),
    {
      onSuccess: () => {
        toast.success("First name updated successfully");
        queryClient.invalidateQueries(["studentProfile", user.id]);
        setOpen(false);
      },
    }
  );
  return (
    <Modal
      title="First Name"
      onCancel={() => setOpen(false)}
      open={open}
      confirmLoading={isLoading}
      onOk={() => mutate({ firstName: value })}
    >
      <div>
        <Input
          type="text"
          value={value}
          defaultValue={firstName}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </Modal>
  );
};

export default memo(FirstNameModal);