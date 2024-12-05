import * as Yup from "yup";

export const quizSettingSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .min(4, "Title must have at least 4 characters"),
  subject: Yup.string().required("Subject is required"),
  grade: Yup.string().required("Grade is required"),
  isPublic: Yup.boolean(),
  coverImg: Yup.string().nullable(),
});

export const multipleChoiceSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  answers: Yup.array()
    .of(
      Yup.object().shape({
        content: Yup.string().required("Answer content is required"),
        isCorrect: Yup.boolean(),
      })
    )
    .min(2, "You must provide at least 2 answers")
    .max(5, "You cannot provide more than 5 answers")
    .required(),
});

export const fillInTheBlankSchema = Yup.object().shape({
  title: Yup.string()
    .required("Question title is required")
    .test("has-blanks", "Question must contain at least one [blank]", (value) =>
      /\[blank\]/g.test(value || "")
    ),
  answers: Yup.array()
    .of(
      Yup.object().shape({
        content: Yup.string().required("Answer content is required"),
        isCorrect: Yup.boolean(),
      })
    )
    .min(1, "At least one answer is required")
    .required(),
});
