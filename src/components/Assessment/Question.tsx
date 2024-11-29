import { Dropdown, MenuProps } from "antd";
import React from "react";
import { FaCheck, FaTrash } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { MdClose, MdEdit } from "react-icons/md";
import { VscSettings } from "react-icons/vsc";
import { AnswerResponse, QuestionResponse } from "../../types/quiz.type";

const itemsTime: MenuProps["items"] = [
  { label: "5 seconds", key: "5" },
  { label: "10 seconds", key: "10" },
  { label: "20 seconds", key: "20" },
  { label: "30 seconds", key: "30" },
  { label: "45 seconds", key: "45" },
  { label: "1 minute", key: "60" },
  { label: "1.5 minutes", key: "90" },
  { label: "2 minutes", key: "120" },
  { label: "3 minutes", key: "180" },
  { label: "5 minutes", key: "300" },
  { label: "10 minutes", key: "600" },
  { label: "15 minutes", key: "900" },
];

const itemsPoint: MenuProps["items"] = [
  { label: "1 point", key: "1" },
  { label: "2 points", key: "2" },
  { label: "3 points", key: "3" },
  { label: "4 points", key: "4" },
  { label: "5 points", key: "5" },
  { label: "6 points", key: "6" },
  { label: "7 points", key: "7" },
  { label: "8 points", key: "8" },
  { label: "9 points", key: "9" },
  { label: "10 points", key: "10" },
  { label: "11 points", key: "11" },
  { label: "12 points", key: "12" },
  { label: "13 points", key: "13" },
  { label: "14 points", key: "14" },
  { label: "15 points", key: "15" },
  { label: "16 points", key: "16" },
  { label: "17 points", key: "17" },
  { label: "18 points", key: "18" },
  { label: "19 points", key: "19" },
  { label: "20 points", key: "20" },
];

interface QuestionProps {
  question: QuestionResponse;
}

const Question: React.FC<QuestionProps> = ({ question }) => {
  return (
    <div className="rounded-lg bg-white p-4 flex flex-col gap-5">
      <div className="flex flex-row gap-2">
        <div className="border border-gray-300 rounded-md px-2 py-1 w-fit text-sm">
          1. Multiple Choice
        </div>
        <Dropdown
          menu={{ items: itemsTime }}
          trigger={["click"]}
          dropdownRender={(menu) => (
            <div style={{ maxHeight: "200px", overflowY: "auto" }}>{menu}</div>
          )}
        >
          <div className="flex flex-row max-md:hidden items-center gap-2 text-sm py-1 px-2 border border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer">
            <p>1 minute</p>
            <IoIosArrowDown className="ml-auto" />
          </div>
        </Dropdown>
        <Dropdown
          menu={{ items: itemsPoint }}
          trigger={["click"]}
          dropdownRender={(menu) => (
            <div style={{ maxHeight: "200px", overflowY: "auto" }}>{menu}</div>
          )}
        >
          <div className="flex flex-row max-md:hidden items-center gap-2 text-sm py-1 px-2 border border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer">
            <p>1 point</p>
            <IoIosArrowDown className="ml-auto" />
          </div>
        </Dropdown>
        <div className="flex flex-row gap-2 items-center ml-auto">
          <div className="flex flex-row gap-1 border max-md:hidden border-gray-300 rounded-md py-1 items-center text-sm px-2 hover:bg-gray-100 cursor-pointer">
            <MdEdit />
            <p>Edit</p>
          </div>
          <div className="border max-md:hidden border-gray-300 rounded-md p-2 hover:bg-gray-100 cursor-pointer text-sm">
            <FaTrash />
          </div>
          <div className="border md:hidden border-gray-300 rounded-md p-2 hover:bg-gray-100 cursor-pointer text-sm">
            <VscSettings />
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full gap-1">
        <p>{question.title}</p>
        <p className="text-sm text-gray-500">Answers choices</p>
        <div className="grid grid-cols-2 w-full">
          {question.answers.map((answer: AnswerResponse) => {
            return (
              <div key={answer.id} className="flex flex-row gap-4 items-center">
                {answer.isCorrect ? (
                  <FaCheck className="text-green-500" />
                ) : (
                  <MdClose className="text-red-500" />
                )}

                <p>{answer.content}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Question;
