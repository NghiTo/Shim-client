import * as Yup from "yup";

export const quizSettingSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .min(4, "Title must have at least 4 characters"),
  subject: Yup.string().required("Subject is required"),
  grade: Yup.string().required("Grade is required"),
  isPublic: Yup.boolean(),
});

export const multipleChoiceSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  answers: Yup.array()
    .of(
      Yup.object().shape({
        content: Yup.string().required("Answer content is required"),
        isCorrect: Yup.boolean().required(),
      })
    )
    .min(2, "You must provide at least 2 answers")
    .max(5, "You cannot provide more than 5 answers")
    .required(),
});
