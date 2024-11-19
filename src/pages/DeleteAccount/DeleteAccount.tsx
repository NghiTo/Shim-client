import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { OtpForm } from "../../types/auth.type";
import { yupResolver } from "@hookform/resolvers/yup";
import { otpSchema } from "../../schemas/authSchema";
import { useMutation } from "react-query";
import { deleteUser } from "../../apis/user.api";
import { verifyOtp } from "../../apis/auth.api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { toast } from "react-toastify";
import { clearUser } from "../../store/userSlice";

const DeleteAccount = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    clearErrors,
    setError,
  } = useForm<OtpForm>({
    resolver: yupResolver(otpSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const { mutate: change } = useMutation(deleteUser, {
    onSuccess: () => {
      toast.success("Account deleted successfully");
      dispatch(clearUser());
      localStorage.clear();
      navigate("/");
    },
  });

  const { mutate } = useMutation(verifyOtp, {
    onSuccess: () => {
      change(user.id);

    },
    onError: () => {
      setError("otp", { message: "Invalid OTP" });
    },
  });

  const onSubmit: SubmitHandler<OtpForm> = (data) => {
    mutate(data.otp);
  };

  const isFillInput = watch("otp");
  return (
    <div className="min-h-screen flex relative">
      <img
        src="/src/assets/z6005140779869_f6c7fcbf20895c41056a882bae49e05d.jpg"
        alt=""
        className="absolute w-1/12 top-4 left-4 max-md:w-1/5"
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-100 m-auto p-8 max-md:w-full w-2/5 rounded-lg flex flex-col gap-4"
      >
        <h1 className="font-semibold text-2xl">Delete your account</h1>
        <p>This action will permanently delete your account details</p>
        <div className="bg-[#ec0b431a] border border-[#ec0b4333] p-4 rounded-md text-gray-500 text-sm">
          Your account cannot be recovered in future. You will lose access to
          all quizzes, lessons, classes and reports that you have created.
        </div>
        <div>
          <p>Enter your OTP</p>
          <input
            {...register("otp")}
            onFocus={() => clearErrors("otp")}
            type="number"
            placeholder="Start typing..."
            className="p-2 outline-none border border-gray-400 rounded-md w-full focus:border-[#fe5f5c]"
          />
          {errors.otp && (
            <span className="text-red-600 text-sm">{errors.otp.message}</span>
          )}
        </div>
        <div className="w-full flex flex-row gap-2">
          <Link
            to={"/teacher/settings"}
            className="bg-gray-200 w-1/2 px-auto text-center p-2 rounded-lg"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={!isFillInput}
            className={`${
              isFillInput
                ? "bg-[#fe5f5c] text-white"
                : "bg-gray-300 text-gray-400"
            }  w-1/2 px-auto text-center p-2 rounded-lg`}
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeleteAccount;
