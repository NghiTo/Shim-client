import { useState } from "react";
import { FaCheck, FaImage, FaPlus, FaTrash } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { setAnswers, setQuestion } from "../../store/quizSlice";

const initialAnswers = [
  {
    id: 1,
    bgColor: "#2d70ae",
    focusBg: "#1b3d5c",
    btnColor: "#729fc9",
    iconBg: "#1b3d5c",
    isCorrect: false,
    text: "", // Thêm thuộc tính text
  },
  {
    id: 2,
    bgColor: "#2d9da6",
    focusBg: "#1b5358",
    btnColor: "#72bdc3",
    iconBg: "#1b5358",
    isCorrect: false,
    text: "", // Thêm thuộc tính text
  },
  {
    id: 3,
    bgColor: "#efa929",
    focusBg: "#7c5919",
    btnColor: "#f4c56f",
    iconBg: "#7c5919",
    isCorrect: false,
    text: "", // Thêm thuộc tính text
  },
  {
    id: 4,
    bgColor: "#d5546d",
    focusBg: "#6f2f3b",
    btnColor: "#e38c9d",
    iconBg: "#6f2f3b",
    isCorrect: false,
    text: "", // Thêm thuộc tính text
  },
];

const MultipleChoice = () => {
  const dispatch = useDispatch();
  const [isSingleChoice, setIsSingleChoice] = useState(true);
  const [choices, setChoices] = useState(initialAnswers);
  const [deletedChoices, setDeletedChoices] = useState<typeof initialAnswers>(
    []
  );

  const handleQuestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setQuestion(e.target.value));
  };

  const handleAnswerChange = (id: number, value: string) => {
    const updatedChoices = choices.map((choice) =>
      choice.id === id ? { ...choice, text: value } : choice
    );
    setChoices(updatedChoices);

    const updatedAnswers = updatedChoices.map((choice) => ({
      id: choice.id,
      text: choice.text,
      isCorrect: choice.isCorrect,
    }));
    dispatch(setAnswers(updatedAnswers));
  };

  const toggleMode = () => {
    setIsSingleChoice((prev) => !prev);
    setChoices((prev) =>
      prev.map((answer) => ({
        ...answer,
        isCorrect: false,
      }))
    );
  };

  const handleSelectAnswer = (id: number) => {
    const updatedChoices = choices.map((answer) => {
      if (isSingleChoice) {
        return { ...answer, isCorrect: answer.id === id };
      }
      return answer.id === id
        ? { ...answer, isCorrect: !answer.isCorrect }
        : answer;
    });

    setChoices(updatedChoices);

    const updatedAnswers = updatedChoices.map((choice) => ({
      id: choice.id,
      text: choice.text,
      isCorrect: choice.isCorrect,
    }));

    dispatch(setAnswers(updatedAnswers)); // Dispatch updated answers to Redux
  };

  const addAnswer = () => {
    if (choices.length < 5) {
      let newAnswer;

      if (deletedChoices.length > 0) {
        newAnswer = deletedChoices[deletedChoices.length - 1];
        setDeletedChoices((prev) => prev.slice(0, -1));
      } else {
        const newId = choices.length + 1;
        newAnswer = {
          id: newId,
          bgColor: "#9a4292",
          focusBg: "#52264e",
          btnColor: "#bb80b6",
          iconBg: "#bb80b6",
          isCorrect: false,
          text: "",
        };
      }

      const updatedChoices = [...choices, newAnswer];
      setChoices(updatedChoices);

      const updatedAnswers = updatedChoices.map((choice) => ({
        id: choice.id,
        text: choice.text || "",
        isCorrect: choice.isCorrect,
      }));
      dispatch(setAnswers(updatedAnswers));
    }
  };

  const removeAnswer = () => {
    if (choices.length > 2) {
      const removedChoice = choices[choices.length - 1];
      const updatedChoices = choices.slice(0, -1);
      setChoices(updatedChoices);
      setDeletedChoices((prev) => [...prev, removedChoice]);

      const updatedAnswers = updatedChoices.map((choice) => ({
        id: choice.id,
        text: choice.text || "",
        isCorrect: choice.isCorrect,
      }));
      dispatch(setAnswers(updatedAnswers));
    }
  };

  return (
    <div className="py-4 px-36">
      <div className="w-full bg-[#461a42] rounded-xl p-4 flex flex-col gap-4 h-full">
        <div className="w-full border border-[#6b4868] rounded-xl p-2 group group-focus-within:bg-[#281226]">
          <div className="p-2 text-white bg-[#836580] rounded-md text-sm w-fit">
            <FaImage />
          </div>
          <textarea
            onChange={handleQuestionChange}
            className="text-white w-full placeholder:text-[#c0b1bf] rounded-xl py-12 text-xl bg-[#461a42] outline-none text-center resize-none overflow-hidden"
            placeholder="Type question here"
          />
        </div>
        <div
          className="grid gap-2"
          style={{
            gridTemplateColumns: `repeat(${choices.length}, minmax(0, 1fr))`,
          }}
        >
          {choices.map((answer) => (
            <div
              key={answer?.id}
              className="flex flex-col p-1 rounded-xl gap-2"
              style={{ backgroundColor: answer?.bgColor }}
            >
              <div className="flex flex-row gap-2">
                {choices.length > 2 && (
                  <div
                    className="p-2 text-white rounded-md text-sm w-fit cursor-pointer"
                    style={{ backgroundColor: answer?.btnColor }}
                    onClick={() => removeAnswer()}
                  >
                    <FaTrash />
                  </div>
                )}
                <div
                  className="p-2 text-white rounded-md text-sm w-fit"
                  style={{ backgroundColor: answer?.btnColor }}
                >
                  <FaImage />
                </div>

                <div
                  className={`p-2 text-white ${
                    isSingleChoice ? "rounded-full" : "rounded-md"
                  } text-sm w-fit ml-auto border ${
                    answer?.isCorrect
                      ? "border-green-500 bg-green-500"
                      : "border-white"
                  } cursor-pointer`}
                  style={{ backgroundColor: answer?.iconBg }}
                  onClick={() => handleSelectAnswer(answer.id)}
                >
                  <FaCheck />
                </div>
              </div>
              <div>
                <textarea
                  onChange={(e) =>
                    handleAnswerChange(answer.id, e.target.value)
                  }
                  className="text-white w-full rounded-xl py-12 text-xl outline-none text-center resize-none overflow-hidden"
                  style={{
                    backgroundColor: answer?.bgColor,
                  }}
                  placeholder="Type answer here"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-row">
          <div className="flex gap-4">
            <button
              onClick={toggleMode}
              className="px-4 py-1 rounded-md text-white bg-[#6f606d]"
            >
              {isSingleChoice
                ? "Single correct answer"
                : "Multiple correct answers"}
            </button>
          </div>
          {choices.length < 5 && (
            <div
              className="ml-auto text-white bg-[#836580] p-2 rounded-md cursor-pointer"
              onClick={addAnswer}
            >
              <FaPlus />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultipleChoice;
