import { Input } from "@/components/common";
import { usePostLogin } from "@/hooks/auth";
import { signInSchema } from "@/validations";
import { Dispatch, SetStateAction } from "react";
import { XSquare } from "react-feather";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginI } from "@/types/auth";
import clsx from "clsx";
import { CircularProgress } from "@mui/material";
import { useGetProfileInformation } from "@/hooks/profile";
import { SafarestanLogo } from "@/assets/svg";
import { useUserInfoContext } from "@/context";

export default function SignInModal({
  setIsOpen,
  setModalType,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setModalType: Dispatch<SetStateAction<"signIn" | "register">>;
}) {
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm<LoginI>({
    defaultValues: { email: "", password: "" },
    resolver: yupResolver(signInSchema),
  });

  const { profileInfoAction } = useGetProfileInformation();
  const { setTokenDetail, setUser } = useUserInfoContext();

  const { postLoginAction, postLoginLoading } = usePostLogin({
    onSuccess: ({ tokenDetail, user }) => {
      setIsOpen(false);
      profileInfoAction();
      setTokenDetail(tokenDetail);
      setUser(user);
    },
  });

  const onSubmit = (data: LoginI) => {
    postLoginAction({
      userName: data.email,
      password: data.password,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-96 pb-12 lg:h-auto h-screen">
        <div className="bg-gray-300 flex justify-between rounded-tl-xl rounded-tr-xl px-8 py-4">
          <p className="text-gray-500">ورود به سیستم</p>
          <XSquare
            color="#000000"
            className="cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
        </div>
        <SafarestanLogo className="m-auto mt-16 lg:hidden" />
        <div className="px-8  flex flex-col items-center lg:mt-8 mt-24">
          <Input
            name="email"
            control={control}
            className="w-full h-10"
            label="ایمیل"
          />
          <p className="text-red-600 text-xs mt-8">{errors?.email?.message}</p>
          <Input
            name="password"
            control={control}
            className={clsx("w-full h-10", {
              "mt-0": errors?.email?.message,
              "mt-4": !errors?.email?.message,
            })}
            label="رمز ورود "
            type="password"
          />
          <p className="text-red-600 text-xs mt-8">
            {errors?.password?.message}
          </p>
          {postLoginLoading ? (
            <CircularProgress className="mt-9" />
          ) : (
            <div
              className={clsx(
                "bg-primary rounded-full w-4/5 py-2 flex justify-center",
                {
                  "mt-4": errors?.password?.message,
                  "mt-8": !errors?.password?.message,
                }
              )}
            >
              <button
                type="submit"
                className="text-white font-bold text-lg cursor-pointer"
              >
                ورود به سیستم
              </button>
            </div>
          )}
          <p className="text-blue-300 cursor-pointer mt-6 font-light text-sm">
            رمز ورود خود را فراموش کرده اید؟
          </p>
          <p
            className=" cursor-pointer mt-6 font-light text-xs text-gray-400"
            onClick={() => setModalType("register")}
          >
            حساب کاربری ندارید؟
            <span className="mr-2 text-blue-300">ایجاد حساب کاربری</span>
          </p>
        </div>
      </div>
    </form>
  );
}
