"use client";

import {
  CalendarIcon,
  MinusCircleIcon,
  PlusCircleIcon,
  SearchIcon,
  Swap,
} from "@/assets/svg";
import {
  Input,
  Menu,
  RadioButton,
  Select,
  SelectSearch,
} from "@/components/common";
import { useFlightInfoContext, useFlightSearchResultContext } from "@/context";
import {
  addZeroBeforeNum,
  convertJalaliToGregorian,
  isDepartureDateBigger,
} from "@/helpers";
import { useGetAirports } from "@/hooks/airport";
import { usePostCreateSearch, usePostSearchResult } from "@/hooks/search";
import { SearchBoxFormI, SeparateDateI } from "@/types/flight";
import { Box, CircularProgress, MenuItem } from "@mui/material";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import persian from "react-date-object/calendars/persian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import persian_fa from "react-date-object/locales/persian_fa";
import { useForm } from "react-hook-form";
import DatePicker, { DateObject } from "react-multi-date-picker";
import Toolbar from "react-multi-date-picker/plugins/toolbar";

const persianTodayDate = new DateObject()
  .convert(persian, gregorian_en)
  .format();

interface FlightsPropsI {
  isInHeader?: boolean;
  className?: string;
}

export default function FlightSearchBox({
  isInHeader,
  className,
}: FlightsPropsI) {
  const { push } = useRouter();
  const pathname = usePathname();

  const {
    setDeparturePlace,
    setArrivalPlace,
    setDepartureDate,
    setReturnDate,
    setFlightClass,
    setWayType,
    setPassengers,
    setFlightType,
    arrivalPlace,
    departureDate,
    departurePlace,
    flightClass,
    flightType,
    passengers,
    returnDate,
    wayType,
  } = useFlightInfoContext();

  const {
    setSearchResult,
    setOpratorDetails,
    searchResultLoading,
    setPriceFilter,
  } = useFlightSearchResultContext();

  const [originSearched, setOriginSearched] = useState<string>("");
  const [arrivalSearched, setArrivalSearched] = useState<string>("");

  const datePickerRef = useRef<{ openCalendar: () => void } | null>(null);
  const departurDatePickerRef = useRef<{ openCalendar: () => void } | null>(
    null
  );

  const { control, watch, setValue, handleSubmit } = useForm<SearchBoxFormI>({
    defaultValues: {
      adults: passengers.adults,
      children: passengers.children,
      infants: passengers.infants,
      wayType,
      flightClass,
      flightType,
      returnDate,
      departureDate,
      arrival: arrivalPlace,
      departure: departurePlace,
    },
  });

  const formData = watch();

  const { getPlacesData: originPlaces, placesLoading: originLoading } =
    useGetAirports({
      count: 10,
      name: originSearched,
      place: "origin",
    });

  const {
    getPlacesData: destinationPlaces,
    placesLoading: destinationLoading,
  } = useGetAirports({
    count: 10,
    name: arrivalSearched,
    place: "destination",
  });

  const { postSearchResultAction } = usePostSearchResult({
    onSuccess: (newData, opratorDetails) => {
      setSearchResult(newData);
      setOpratorDetails(opratorDetails);
      setPriceFilter([newData.minTotalFareAmount, newData.maxTotalFareAmount]);
    },
  });

  const { postCreateSearchAction } = usePostCreateSearch({
    onSuccess: (searchId) => {
      postSearchResultAction({ searchId, page: 1, pageSize: 10 });
      localStorage.setItem("searchId", searchId);
      localStorage.setItem(
        "searchIdTime",
        JSON.stringify(new Date().getTime())
      );
      !pathname.includes("result") && push("flight/result");
    },
  });

  useEffect(() => {
    if (
      isDepartureDateBigger({
        departureDate: formData.departureDate,
        returnDate: formData.returnDate,
      })
    )
      setValue("returnDate", formData.departureDate);
  }, [formData.departureDate, formData.returnDate, setValue]);

  const handleDepartureDate = ({ day, year, month }: SeparateDateI) => {
    setValue("departureDate", `${year}/${month?.number}/${day}`);
  };

  const handleReturnDate = (data: SeparateDateI[]) => {
    setValue(
      "returnDate",
      `${data?.[0]?.year}/${addZeroBeforeNum(
        data?.[0]?.month?.number
      )}/${addZeroBeforeNum(data?.[0]?.day)}`
    );
  };

  const onSwap = () => {
    setValue("arrival", formData.departure);
    setValue("departure", formData.arrival);
  };

  const onSubmit = ({
    arrival,
    departure,
    departureDate,
    returnDate,
    adults,
    children,
    infants,
    wayType,
    flightClass,
    flightType,
  }: SearchBoxFormI) => {
    postCreateSearchAction({
      cabinClass: flightClass,
      returnDate:
        wayType === "Round-trip" ? convertJalaliToGregorian(returnDate) : "",
      departureDate: convertJalaliToGregorian(departureDate),
      hasReturnFlight: wayType === "Round-trip",
      travelerAvailAdultCount: adults,
      travelerAvailChildCount: children,
      travelerAvailInfantCount: infants,
      origin: departure.id,
      destination: arrival.id,
      allAirportsDestination: arrival.isCity,
      allAirportsOrigin: departure.isCity,
    });
    setArrivalPlace(arrival);
    setDeparturePlace(departure);
    setDepartureDate(departureDate);
    setReturnDate(returnDate);
    setPassengers({ adults, children, infants });
    setWayType(wayType);
    setFlightClass(flightClass);
    setFlightType(flightType);
    localStorage.removeItem("searchId");
  };

  return (
    <Box
      sx={{ direction: "rtl" }}
      className={clsx(" lg:w-4/5 m-auto rounded-lg py-4", {
        "pt-0": isInHeader,
        [className as string]: className,
      })}
    >
      <>
        {!isInHeader && (
          <div className="flex lg:justify-normal justify-center hidden">
            <p
              onClick={() => setValue("flightType", "domestic")}
              className={clsx("text-sm font-light pb-2 px-8 cursor-pointer", {
                "text-black border-b-2 border-b-primary":
                  formData.flightType === "domestic",
                "text-gray-400 border-b-2 border-b-gray-200":
                  formData.flightType !== "domestic",
              })}
            >
              پرواز داخلی
            </p>
            <p
              onClick={() => setValue("flightType", "international")}
              className={clsx("text-sm font-light pb-2 px-8 cursor-pointer ", {
                "text-black border-b-2 border-b-primary":
                  formData.flightType === "international",
                "text-gray-400 border-b-2 border-b-gray-200":
                  formData.flightType !== "international",
              })}
            >
              پرواز خارجی
            </p>
          </div>
        )}
        <div className="flex justify-center my-2 lg:block">
          <RadioButton
            control={control}
            name="wayType"
            sx={{ display: "flex", flexDirection: "row", gap: "18px" }}
            radios={[
              {
                radioText: (
                  <p className="text-gray-400 text-sm font-light">یک طرفه</p>
                ),
                value: "One Way",
                className: "w-22",
                size: "small",
              },
              {
                radioText: (
                  <p className="text-gray-400 text-sm font-light">دو طرفه</p>
                ),
                value: "Round-trip",
                className: "w-22",
                size: "small",
              },
            ]}
          />
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="lg:flex lg:bg-white w-full rounded-lg max-w-7xl lg:mt-4"
        >
          <div
            className={clsx(
              "lg:flex lg:w-1/2 lg:justify-between border flex-row lg:border-gray-300 rounded-lg lg:rounded-l-none bg-white ",
              { "h-11": isInHeader }
            )}
          >
            <SelectSearch
              direction="rtl"
              loading={originLoading}
              hasBorder={false}
              className="lg:w-1/2 lg:border-none border-b lg:border-gray-300"
              control={control}
              name="departure"
              setTextSearched={setOriginSearched}
              textSearched={originSearched}
              placeholder="مبدا"
              items={originPlaces?.map(({ iataCode, isCity, title }) => ({
                id: iataCode,
                label: title,
                isCity,
              }))}
              initialValue={[{ id: "", label: "", isCity: false }]}
            />
            <div
              className="cursor-pointer relative mx-4 border-r border-dashed border-r-gray-500"
              onClick={onSwap}
            >
              <Swap className="absolute cursor-pointer lg:-right-3 lg:top-4 -top-3" />
            </div>
            <SelectSearch
              direction="rtl"
              loading={destinationLoading}
              hasBorder={false}
              className="lg:w-1/2 "
              control={control}
              name="arrival"
              setTextSearched={setArrivalSearched}
              textSearched={arrivalSearched}
              placeholder="مقصد"
              items={destinationPlaces?.map(({ iataCode, isCity, title }) => ({
                id: iataCode,
                label: title,
                isCity,
              }))}
              initialValue={[{ id: "", label: "", isCity: false }]}
            />
          </div>
          <div className="flex bg-white rounded-lg lg:rounded-none mt-4 lg:mt-0 lg:w-1/3">
            <div
              className={clsx(
                "py-1 border lg:border-gray-300 border-r-0 pr-2 w-full flex ",
                {
                  "h-11 items-center": isInHeader,
                }
              )}
            >
              <div
                onClick={() => departurDatePickerRef?.current?.openCalendar()}
              >
                <CalendarIcon
                  color="#A2A2A2"
                  size={24}
                  className={clsx({ "mt-3 cursor-pointer": !isInHeader })}
                />
              </div>
              <div>
                {!isInHeader && (
                  <p
                    className="pr-5 cursor-pointer"
                    onClick={() =>
                      departurDatePickerRef?.current?.openCalendar()
                    }
                  >
                    تاریخ رفت
                  </p>
                )}
                <Box
                  className="pr-3 cursor-pointer"
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
                >
                  <DatePicker
                    calendar={persian}
                    locale={persian_fa}
                    plugins={[<Toolbar position="bottom" key={0} />]}
                    minDate={new DateObject()
                      .convert(persian, gregorian_en)
                      .format()}
                    value={departureDate ? departureDate : persianTodayDate}
                    onChange={(date) => handleDepartureDate(date as DateObject)}
                    numberOfMonths={1}
                    inputMode="text"
                    range={false}
                    className="cursor-pointer"
                    ref={departurDatePickerRef}
                  />
                </Box>
              </div>
            </div>
            <Box
              className={clsx(
                "py-1 border lg:border-gray-300 pr-2  w-full flex cursor-pointer",
                {
                  "cursor-default opacity-30": formData.wayType === "One Way",
                  "h-11 items-center": isInHeader,
                }
              )}
              onClick={() => {
                setValue("wayType", "Round-trip");
                if (formData.wayType === "One Way") {
                  setTimeout(() => {
                    datePickerRef?.current?.openCalendar();
                  }, 0);
                }
              }}
            >
              <div onClick={() => datePickerRef?.current?.openCalendar()}>
                <CalendarIcon
                  color="#A2A2A2"
                  size={24}
                  className={clsx({ "mt-3": !isInHeader })}
                />
              </div>
              <div className="w-full">
                {!isInHeader && (
                  <p
                    className="w-full pr-5"
                    onClick={() => datePickerRef?.current?.openCalendar()}
                  >
                    تاریخ برگشت
                  </p>
                )}
                {formData.wayType === "One Way" ? (
                  <p className="w-full pr-6">
                    {formData.returnDate
                      ? formData.returnDate
                      : formData.departureDate}
                  </p>
                ) : (
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
                  >
                    <DatePicker
                      calendar={persian}
                      locale={persian_fa}
                      plugins={[<Toolbar position="bottom" key={0} />]}
                      minDate={formData.departureDate}
                      ref={datePickerRef}
                      render={() => (
                        <Box
                          className="cursor-pointer w-full pr-6"
                          onClick={() => datePickerRef?.current?.openCalendar()}
                        >
                          {formData.returnDate
                            ? formData.returnDate
                            : formData.departureDate}
                        </Box>
                      )}
                      value={[formData.departureDate, formData.returnDate]}
                      onChange={(date) =>
                        handleReturnDate(date as DateObject[])
                      }
                      numberOfMonths={1}
                      inputMode="text"
                      range
                    />
                  </Box>
                )}
              </div>
            </Box>
          </div>

          <Menu
            className={clsx(
              "border border-l-0 lg:border-gray-300 lg:w-1/6 w-full py-2 mt-4 lg:mt-0 bg-white rounded-lg lg:rounded-none",
              {
                "h-11 py-0": isInHeader,
              }
            )}
            btnClassName="h-[42px]"
            hasArrow={false}
            btnText={
              <div className="flex text-base items-center font-normal">
                <p className="w-5">
                  {formData.adults + formData.children + formData.infants}
                </p>
                <p className="font-medium"> مسافر،</p>
                <p className="mr-1">
                  {formData.flightClass === "business" ? "بیزینس" : "اکونومی"}
                </p>
              </div>
            }
            menuItems={[
              {
                text: (
                  <Box className="flex gap-8 justify-between w-full">
                    <Select
                      className="h-8 w-full px-2"
                      containerClassName="w-full"
                      name="flightClass"
                      control={control}
                      direction="rtl"
                    >
                      <MenuItem
                        value="economy"
                        sx={{
                          display: "flex",
                          justifyContent: "end",
                        }}
                      >
                        <p>اکونومی</p>
                      </MenuItem>
                      <MenuItem
                        value="business"
                        sx={{
                          display: "flex",
                          justifyContent: "end",
                        }}
                      >
                        <p>بیزینس</p>
                      </MenuItem>
                    </Select>
                  </Box>
                ),
                onClick: () => {},
              },
              {
                text: (
                  <Box className="flex gap-8 justify-between w-full">
                    <span>بزرگسال</span>
                    <div className="flex gap-3">
                      <div
                        onClick={() => setValue("adults", formData.adults + 1)}
                      >
                        <PlusCircleIcon />
                      </div>
                      <span className="w-4 text-center">{formData.adults}</span>
                      <Input
                        control={control}
                        name="adults"
                        className="hidden"
                      />

                      <div
                        onClick={() => {
                          if (formData.adults > 1) {
                            setValue("adults", formData.adults - 1);
                          }
                        }}
                      >
                        <MinusCircleIcon />
                      </div>
                    </div>
                  </Box>
                ),
                onClick: () => {},
              },
              {
                text: (
                  <Box className="flex gap-8 justify-between w-full">
                    <span>کودک</span>
                    <div className="flex gap-3">
                      <div
                        onClick={() =>
                          setValue("children", formData.children + 1)
                        }
                      >
                        <PlusCircleIcon />
                      </div>

                      <span className="w-4 text-center">
                        {formData.children}
                      </span>
                      <div
                        onClick={() => {
                          if (formData.children > 0) {
                            setValue("children", formData.children - 1);
                          }
                        }}
                      >
                        <MinusCircleIcon />
                      </div>
                    </div>
                  </Box>
                ),
                onClick: () => {},
              },
              {
                text: (
                  <Box className="flex gap-8 justify-between w-full">
                    <span>نوزاد</span>
                    <div className="flex gap-3">
                      <div
                        onClick={() =>
                          setValue("infants", formData.infants + 1)
                        }
                      >
                        <PlusCircleIcon />
                      </div>
                      <span className="w-4 text-center">
                        {formData.infants}
                      </span>
                      <div
                        onClick={() => {
                          if (formData.infants > 0) {
                            setValue("infants", formData.children - 1);
                          }
                        }}
                      >
                        <MinusCircleIcon />
                      </div>
                    </div>
                  </Box>
                ),
                onClick: () => {},
              },
            ]}
          />
          <button
            type="submit"
            disabled={
              !formData.departure?.id ||
              !formData.arrival?.id ||
              searchResultLoading
            }
            className={clsx(
              "rounded-l-lg lg:w-24 w-full py-3 flex justify-center items-center mt-4 lg:mt-0",
              {
                "bg-primary cursor-pointer":
                  formData.departure?.id &&
                  formData.arrival?.id &&
                  !searchResultLoading,
                "bg-gray-300":
                  !formData.departure?.id ||
                  !formData.arrival?.id ||
                  searchResultLoading,
              }
            )}
          >
            {searchResultLoading ? (
              <CircularProgress size={30} />
            ) : (
              <>
                <SearchIcon className="hidden lg:block" />
                <p className="text-white lg:hidden">جستجو</p>
              </>
            )}
          </button>
        </form>
      </>
    </Box>
  );
}
