import { FaImage, FaTrash } from "react-icons/fa6";

const MultipleChoice = () => {
  return (
    <div className="py-4 px-36">
      <div className="w-full bg-[#461a42] rounded-xl p-4 flex flex-col gap-4 h-full">
        <div className="w-full">
          <textarea
            className="text-white w-full placeholder:text-[#c0b1bf] rounded-xl py-4 text-xl bg-[#461a42] border border-[#6b4868] outline-none focus:bg-[#281226] text-center resize-none overflow-hidden"
            placeholder="Type question here"
          />
        </div>
        <div className="grid grid-cols-4 gap-2">
          <div className="flex flex-col bg-[#2d70ae] p-1 rounded-xl gap-2">
            <div className="flex flex-row gap-2">
              <div className="p-2 text-white bg-[#729fc9] rounded-md text-sm w-fit">
                <FaTrash />
              </div>
              <div className="p-2 text-white bg-[#729fc9] rounded-md text-sm w-fit">
                <FaImage />
              </div>
            </div>
            <div>
              <textarea
                className="text-white h-full w-full placeholder:text-[#b7cbe2] rounded-md py-4 text-xl bg-[#2d70ae] outline-none focus:bg-[#1b3d5c] text-center resize-none overflow-hidden"
                placeholder="Type answer here"
              />
            </div>
          </div>
          <div>
            <textarea
              className="text-white w-full placeholder:text-[#b7dee1] rounded-xl py-4 text-xl bg-[#2d9da6] border border-[#6b4868] outline-none focus:bg-[#1b5358] text-center resize-none overflow-hidden"
              placeholder="Type answer here"
            />
          </div>
          <div>
            <textarea
              className="text-white w-full placeholder:text-[#f4d3ad] rounded-xl py-4 text-xl bg-[#efa929] border border-[#6b4868] outline-none focus:bg-[#7c5919] text-center resize-none overflow-hidden"
              placeholder="Type answer here"
            />
          </div>
          <div>
            <textarea
              className="text-white w-full placeholder:text-[#ecc5cd] rounded-xl py-4 text-xl bg-[#d5546d] border border-[#6b4868] outline-none focus:bg-[#6f2f3b] text-center resize-none overflow-hidden"
              placeholder="Type answer here"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultipleChoice;
