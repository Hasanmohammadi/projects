import { usePostPersonalInformation } from "@/hooks/profile";
import { PostPersonalInformationArgsI } from "@/services/profile/postPersonalInformation";
import { userInformationSchema } from "@/validations/profile";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, CircularProgress, MenuItem, Select } from "@mui/material";
import clsx from "clsx";
import { useRef, useState } from "react";
import DateObject from "react-date-object";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-multi-date-picker";
import Toolbar from "react-multi-date-picker/plugins/toolbar";
import PhoneInputWithCountrySelect from "react-phone-number-input";
import "react-phone-number-input/style.css";

import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian_en from "react-date-object/locales/gregorian_en";
import { SeparateDateI } from "@/types/flight";
import { useUserInfoContext } from "@/context";
import {
  convertGregorianToJalali,
  convertJalaliToGregorian,
  convertPersianNumberToEnglish,
} from "@/helpers";

const persianTodayDate = new DateObject()
  .convert(persian, gregorian_en)
  .format();

export interface PersonalInfoI
  extends Omit<PostPersonalInformationArgsI, "brithDate"> {
  birthDate: string;
}
export interface PersonalInformationI {
  name: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: Date;
  nationality: string;
  gender: number;
  profileInfoAction: () => {};
}

export default function PersonalInformation({
  dateOfBirth,
  email,
  gender = 0,
  lastName,
  name,
  nationality,
  phoneNumber,
  profileInfoAction,
}: PersonalInformationI) {
  console.log(
    "🚀 ~ file: PersonalInformation.tsx:55 ~ dateOfBirth:",
    convertGregorianToJalali(String(dateOfBirth).slice(0, 10))
  );
  const { tokenDetail, user } = useUserInfoContext();
  const datePickerRef = useRef(null);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<PersonalInfoI>({
    defaultValues: {
      birthDate: dateOfBirth
        ? convertGregorianToJalali(String(dateOfBirth).slice(0, 10))
        : "",
      emailAddress: user.userName,
      firstName: name,
      lastName,
      nationality,
      mobileNo: phoneNumber,
      gender,
    },
    //@ts-ignore
    resolver: yupResolver(userInformationSchema),
  });

  const { postPersonalInformationAction, postPersonalInformationLoading } =
    usePostPersonalInformation({
      onSuccess: () => {
        profileInfoAction();
      },
    });

  const onSave = (data: PersonalInfoI) => {
    postPersonalInformationAction({
      ...data,
      brithDate: convertJalaliToGregorian(data.birthDate),
    });
  };

  return (
    <div>
      <p className="font-semibold text-lg">اطلاعات شخصی</p>
      <hr className="mt-6" />
      <form onSubmit={handleSubmit(onSave)}>
        <div className="py-5 px-8 flex justify-between">
          <p className="font-semibold text-sm w-1/3 lg:block hidden">نام</p>
          <div className="w-2/3">
            <p className="text-sm mt-2">نام</p>
            <input
              className="border border-gray-300 py-1.5 px-2 rounded-lg mt-2 w-60"
              {...register("firstName")}
            />
            <p className="font-extralight text-xs text-red-500 mt-0.5">
              {errors.firstName?.message}
            </p>
            <p className="text-sm mt-2">نام خانوادگی</p>
            <input
              className="border border-gray-300 py-1.5 px-2 rounded-lg mt-2 w-60"
              {...register("lastName")}
            />
            <p className="font-extralight text-xs text-red-500 mt-0.5">
              {errors.lastName?.message}
            </p>
          </div>
          <div className="w-1/4 flex justify-end">
            <p className="text-blue-400 cursor-pointer w-fit"></p>
          </div>
        </div>
        <div className="py-5 px-8 flex justify-between border-t border-t-gray-200">
          <p className="font-semibold text-sm w-1/3 lg:block hidden">ایمیل</p>
          <div className="w-2/3">
            <p className="text-sm mt-2">ایمیل</p>
            <input
              className="border border-gray-300 py-1.5 px-2 rounded-lg mt-2 w-60 opacity-40"
              {...register("emailAddress")}
              disabled
            />
            <p className="font-extralight text-xs text-red-500 mt-0.5">
              {errors.emailAddress?.message}
            </p>
          </div>
          <div className="w-1/4 flex justify-end">
            <p className="text-blue-400 cursor-pointer w-fit"></p>
          </div>
        </div>
        <div className="py-5 px-8 flex justify-between border-t border-t-gray-200">
          <p className="font-semibold text-sm w-1/3 lg:block hidden">شماره</p>
          <div className="w-2/3">
            <label className="font-normal text-gray-500 text-sm">
              شماره همراه
            </label>
            <Controller
              name="mobileNo"
              control={control}
              render={({ field }) => (
                <Box
                  sx={{
                    ".PhoneInputInput": {
                      direction: "ltr",
                      textAlign: "center",
                    },
                  }}
                >
                  <PhoneInputWithCountrySelect
                    placeholder="9123456789"
                    className={clsx(
                      "w-60 rounded-lg border border-gray-300 p-2 mt-2 outline-none"
                      //   {
                      //     'border border-red-600':
                      //       errors.contactInformation?.mobileNumber?.message,
                      //   }
                    )}
                    defaultCountry="IR"
                    onCountryChange={(country) => console.log(country)}
                    {...field}
                  />
                  <p className="font-extralight text-xs text-red-500 mt-0.5">
                    {errors.mobileNo?.message}
                  </p>
                </Box>
              )}
            />
          </div>

          <div className="w-1/4 flex justify-end">
            <p className="text-blue-400 cursor-pointer w-fit"></p>
          </div>
        </div>
        <div className="py-5 px-8 flex justify-between border-t border-t-gray-200">
          <p className="font-semibold text-sm w-1/3 lg:block hidden">
            تاریخ تولد
          </p>
          <div className="w-2/3">
            {/* <Box
              className="w-60 p-2 rounded-lg border border-gray-300 outline-none mt-1"
              sx={{
                ".rmdp-day.rmdp-selected span:not(.highlight)": {
                  backgroundColor: "#FFC107",
                },
                ".rmdp-toolbar div": {
                  backgroundColor: "#FFC107",
                },
                ".rmdp-day.rmdp-today span": {
                  backgroundColor: "#ffe69a",
                  color: "black",
                },
                ".rmdp-week-day": {
                  color: "black",
                },
                ".rmdp-input": {
                  border: "none",
                  width: "100%",
                },
                ".rmdp-input:focus": {
                  border: "none",
                  boxShadow: "none",
                },
                ".rmdp-day rmdp-selected": {
                  backgroundColor: "#FFC107",
                },
                ".rmdp-day:not(.rmdp-disabled,.rmdp-day-hidden) span:hover": {
                  backgroundColor: "#FFC107",
                },
                ".rmdp-arrow-container:hover": {
                  backgroundColor: "#FFC107",
                },
                ".rmdp-range": {
                  backgroundColor: "#FFC107",
                },
              }}
            >
              <DatePicker
                className=" border border-gray-200 cursor-pointer"
                onChange={(date) => handleDepartureDate(date as DateObject)}
                value={dateOfBirth ? String(dateOfBirth).slice(0, 10) : ""}
                calendar={persian}
                locale={persian_fa}
                plugins={[<Toolbar position="bottom" key={0} />]}
                maxDate={persianTodayDate}
              />
            </Box> */}
            <div>
              <Box
                className="w-60 py-0.5 rounded-lg border border-gray-300 outline-none mt-1"
                sx={{
                  ".rmdp-day.rmdp-selected span:not(.highlight)": {
                    backgroundColor: "#FFC107",
                  },
                  ".rmdp-toolbar div": {
                    backgroundColor: "#FFC107",
                  },
                  ".rmdp-day.rmdp-today span": {
                    backgroundColor: "#ffe69a",
                    color: "black",
                  },
                  ".rmdp-week-day": {
                    color: "black",
                  },
                  ".rmdp-input": {
                    border: "none",
                    width: "100%",
                    height: "30px",
                    cursor: "pointer",
                  },
                  ".rmdp-input:focus": {
                    border: "none",
                    boxShadow: "none",
                  },
                  ".rmdp-day rmdp-selected": {
                    backgroundColor: "#FFC107",
                  },
                  ".rmdp-day:not(.rmdp-disabled,.rmdp-day-hidden) span:hover": {
                    backgroundColor: "#FFC107",
                  },
                  ".rmdp-arrow-container:hover": {
                    backgroundColor: "#FFC107",
                  },
                  ".rmdp-range": {
                    backgroundColor: "#FFC107",
                  },
                  ".rmdp-container ": {
                    width: "100%",
                  },
                }}
              >
                <Controller
                  name="birthDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      calendar={persian}
                      locale={persian_fa}
                      plugins={[<Toolbar position="bottom" key={0} />]}
                      maxDate={persianTodayDate}
                      {...field}
                      ref={datePickerRef}
                      value={field.value}
                      onChange={(value) => field.onChange(value)}
                    />
                  )}
                />
              </Box>
              <p className="text-red-600 text-xs mt-1">
                {errors.birthDate?.message}
              </p>
            </div>
          </div>
          <div className="w-1/4 flex justify-end">
            <p className="text-blue-400 cursor-pointer w-fit"></p>
          </div>
        </div>
        <div className="py-5 px-8 flex justify-between border-t border-t-gray-200">
          <p className="font-semibold text-sm w-1/3 lg:block hidden">ملیت</p>
          <div className="w-2/3">
            <input
              className="border border-gray-300 py-1.5 px-2 rounded-lg mt-2 w-60"
              {...register("nationality")}
            />
            <p className="font-extralight text-xs text-red-500 mt-0.5">
              {errors.nationality?.message}
            </p>
          </div>
          <div className="w-1/4 flex justify-end">
            <p className="text-blue-400 cursor-pointer w-fit"></p>
          </div>
        </div>
        <div className="py-5 px-8 flex justify-between border-t border-t-gray-200">
          <p className="font-semibold text-sm w-1/3 lg:block hidden">جنسیت</p>
          <div className="w-2/3">
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Select
                  defaultValue={0}
                  onChange={onChange}
                  value={value}
                  onBlur={onBlur}
                  className="h-10 w-60 "
                >
                  <MenuItem value={0}>آقا</MenuItem>
                  <MenuItem value={1}>خانوم</MenuItem>
                </Select>
              )}
              name="gender"
            />
          </div>
          <div className="w-1/4 flex justify-end">
            <p className="text-blue-400 cursor-pointer w-fit"></p>
          </div>
        </div>
        <div className="flex justify-end mt-5 border-t border-t-gray-200 pt-4 gap-4">
          {postPersonalInformationLoading && <CircularProgress />}
          {!postPersonalInformationLoading && (
            <>
              <button
                className="w-20 py-2 bg-blue-400 text-white rounded-lg"
                type="submit"
              >
                ذخیره
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
