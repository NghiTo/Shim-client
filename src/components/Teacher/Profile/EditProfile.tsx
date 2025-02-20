import { Button, Form, Input, message, Modal, Select } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../store/userSlice";
import { RootState } from "../../../store/store";
import { updateSchema } from "../../../schemas/userSchema";
import { UserProfile, UserResponse } from "../../../types/user.type";
import { useMutation, useQueryClient } from "react-query";
import { updateUser } from "../../../apis/user.api";
import {
  gradeOptions,
  subjectOptions,
  titleOptions,
} from "../../../constants/constants";
import { onError } from "../../../constants/onError";

interface EditProfileProps {
  data?: UserResponse;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditProfile: React.FC<EditProfileProps> = ({
  data,
  isModalOpen,
  setIsModalOpen,
}) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const user = useSelector((state: RootState) => state.user);

  const { mutate, isLoading } = useMutation(
    (data: UserProfile) => updateUser(user.id, data),
    {
      onError: onError,
      onSuccess: () => {
        queryClient.invalidateQueries(["userInfo", user.id]);
        message.success("Update profile successfully");
        setIsModalOpen(false);
      },
    }
  );

  return (
    <Modal
      open={isModalOpen}
      title="Edit Profile"
      okText="Save"
      centered
      width={700}
      footer={
        <Button
          type="primary"
          htmlType="submit"
          form="update-profile"
          loading={isLoading}
        >
          Save
        </Button>
      }
      onCancel={() => {
        if (!data?.title || !data?.subject || !data?.grade) {
          return;
        }
        setIsModalOpen(false);
      }}
    >
      <Form
        onFinish={(data: UserProfile) => mutate(data)}
        id="update-profile"
        layout="vertical"
        initialValues={{
          title: data?.title,
          firstName: data?.firstName,
          lastName: data?.lastName,
          grade: data?.grade,
          subject: data?.subject,
        }}
      >
        <div className="flex flex-row gap-2 w-full">
          <Form.Item<UserProfile>
            label="Title"
            name={"title"}
            className="w-1/5"
            rules={updateSchema.title}
          >
            <Select className="w-full" options={titleOptions}></Select>
          </Form.Item>
          <Form.Item<UserProfile>
            name={"firstName"}
            label="First name"
            className="w-full"
          >
            <Input className="border w-full border-gray-500" type="text" />
          </Form.Item>
          <Form.Item<UserProfile>
            label="Last name"
            name={"lastName"}
            className="w-full"
            rules={updateSchema.lastName}
          >
            <Input type="text" className="border w-full border-gray-500" />
          </Form.Item>
        </div>
        <div className="flex flex-row gap-2">
          <Form.Item<UserProfile>
            label="Grade"
            name={"grade"}
            className="w-1/6"
            rules={updateSchema.grade}
          >
            <Select className="w-full" options={gradeOptions}></Select>
          </Form.Item>
          <Form.Item<UserProfile>
            label="Subject"
            name={"subject"}
            className="w-1/3"
            rules={updateSchema.subject}
          >
            <Select className="w-full" options={subjectOptions}></Select>
          </Form.Item>
        </div>
        <div>
          <p>School</p>
          <div className="border w-full border-gray-500 rounded-lg p-2 flex flex-row items-center">
            <p>
              {data?.school.name +
                ", " +
                data?.school.city +
                ", " +
                data?.school.country}
            </p>
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(false);
                dispatch(setUser({ ...user, schoolId: "" }));
              }}
              className="py-1 px-2 bg-gray-300 hover:bg-gray-200 rounded-md ml-auto transition-colors ease-in-out"
            >
              Change
            </button>
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default EditProfile;
