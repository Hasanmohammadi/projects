"use client";
import TicketCard from "@/components/pages/flight/result/components/TicketCard";
import { useFlightInfoContext, useFlightSearchResultContext } from "@/context";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, CircularProgress } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import persian_fa from "react-date-object/locales/persian_fa";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import DatePicker from "react-multi-date-picker";
import Toolbar from "react-multi-date-picker/plugins/toolbar";
import PhoneInput, { parsePhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";

const persianTodayDate = new DateObject()
  .convert(persian, gregorian_en)
  .format();

import { Checkbox, SelectSearch } from "@/components/common";
import { convertJalaliToGregorian } from "@/helpers";
import { changePassengerInformation } from "@/helpers/passenger";
import { usePostAddToCard, usePostPriceDetail } from "@/hooks/book";
import useGetCountry from "@/hooks/country";
import { PassengerInformationI } from "@/types/flight";
import { passengerInformationSchema } from "@/validations";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PassengerInfo() {
  const { departureFlightInfo, returnFlightInfo, flightGeneralInfo } =
    useFlightSearchResultContext();

  const { push } = useRouter();

  const [isAgree, setIsAgree] = useState(false);

  const { passengers, setInvoiceCode } = useFlightInfoContext();

  const datePickerRef = useRef(null);

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<PassengerInformationI>({
    defaultValues: {
      contactInformation: {
        emailAddress: "",
        mobileNumber: "",
      },
      adults: [],
      children: [],
    },
    //@ts-ignore
    resolver: yupResolver(passengerInformationSchema),
  });

  const { fields: adultsFields, append: adultAppend } =
    useFieldArray<PassengerInformationI>({
      name: "adults",
      control,
    });

  const { fields: childFields, append: childAppend } =
    useFieldArray<PassengerInformationI>({
      name: "children",
      control,
    });

  useEffect(() => {
    if (passengers.adults) {
      [...Array(passengers.adults)].map(() => {
        if (adultsFields.length < passengers.adults) {
          return adultAppend({
            firstName: "",
            lastName: "",
            birthDate: "",
            nationality: { id: "", isCity: false, label: "" },
            passportExpiryDate: "",
            passportNumber: "",
            nationalId: "",
            gender: 1,
          });
        }
      });
    }
  }, []);

  useEffect(() => {
    if (passengers.children) {
      [...Array(passengers.children)].map(() => {
        return childAppend({
          firstName: "",
          lastName: "",
          birthDate: "",
          nationality: { id: "", isCity: false, label: "" },
          passportExpiryDate: "",
          passportNumber: "",
          nationalId: "",
          gender: 1,
        });
      });
    }
  }, []);

  const { postPriceDetailsAction, priceDetailsData } = usePostPriceDetail();

  useEffect(() => {
    postPriceDetailsAction({
      searchId: localStorage.getItem("searchId") as string,
      flightIds: returnFlightInfo.flightId
        ? [departureFlightInfo.flightId, returnFlightInfo.flightId]
        : [departureFlightInfo.flightId],
    });
  }, []);

  const { postAddToCardAction, postAddToCardLoading } = usePostAddToCard({
    onSuccess: ({ invoiceCode }) => {
      setInvoiceCode(invoiceCode);
      push("/payment");
    },
  });

  const onConfirm = (data: PassengerInformationI) => {
    const adultsInfo = changePassengerInformation(
      data.adults
        .map((adult) => ({
          ...adult,
          birthDate: convertJalaliToGregorian(adult?.birthDate),
          passportExpiryDate: convertJalaliToGregorian(
            adult?.passportExpiryDate
          ),
        }))
        .filter(({ firstName }) => !!firstName),
      "adult"
    );
    const childrenInfo = data?.children.length
      ? changePassengerInformation(
          data.children
            .map((child) => ({
              ...child,
              birthDate: convertJalaliToGregorian(child?.birthDate),
              passportExpiryDate: convertJalaliToGregorian(
                child?.passportExpiryDate
              ),
            }))
            .filter(({ firstName }) => !!firstName),
          "child"
        )
      : [];

    postAddToCardAction({
      searchId: localStorage.getItem("searchId") as string,
      passengersInfo: {
        emailAddess: data?.contactInformation?.emailAddress,
        telephoneNo: data?.contactInformation?.mobileNumber,
        mobileNo: {
          cellPhoneNumber: parsePhoneNumber(
            data?.contactInformation?.mobileNumber
          )?.nationalNumber as string,
          countryCode: `+${
            parsePhoneNumber(data?.contactInformation?.mobileNumber)
              ?.countryCallingCode as string
          }`,
        },
        passengers: [...adultsInfo, ...childrenInfo],
      },
      priceDetailIds: priceDetailsData?.priceDetails.map(
        ({ priceDetailID }) => priceDetailID
      ),
    });
  };

  const [adultCountrySearched, setAdultCountrySearched] = useState<string>("");

  const { countriesLoading, getCountriesAction, getCountriesData } =
    useGetCountry({
      count: 10,
      name: adultCountrySearched,
      form: "adultPassengerCountry",
    });

  return (
    <form className="bg-gray-200 pb-8" onSubmit={handleSubmit(onConfirm)}>
      <div className="lg:w-4/5 w-11/12 m-auto pt-8 pb-4">
        <TicketCard
          departureFlight={departureFlightInfo}
          currencyCode={flightGeneralInfo?.currencyCode}
          returnFlight={returnFlightInfo}
          groupFares={flightGeneralInfo?.groupFares}
          groupId={flightGeneralInfo?.groupId}
          id={flightGeneralInfo?.id}
          passengersCount={{
            adult: flightGeneralInfo.passengersCount.adult,
            child: flightGeneralInfo.passengersCount.child,
            infant: flightGeneralInfo.passengersCount.infant,
          }}
          oneAdultTotalFare={flightGeneralInfo?.oneAdultTotalFare}
          totalFareAmount={flightGeneralInfo?.totalFareAmount}
          isBookPage
          priceDetailsFareAmount={priceDetailsData?.totalFareAmount}
        />
      </div>
      <div className="lg:w-4/5 w-11/12 m-auto text-gray-500">
        <p> اطلاعات مسافران را در فرم زیر به‌صورت کامل و صحیح وارد کنید</p>
        <div className="bg-white py-8 px-7 mt-8 rounded-lg">
          {adultsFields.map(({ id }, index) => {
            return (
              <div className="pb-3 mt-6" key={id}>
                <div className="flex items-center justify-between">
                  <div>
                    <span>{index + 1}.</span>
                    <span className="px-1">بزرگسال</span>
                  </div>
                  <div>
                    <div className="ml-4 flex items-center">
                      <div className="block">
                        <span className="text-red-600 text-xs mt-1 ml-4">
                          {errors.adults?.[index]?.gender?.message}
                        </span>
                      </div>
                      <div className="flex">
                        <div>
                          <FormControl component="fieldset">
                            <Controller
                              name={`adults.${index}.gender`}
                              control={control}
                              render={({ field }) => (
                                <RadioGroup {...field}>
                                  <div className="flex">
                                    <FormControlLabel
                                      value={1}
                                      control={<Radio size="small" />}
                                      label="آقا"
                                    />
                                    <FormControlLabel
                                      value={2}
                                      control={<Radio size="small" />}
                                      label="خانم"
                                    />
                                  </div>
                                </RadioGroup>
                              )}
                            />
                          </FormControl>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:grid lg:grid-cols-4 mt-1">
                  <div className="my-4 lg:my-0">
                    <div className="block">
                      <label htmlFor="FirstName">نام لاتین</label>
                    </div>
                    <input
                      className={clsx(
                        "lg:w-10/12 w-full rounded-lg border border-gray-400 py-1 px-3 outline-none mt-1",
                        {
                          "border border-red-600":
                            errors.adults?.[index]?.firstName?.message,
                        }
                      )}
                      type="text"
                      id="FirstName"
                      {...register(`adults.${index}.firstName` as const)}
                    />
                    <p className="text-red-600 text-xs mt-1">
                      {errors.adults?.[index]?.firstName?.message}
                    </p>
                  </div>
                  <div className="my-4 lg:my-0">
                    <div className="block">
                      <label htmlFor="lastName">نام خانوادگی لاتین</label>
                    </div>
                    <input
                      className={clsx(
                        "lg:w-10/12 w-full rounded-lg border border-gray-400 py-1 px-3 outline-none mt-1",
                        {
                          "border border-red-600":
                            errors.adults?.[index]?.lastName?.message,
                        }
                      )}
                      type="text"
                      id="LastName"
                      {...register(`adults.${index}.lastName` as const)}
                    />
                    <p className="text-red-600 text-xs mt-1">
                      {errors.adults?.[index]?.lastName?.message}
                    </p>
                  </div>
                  <div className="my-4 lg:my-0">
                    <div className="block">
                      <label htmlFor="birthDate">تاریخ تولد</label>
                    </div>
                    <div>
                      <Box
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
                            width: "7rem",
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
                          ".rmdp-day:not(.rmdp-disabled,.rmdp-day-hidden) span:hover":
                            {
                              backgroundColor: "#FFC107",
                            },
                          ".rmdp-arrow-container:hover": {
                            backgroundColor: "#FFC107",
                          },
                          ".rmdp-range": {
                            backgroundColor: "#FFC107",
                          },
                        }}
                        className={clsx(
                          "lg:w-10/12 w-full rounded-lg border border-gray-400 outline-none mt-1",
                          {
                            "border border-red-600":
                              errors.adults?.[index]?.birthDate?.message,
                          }
                        )}
                      >
                        <Controller
                          name={`adults.${index}.birthDate`}
                          control={control}
                          render={({ field }) => (
                            <DatePicker
                              calendar={persian}
                              locale={persian_fa}
                              plugins={[<Toolbar position="bottom" key={0} />]}
                              {...field}
                              ref={datePickerRef}
                              value={field.value}
                              onChange={(value) => field.onChange(value)}
                              maxDate={persianTodayDate}
                            />
                          )}
                        />
                      </Box>
                      <p className="text-red-600 text-xs mt-1">
                        {errors.adults?.[index]?.birthDate?.message}
                      </p>
                    </div>
                  </div>
                  <div className="my-4 lg:my-0">
                    <div className="block">
                      <label htmlFor="Nationality">ملیت</label>
                    </div>

                    <Box
                      sx={{
                        ".MuiInputBase-root ": {
                          height: "32px",
                          padding: "0",
                        },
                        ".MuiOutlinedInput-root  ": {
                          padding: "0",
                          marginTop: "-4px",
                        },
                      }}
                    >
                      <SelectSearch
                        direction="rtl"
                        loading={countriesLoading}
                        className={clsx(
                          "lg:w-10/12 w-full lg:h-8 rounded-lg border border-gray-400 outline-none mt-1",
                          {
                            "border border-red-600":
                              errors.adults?.[index]?.nationality?.message,
                          }
                        )}
                        hasBorder={false}
                        control={control}
                        name={`adults.${index}.nationality`}
                        textSearched={adultCountrySearched}
                        setTextSearched={setAdultCountrySearched}
                        items={getCountriesData?.map(
                          ({ title, countryCode }) => ({
                            id: countryCode,
                            label: title,
                            isCity: false,
                          })
                        )}
                        initialValue={[{ id: "", label: "", isCity: false }]}
                      />
                    </Box>
                    <p className="text-red-600 text-xs mt-1">
                      {errors.adults?.[index]?.nationality?.message}
                    </p>
                  </div>
                  <div className="my-4 lg:my-0">
                    <div className="block">
                      <label htmlFor="National Id">کد ملی</label>
                    </div>
                    <input
                      className={clsx(
                        "lg:w-10/12 w-full rounded-lg border border-gray-400 py-1 px-3 outline-none mt-1",
                        {
                          "border border-red-600":
                            errors.adults?.[index]?.nationalId?.message,
                        }
                      )}
                      type="text"
                      id="nationalId"
                      {...register(`adults.${index}.nationalId` as const)}
                    />
                    <p className="text-red-600 text-xs mt-1">
                      {errors.adults?.[index]?.nationalId?.message}
                    </p>
                  </div>

                  <div className="my-4 lg:my-0">
                    <div className="block">
                      <label htmlFor="PassportNumber">شماره پاسپورت</label>
                    </div>
                    <input
                      className={clsx(
                        "lg:w-10/12 w-full rounded-lg border border-gray-400 py-1 px-3 outline-none mt-1",
                        {
                          "border border-red-600":
                            errors.adults?.[index]?.passportNumber?.message,
                        }
                      )}
                      type="text"
                      id="PassportNumber"
                      {...register(`adults.${index}.passportNumber` as const)}
                    />
                    <p className="text-red-600 text-xs mt-1">
                      {errors.adults?.[index]?.passportNumber?.message}
                    </p>
                  </div>
                  <div className="my-4 lg:my-0">
                    <div className="block">
                      <label htmlFor="PassportExpiryDate">
                        تاریخ انقضا پاسپورت
                      </label>
                    </div>
                    <div>
                      <Box
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
                            width: "7rem",
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
                          ".rmdp-day:not(.rmdp-disabled,.rmdp-day-hidden) span:hover":
                            {
                              backgroundColor: "#FFC107",
                            },
                          ".rmdp-arrow-container:hover": {
                            backgroundColor: "#FFC107",
                          },
                          ".rmdp-range": {
                            backgroundColor: "#FFC107",
                          },
                        }}
                        className={clsx(
                          "lg:w-10/12 w-full rounded-lg border border-gray-400 outline-none mt-1",
                          {
                            "border border-red-600":
                              errors.adults?.[index]?.passportExpiryDate
                                ?.message,
                          }
                        )}
                      >
                        <Controller
                          name={`adults.${index}.passportExpiryDate`}
                          control={control}
                          render={({ field }) => (
                            <DatePicker
                              calendar={persian}
                              locale={persian_fa}
                              plugins={[<Toolbar position="bottom" key={0} />]}
                              minDate={persianTodayDate}
                              {...field}
                              ref={datePickerRef}
                              value={field.value}
                              onChange={(value) => field.onChange(value)}
                            />
                          )}
                        />
                      </Box>
                      <p className="text-red-600 text-xs mt-1">
                        {errors.adults?.[index]?.passportExpiryDate?.message}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {childFields.map(({ id }, index) => {
            return (
              <div
                className="pb-3 mt-6 border-t-gray-200 border-t-2 pt-6 lg:border-none lg:pt-0"
                key={id}
              >
                <div className="flex items-center ">
                  <div>
                    <span>{index + 1}.</span>
                    <span className="px-1">کودک</span>
                  </div>
                  <div className="flex items-center ml-5">
                    <div className="block">
                      <span className="text-red-600 text-xs mt-1 ml-4">
                        {errors.children?.[index]?.gender?.message}
                      </span>
                    </div>
                    <div className="px-10 flex">
                      <div>
                        <FormControl component="fieldset">
                          <Controller
                            name={`children.${index}.gender`}
                            control={control}
                            render={({ field }) => (
                              <RadioGroup {...field}>
                                <div className="flex">
                                  <FormControlLabel
                                    value={1}
                                    control={<Radio size="small" />}
                                    label="آقا"
                                  />
                                  <FormControlLabel
                                    value={2}
                                    control={<Radio size="small" />}
                                    label="خانم"
                                  />
                                </div>
                              </RadioGroup>
                            )}
                          />
                        </FormControl>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:grid lg:grid-cols-4 ">
                  <div className="my-4 lg:my-0">
                    <div className="block">
                      <label htmlFor="FirstName">نام لاتین</label>
                    </div>
                    <input
                      className={clsx(
                        "lg:w-10/12 w-full rounded-lg border border-gray-400 py-1 px-3 outline-none mt-1",
                        {
                          "border border-red-600":
                            errors.children?.[index]?.firstName?.message,
                        }
                      )}
                      type="text"
                      id="FirstName"
                      {...register(`children.${index}.firstName` as const)}
                    />
                    <p className="text-red-600 text-xs mt-1">
                      {errors.children?.[index]?.firstName?.message}
                    </p>
                  </div>
                  <div className="my-4 lg:my-0">
                    <div className="block">
                      <label htmlFor="lastName">نام خانوادگی لاتین</label>
                    </div>
                    <input
                      className={clsx(
                        "lg:w-10/12 w-full rounded-lg border border-gray-400 py-1 px-3 outline-none mt-1",
                        {
                          "border border-red-600":
                            errors.children?.[index]?.lastName?.message,
                        }
                      )}
                      type="text"
                      id="LastName"
                      {...register(`children.${index}.lastName` as const)}
                    />
                    <p className="text-red-600 text-xs mt-1">
                      {errors.children?.[index]?.lastName?.message}
                    </p>
                  </div>
                  <div className="my-4 lg:my-0">
                    <div className="block">
                      <label htmlFor="birthDate">تاریخ تولد</label>
                    </div>
                    <div>
                      <Box
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
                            width: "7rem",
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
                          ".rmdp-day:not(.rmdp-disabled,.rmdp-day-hidden) span:hover":
                            {
                              backgroundColor: "#FFC107",
                            },
                          ".rmdp-arrow-container:hover": {
                            backgroundColor: "#FFC107",
                          },
                          ".rmdp-range": {
                            backgroundColor: "#FFC107",
                          },
                        }}
                        className={clsx(
                          "lg:w-10/12 w-full rounded-lg border border-gray-400 outline-none mt-1",
                          {
                            "border border-red-600":
                              errors.children?.[index]?.birthDate?.message,
                          }
                        )}
                      >
                        <Controller
                          name={`children.${index}.birthDate`}
                          control={control}
                          render={({ field }) => (
                            <DatePicker
                              {...field}
                              calendar={persian}
                              locale={persian_fa}
                              plugins={[<Toolbar position="bottom" key={0} />]}
                              ref={datePickerRef}
                              value={field.value}
                              onChange={(value) => field.onChange(value)}
                              maxDate={persianTodayDate}
                            />
                          )}
                        />
                      </Box>
                      <p className="text-red-600 text-xs mt-1">
                        {errors.children?.[index]?.birthDate?.message}
                      </p>
                    </div>
                  </div>
                  <div className="my-4 lg:my-0">
                    <div className="block">
                      <label htmlFor="Nationality">ملیت</label>
                    </div>
                    <Box
                      sx={{
                        ".MuiInputBase-root ": {
                          height: "32px",
                          padding: "0",
                        },
                        ".MuiOutlinedInput-root  ": {
                          padding: "0",
                          marginTop: "-4px",
                        },
                      }}
                    >
                      <SelectSearch
                        direction="rtl"
                        loading={countriesLoading}
                        className={clsx(
                          "lg:w-10/12 w-full lg:h-8 rounded-lg border border-gray-400 outline-none mt-1",
                          {
                            "border border-red-600":
                              errors.children?.[index]?.nationality?.message,
                          }
                        )}
                        hasBorder={false}
                        control={control}
                        name={`children.${index}.nationality`}
                        textSearched={adultCountrySearched}
                        setTextSearched={setAdultCountrySearched}
                        items={getCountriesData?.map(
                          ({ title, countryCode }) => ({
                            id: countryCode,
                            label: title,
                            isCity: false,
                          })
                        )}
                        initialValue={[{ id: "", label: "", isCity: false }]}
                      />
                    </Box>
                    <p className="text-red-600 text-xs mt-1">
                      {errors.children?.[index]?.nationality?.message}
                    </p>
                  </div>
                  <div className="my-4 lg:my-0">
                    <div className="block">
                      <label htmlFor="National Id">کد ملی</label>
                    </div>
                    <input
                      className={clsx(
                        "lg:w-10/12 w-full rounded-lg border border-gray-400 py-1 px-3 outline-none mt-1",
                        {
                          "border border-red-600":
                            errors.children?.[index]?.nationalId?.message,
                        }
                      )}
                      type="text"
                      id="nationalId"
                      {...register(`children.${index}.nationalId` as const)}
                    />
                    <p className="text-red-600 text-xs mt-1">
                      {errors.children?.[index]?.nationalId?.message}
                    </p>
                  </div>

                  <div className="my-4 lg:my-0">
                    <div className="block">
                      <label htmlFor="PassportNumber">شماره پاسپورت</label>
                    </div>
                    <input
                      className={clsx(
                        "lg:w-10/12 w-full rounded-lg border border-gray-400 py-1 px-3 outline-none mt-1",
                        {
                          "border border-red-600":
                            errors.children?.[index]?.passportNumber?.message,
                        }
                      )}
                      type="text"
                      id="PassportNumber"
                      {...register(`children.${index}.passportNumber` as const)}
                    />
                    <p className="text-red-600 text-xs mt-1">
                      {errors.children?.[index]?.passportNumber?.message}
                    </p>
                  </div>
                  <div className="my-4 lg:my-0">
                    <div className="block">
                      <label htmlFor="PassportExpiryDate">
                        تاریخ انقضا پاسپورت
                      </label>
                    </div>
                    <div>
                      <Box
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
                            width: "7rem",
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
                          ".rmdp-day:not(.rmdp-disabled,.rmdp-day-hidden) span:hover":
                            {
                              backgroundColor: "#FFC107",
                            },
                          ".rmdp-arrow-container:hover": {
                            backgroundColor: "#FFC107",
                          },
                          ".rmdp-range": {
                            backgroundColor: "#FFC107",
                          },
                        }}
                        className={clsx(
                          "lg:w-10/12 w-full rounded-lg border border-gray-400 outline-none mt-1",
                          {
                            "border border-red-600":
                              errors.children?.[index]?.birthDate?.message,
                          }
                        )}
                      >
                        <Controller
                          name={`children.${index}.passportExpiryDate`}
                          control={control}
                          render={({ field }) => (
                            <DatePicker
                              calendar={persian}
                              locale={persian_fa}
                              plugins={[<Toolbar position="bottom" key={0} />]}
                              minDate={persianTodayDate}
                              {...field}
                              ref={datePickerRef}
                              value={field.value}
                              onChange={(value) => field.onChange(value)}
                            />
                          )}
                        />
                      </Box>
                      <p className="text-red-600 text-xs mt-1">
                        {errors.children?.[index]?.passportExpiryDate?.message}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-gray-500 mt-5">اطلاعات خریدار را وارد کنید</p>
        <div className="mt-6 bg-white pb-6 px-7 rounded-lg">
          <div className="lg:flex gap-5 pt-5">
            <div className="lg:w-1/3 w-full">
              <label className="font-normal text-gray-500 text-sm">
                شماره موبایل
              </label>
              <Controller
                name="contactInformation.mobileNumber"
                control={control}
                render={({ field }) => (
                  <>
                    <PhoneInput
                      className={clsx(
                        "lg:w-10/12 w-full rounded-lg border border-gray-400 p-2 mt-2 outline-none",
                        {
                          "border border-red-600":
                            errors.contactInformation?.mobileNumber?.message,
                        }
                      )}
                      defaultCountry="IR"
                      onCountryChange={(country) => console.log(country)}
                      {...field}
                    />
                    <span className="text-red-600 text-xs w-full text-center">
                      {errors.contactInformation?.mobileNumber?.message}
                    </span>
                  </>
                )}
              />
            </div>
            <div className="lg:w-1/3 w-full mt-4 lg:mt-0">
              <p className="font-normal text-gray-500 text-sm">ایمیل</p>
              <input
                className={clsx(
                  "lg:w-10/12 w-full rounded-lg border border-gray-400 p-2 mt-3 outline-none",
                  {
                    "border border-red-600":
                      errors.contactInformation?.mobileNumber?.message,
                  }
                )}
                type="email"
                {...register("contactInformation.emailAddress")}
              />

              <p className="text-red-600 text-xs w-full mt-1">
                {errors.contactInformation?.emailAddress?.message}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="py-8 w-4/5 m-auto">
        <Checkbox
          checked={isAgree}
          onChecked={() => setIsAgree(true)}
          onUnChecked={() => setIsAgree(false)}
          label={
            <div>
              <p>
                قوانین و مقررات را می پذیرم (مشاهده کامل{" "}
                <Link
                  href="#"
                  className="text-primary border-b border-b-primary"
                >
                  قوانین و مقررات
                </Link>{" "}
                رزرو و ابطال بلیط)
              </p>
            </div>
          }
        />
      </div>
      {postAddToCardLoading ? (
        <div className="py-8 w-4/5 m-auto flex justify-center">
          <CircularProgress />
        </div>
      ) : (
        <div className="py-8 w-4/5 m-auto">
          <button
            disabled={!isAgree}
            type="submit"
            className={clsx(
              "rounded-full w-56 py-2 flex justify-center text-white font-bold text-lg m-auto",
              {
                "bg-gray-300": !isAgree,
                "bg-primary ": isAgree,
              }
            )}
          >
            ثبت اطلاعات
          </button>
        </div>
      )}
    </form>
  );
}
