import { SafarestanLogo } from "@/assets/svg";
import { Input } from "@/components/common";
import { usePostRegister } from "@/hooks/auth";
import { LoginI } from "@/types/auth";
import { signInSchema } from "@/validations";
import { yupResolver } from "@hookform/resolvers/yup";
import { CircularProgress } from "@mui/material";
import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";
import { XSquare } from "react-feather";
import { useForm } from "react-hook-form";

export default function RegisterModal({
  setIsOpen,
  setModalType,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setModalType: Dispatch<SetStateAction<"signIn" | "register">>;
}) {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<LoginI>({
    defaultValues: { email: "", password: "" },
    resolver: yupResolver(signInSchema),
  });

  const { postRegisterAction, postRegisterLoading } = usePostRegister({
    onSuccess: () => setIsOpen(false),
  });

  const onRegister = ({ email, password }: LoginI) => {
    postRegisterAction({
      userName: email,
      password: password,
    });
  };

  return (
    <form onSubmit={handleSubmit(onRegister)}>
      <div className="w-96 pb-10 lg:h-auto h-screen">
        <div className="bg-gray-300 flex justify-between rounded-tl-xl rounded-tr-xl px-8 py-4">
          <p className="text-gray-500">ایجاد حساب کاربری</p>
          <XSquare
            color="#000000"
            className="cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
        </div>
        <SafarestanLogo className="m-auto mt-16 lg:hidden" />
        <div className="px-8 lg:mt-8 mt-24 flex flex-col items-center">
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
          {postRegisterLoading ? (
            <CircularProgress className="mt-9" />
          ) : (
            <button
              type="submit"
              className={clsx(
                "bg-primary rounded-full w-4/5 py-2 flex justify-center text-white font-bold text-lg",
                {
                  "mt-4": errors?.password?.message,
                  "mt-8": !errors?.password?.message,
                }
              )}
            >
              ثبت نام
            </button>
          )}

          <div className="border-t border-t-gray-200 w-full mt-6 flex flex-col items-center">
            <p className="text-gray-400 font-light text-sm mt-3">
              قبلا ثبت نام کرده اید؟
            </p>
            <div
              className="border border-primary rounded-full w-4/5 mt-4 py-2 flex justify-center"
              onClick={() => setModalType("signIn")}
            >
              <p className="text-primary font-bold text-lg cursor-pointer">
                ورود به سیستم
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
