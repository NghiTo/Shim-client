import React, { useState } from "react";
import { Modal, Input, Button, Radio, Form, Space } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { MultipleChoiceForm } from "../../types/quiz.type";
import { yupResolver } from "@hookform/resolvers/yup";
import { multipleChoiceSchema } from "../../schemas/quizSchema";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { createMultipleChoiceQuestion } from "../../apis/quiz.api";

interface MultipleChoiceProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MultipleChoice: React.FC<MultipleChoiceProps> = ({ open, setOpen }) => {
  const { quizId } = useParams();
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MultipleChoiceForm>({
    defaultValues: {
      title: "",
      answers: [
        { content: "", isCorrect: true },
        { content: "", isCorrect: false },
      ],
    },
    resolver: yupResolver(multipleChoiceSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "answers",
  });

  const [correctAnswer, setCorrectAnswer] = useState<number | null>(0);

  const { mutate } = useMutation(
    (data: MultipleChoiceForm) =>
      createMultipleChoiceQuestion(quizId as string, data.title, data.answers),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([
          ["questions", quizId],
          ["quiz", quizId],
        ]);
        reset();
        setOpen(false);
      },
    }
  );

  const onSubmit: SubmitHandler<MultipleChoiceForm> = (data) => {
    const preparedData = {
      title: data.title,
      answers: data.answers.map((answer, index) => ({
        ...answer,
        isCorrect: correctAnswer === index,
      })),
    };

    mutate(preparedData);
  };

  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      style={{ top: "8%" }}
      onOk={handleSubmit(onSubmit)}
      title="Create Multiple Choice Question"
    >
      <Form layout="vertical">
        <Form.Item
          label="Question"
          validateStatus={errors.title ? "error" : ""}
          help={errors.title?.message}
          required
        >
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Input.TextArea
                {...field}
                placeholder="Enter your question"
                rows={3}
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Answers"
          validateStatus={errors.answers ? "error" : ""}
          help={errors.answers?.message}
          required
        >
          <Space direction="vertical" style={{ width: "100%" }}>
            {fields.map((field, index) => (
              <Space key={field.id} align="center" style={{ width: "100%" }}>
                <Radio
                  checked={correctAnswer === index}
                  onChange={() => setCorrectAnswer(index)}
                />
                <Controller
                  name={`answers.${index}.content`}
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder={`Answer ${index + 1}`}
                      style={{ flex: 1 }}
                    />
                  )}
                />

                {fields.length > 2 && (
                  <Button
                    icon={<MinusOutlined />}
                    onClick={() => remove(index)}
                    danger
                    size="small"
                  />
                )}
              </Space>
            ))}
          </Space>
        </Form.Item>

        <Button
          type="dashed"
          icon={<PlusOutlined />}
          onClick={() =>
            fields.length < 5 && append({ content: "", isCorrect: false })
          }
          disabled={fields.length >= 5}
          style={{ width: "100%" }}
        >
          Add Answer
        </Button>
      </Form>
    </Modal>
  );
};

export default MultipleChoice;
