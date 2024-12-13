import { Input } from "antd";

const MainStudent = () => {
  return (
    <div className="bg-gray-100 h-full py-8 px-4">
      <div className="flex flex-row w-full gap-4">
        <div className="p-16 rounded-lg flex flex-row justify-center gap-2 w-3/5 bg-white shadow-md">
          <Input
            placeholder="Enter quiz code..."
            className="w-3/5 outline-none border border-gray-300 rounded-md p-2 text-xl"
            maxLength={6}
          />
          <button className="w-1/5 bg-[#fe5f5c] text-xl rounded-md text-white hover:bg-[#fc8785] transition-all ease-in-out">
            Join
          </button>
        </div>
        <div className="w-2/5 text-3xl text-center flex flex-col gap-2 justify-center">
          <p>Hi there!</p>
          <p>Welcome to Shim</p>
        </div>
      </div>
    </div>
  );
};

export default MainStudent;
