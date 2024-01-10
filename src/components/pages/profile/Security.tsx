import { usePostChangePassword } from "@/hooks/profile";
import { userSecuritySchema } from "@/validations/profile";
import { yupResolver } from "@hookform/resolvers/yup";
import { CircularProgress } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export interface SecurityI {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function Security({ userId }: { userId: string }) {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<SecurityI>({
    resolver: yupResolver(userSecuritySchema),
  });

  const { confirmPassword, newPassword } = watch();
  const { postChangePasswordAction, postChangePasswordLoading } =
    usePostChangePassword({});

  const onSave = (data: SecurityI) => {
    if (newPassword !== confirmPassword) {
      toast.error("your new password & confirm password aren't equal");
    } else {
      postChangePasswordAction({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
        userId,
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSave)}>
        <p className="font-semibold text-lg">رمز حساب</p>

        <div className="py-5 px-8 flex justify-between border-t border-t-gray-200 mt-5">
          <p className="font-semibold text-sm w-1/3 lg:block hidden">
            تغییر رمز عبور
          </p>
          <div className="lg:w-2/3 w-full">
            <p className="text-base mt-2">رمز عبور قدیمی</p>
            <input
              type="password"
              className="border lg:w-1/2 w-full border-gray-300 py-1 px-1 rounded-lg mt-2"
              {...register("oldPassword")}
            />
            <p className="text-red-500 font-light text-xs mt-2">
              {errors.oldPassword?.message}
            </p>

            <p className="text-base mt-6">رمز عبور جدید</p>
            <input
              type="password"
              className="border lg:w-1/2 w-full border-gray-300 py-1 px-1 rounded-lg mt-2"
              {...register("newPassword")}
            />
            <p className="text-red-500 font-light text-xs mt-2">
              {errors.newPassword?.message}
            </p>
            <p className="text-base mt-2">تایید رمز عبور جدید</p>
            <input
              type="password"
              className="border lg:w-1/2 w-full border-gray-300 py-1 px-1 rounded-lg mt-2"
              {...register("confirmPassword")}
            />
            <p className="text-red-500 font-light text-xs mt-2">
              {errors.confirmPassword?.message}
            </p>
          </div>
          <div className="w-1/4 flex justify-end">
            <p className="text-blue-400 cursor-pointer w-fit"> </p>
          </div>
        </div>
        <div className="flex justify-end mt-5 border-t border-t-gray-200 pt-4">
          {postChangePasswordLoading && <CircularProgress />}
          {!postChangePasswordLoading && (
            <div className="flex gap-4 w-full justify-end">
              <button
                className="w-20 py-2 bg-blue-400 text-white rounded-lg"
                type="submit"
              >
                ذخیره
              </button>
            </div>
          )}
        </div>
      </form>
    </>
  );
}
