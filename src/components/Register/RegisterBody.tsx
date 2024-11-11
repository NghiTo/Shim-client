import { useState } from "react";
import ContinueEmail from "./ContinueEmail";
import MainSignUp from "./MainSignUp";
import backgroundImg from "/src/assets/header_96c74815-3497-4ccf-bf3c-3dfdfa17e313.webp";

const RegisterBody = () => {
  const [continueEmail, setContinueEmail] = useState(false);
  return (
    <div className="bg-gray-100 max-md:bg-white w-2/3 min-h-full mx-auto rounded-lg flex flex-row gap-4 max-md:w-full">
      {continueEmail ? (
        <ContinueEmail setContinueEmail={setContinueEmail} />
      ) : (
        <MainSignUp setContinueEmail={setContinueEmail} />
      )}

      <div
        className="w-2/5 h-auto rounded-r-lg bg-cover bg-center max-md:hidden"
        style={{ backgroundImage: `url(${backgroundImg})` }}
      ></div>
    </div>
  );
};

export default RegisterBody;
