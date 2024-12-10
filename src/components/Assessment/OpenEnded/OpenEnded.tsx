import React from "react";
import { QuestionResponse } from "../../../types/quiz.type";
import { Input, Modal } from "antd";

interface OpenEndedProps {
  open: boolean;
  question: QuestionResponse | null;
  closeModal: () => void;
}

const OpenEnded: React.FC<OpenEndedProps> = ({ open, closeModal }) => {
  return (
    <Modal onCancel={closeModal} open={open} title="Open Ended Question">
      <h1>Question</h1>
      <Input.TextArea
        rows={4}
        placeholder="Enter question here..."
      ></Input.TextArea>
    </Modal>
  );
};

export default OpenEnded;
