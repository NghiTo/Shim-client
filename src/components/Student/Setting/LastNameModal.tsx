import { Input, Modal } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { UserUpdate } from "../../../types/user.type";
import { updateUser } from "../../../apis/user.api";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { memo, useState } from "react";

interface LastNameModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  lastName: string;
}

const LastNameModal: React.FC<LastNameModalProps> = ({
  open,
  setOpen,
  lastName,
}) => {
  const user = useSelector((state: RootState) => state.user);
  const queryClient = useQueryClient();
  const [value, setValue] = useState(lastName);
  const { mutate, isLoading } = useMutation(
    (data: UserUpdate) => updateUser(user.id, data),
    {
      onSuccess: () => {
        toast.success("Last name updated successfully");
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
      onOk={() => mutate({ lastName: value })}
    >
      <div>
        <Input
          type="text"
          value={value}
          defaultValue={lastName}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </Modal>
  );
};

export default memo(LastNameModal);
