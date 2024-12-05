import React, { useEffect } from "react";
import { Modal, Button, Input } from "antd";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  MultipleChoiceForm,
  QuestionResponse,
  QuestionUpdate,
} from "../../../types/quiz.type";
import { fillInTheBlankSchema } from "../../../schemas/quizSchema";
import { useMutation, useQueryClient } from "react-query";
import {
  createFillInTheBlankQuestion,
  updateQuestion,
} from "../../../apis/quiz.api";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface FillInTheBlankProps {
  open: boolean;
  question: QuestionResponse | null;
  closeModal: () => void;
}

const FillInTheBlank: React.FC<FillInTheBlankProps> = ({
  open,
  closeModal,
  question,
}) => {
  const { quizId } = useParams();
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<MultipleChoiceForm>({
    defaultValues: {
      title: question?.title || "",
      answers: question?.answers || [],
    },
    resolver: yupResolver(fillInTheBlankSchema),
  });

  const { fields, append } = useFieldArray({
    control,
    name: "answers",
  });

  const watchTitle = watch("title");

  const blanks = watchTitle.match(/\[blank\]/g) || [];

  useEffect(() => {
    const answersCount = fields.length;
    if (blanks.length > answersCount) {
      for (let i = answersCount; i < blanks.length; i++) {
        append({ content: "", isCorrect: true });
      }
    } else if (blanks.length < answersCount) {
      for (let i = answersCount - 1; i >= blanks.length; i--) {
        fields.pop();
      }
    }
  }, [blanks.length, append, fields]);

  const { mutate: create } = useMutation(
    (data: MultipleChoiceForm) =>
      createFillInTheBlankQuestion(quizId as string, data.title, data.answers),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["quiz", quizId]);
        closeModal();
      },
      onError: () => {
        toast.error("Error creating question:");
      },
    }
  );

  const { mutate: update } = useMutation(
    (data: QuestionUpdate) =>
      updateQuestion(quizId as string, question?.id as string, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["quiz", quizId]);
        closeModal();
      },
      onError: (err) => {
        toast.error(err as string);
      },
    }
  );

  const onSubmit = (data: MultipleChoiceForm) => {
    if (question) {
      update(data);
      return;
    }
    create(data);
  };

  return (
    <Modal
      open={open}
      onCancel={closeModal}
      className="top-20"
      title="Fill in the Blank Question"
      footer={[
        <Button key="cancel" onClick={closeModal}>
          Cancel
        </Button>,
        <Button key="save" type="primary" onClick={handleSubmit(onSubmit)}>
          Save
        </Button>,
      ]}
    >
      <div className="flex flex-col">
        <h3>Preview Question</h3>
        <p className="bg-gray-100 p-4 rounded">
          {watchTitle.replace(/\[blank\]/g, () => "_".repeat(5))}
        </p>

        <h3 className="mt-4">Edit Question</h3>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <Input.TextArea
              {...field}
              rows={3}
              placeholder="Enter your question with [blank] for blanks"
            />
          )}
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        <div className="flex flex-col gap-2 mt-4">
          <h3>Fill in the blanks</h3>
          {fields.map((item, index) => (
            <div key={item.id}>
              <Controller
                name={`answers.${index}.content`}
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder={`Blank #${index + 1}`}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                  />
                )}
              />
              {errors.answers?.[index]?.content && (
                <p className="text-red-500">
                  {errors.answers[index]?.content?.message}
                </p>
              )}
            </div>
          ))}
          {fields.length === 0 && (
            <p className="text-gray-500">No blanks detected in the question.</p>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default FillInTheBlank;
