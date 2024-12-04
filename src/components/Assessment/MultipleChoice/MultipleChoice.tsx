import React, { useEffect, useState } from "react";
import { Modal, Input, Button, Radio, Space } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import {
  MultipleChoiceForm,
  QuestionResponse,
  QuestionUpdate,
} from "../../../types/quiz.type";
import { multipleChoiceSchema } from "../../../schemas/quizSchema";
import {
  createMultipleChoiceQuestion,
  updateQuestion,
} from "../../../apis/quiz.api";
import { toast } from "react-toastify";

interface MultipleChoiceProps {
  open: boolean;
  question: QuestionResponse | null;
  closeModal: () => void;
}

const MultipleChoice: React.FC<MultipleChoiceProps> = ({
  question,
  open,
  closeModal,
}) => {
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

  const { mutate: create, isLoading } = useMutation(
    (data: MultipleChoiceForm) =>
      createMultipleChoiceQuestion(quizId as string, data.title, data.answers),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["quiz", quizId]);
        reset();
        setCorrectAnswer(0);
        closeModal();
      },
      onError: (err) => {
        toast.error(err as string);
      },
    }
  );

  const { mutate: update } = useMutation(
    (data: QuestionUpdate) =>
      updateQuestion(quizId as string, question?.id as string, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["quiz", quizId]);
        reset();
        setCorrectAnswer(0);
        closeModal();
      },
      onError: (err) => {
        toast.error(err as string);
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
    if (question) {
      update(preparedData);
      return;
    }
    create(preparedData);
  };

  useEffect(() => {
    if (question) {
      reset({
        title: question?.title || "",
        answers: question.answers || [
          { content: "", isCorrect: true },
          { content: "", isCorrect: false },
        ],
      });
      setCorrectAnswer(
        question.answers?.findIndex((answer) => answer.isCorrect) ?? 0
      );
    }
  }, [question, reset]);

  return (
    <Modal
      open={open}
      confirmLoading={isLoading}
      onCancel={() => {
        reset();
        setCorrectAnswer(0);
        closeModal();
      }}
      style={{ top: "8%" }}
      onOk={handleSubmit(onSubmit)}
      title="Multiple Choice Question"
    >
      <div style={{ marginBottom: "16px" }}>
        <label>Question</label>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <div>
              <Input.TextArea
                {...field}
                placeholder="Enter your question"
                rows={3}
                style={{ width: "100%" }}
              />
              {errors.title && (
                <span style={{ color: "red", fontSize: "12px" }}>
                  {errors.title.message}
                </span>
              )}
            </div>
          )}
        />
      </div>
      <label>Answer</label>
      {fields.map((field, index) => (
        <Space
          key={field.id}
          align="start"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            width: "100%",
            marginTop: "10px",
          }}
        >
          <Radio
            checked={correctAnswer === index}
            onChange={() => setCorrectAnswer(index)}
            style={{ marginTop: "6px" }}
          />
          <div style={{ flex: 1 }}>
            <Controller
              name={`answers.${index}.content`}
              control={control}
              render={({ field }) => (
                <div>
                  <Input {...field} placeholder={`Answer ${index + 1}`} />
                  {errors.answers?.[index]?.content && (
                    <span style={{ color: "red", fontSize: "12px" }}>
                      {errors.answers[index]?.content?.message}
                    </span>
                  )}
                </div>
              )}
            />
          </div>
          {fields.length > 2 && (
            <Button
              icon={<MinusOutlined />}
              onClick={() => remove(index)}
              danger
              size="small"
              style={{ marginTop: "2px" }}
            />
          )}
        </Space>
      ))}

      <Button
        type="dashed"
        icon={<PlusOutlined />}
        onClick={() =>
          fields.length < 5 && append({ content: "", isCorrect: false })
        }
        disabled={fields.length >= 5}
        style={{ width: "100%", marginTop: "20px" }}
      >
        Add Answer
      </Button>
    </Modal>
  );
};

export default MultipleChoice;
