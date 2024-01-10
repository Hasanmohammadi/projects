"use client";
import { AirplaneIcon, LongArrowIcon } from "@/assets/svg";
import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "react-feather";

import { Menu } from "@/components/common";
import { useFlightSearchResultContext } from "@/context";
import { convertMinutesToHoursAndMinutes } from "@/helpers";
import { FrontDataFlightsI, GroupFareI } from "@/types/search";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SubTicket from "./SubTicket";

interface TicketCardPropsI {
  departureFlight: FrontDataFlightsI;
  returnFlight: FrontDataFlightsI;
  groupFares: GroupFareI[];
  groupId: string;
  id: string;
  oneAdultTotalFare: number;
  totalFareAmount: number;
  currencyCode: string;
  passengersCount: {
    adult: number;
    child: number;
    infant: number;
  };
  isBookPage?: boolean;
  priceDetailsFareAmount?: number;
}

export default function TicketCard({
  currencyCode,
  departureFlight,
  groupFares,
  groupId,
  id,
  oneAdultTotalFare,
  passengersCount,
  returnFlight,
  totalFareAmount,
  isBookPage,
  priceDetailsFareAmount,
}: TicketCardPropsI) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [contentHeight, setContentHeight] = useState(0);
  const router = useRouter();

  const contentRef = useRef<HTMLDivElement>(null);

  const { setDepartureFlightInfo, setReturnFlightInfo, setFlightGeneralInfo } =
    useFlightSearchResultContext();

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [isCollapsed]);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const onBook = () => {
    setDepartureFlightInfo({
      cabinClass: departureFlight?.cabinClass,
      canBook: departureFlight?.canBook,
      canReserve: departureFlight?.canReserve,
      departureDate: departureFlight?.legs[0].departureTimeDateOnly,
      flightId: departureFlight?.flightId,
      connectionId: departureFlight?.connectionId,
      id: departureFlight?.id,
      legs: departureFlight?.legs,
      provider: departureFlight?.provider,
      stops: departureFlight?.stops,
      totalFareAmount: departureFlight?.totalFareAmount,
      totalFlightDuration: departureFlight?.totalFlightDuration,
    });

    setReturnFlightInfo({
      cabinClass: returnFlight?.cabinClass,
      canBook: returnFlight?.canBook,
      canReserve: returnFlight?.canReserve,
      departureDate: returnFlight?.legs[0].departureTimeDateOnly,
      flightId: returnFlight?.flightId,
      connectionId: returnFlight?.connectionId,
      id: returnFlight?.id,
      legs: returnFlight?.legs,
      provider: returnFlight?.provider,
      stops: returnFlight?.stops,
      totalFareAmount: returnFlight?.totalFareAmount,
      totalFlightDuration: returnFlight?.totalFlightDuration,
    });

    setFlightGeneralInfo({
      currencyCode,
      groupFares,
      groupId,
      id,
      oneAdultTotalFare,
      passengersCount,
      totalFareAmount,
    });

    router.push("/flight/book");
  };

  return (
    <div className="my-4 bg-white rounded-lg pb-1 w-full">
      <div className="lg:flex block">
        <div className="lg:w-2/3">
          <div
            className={clsx("px-5 lg:flex rounded-lg lg:h-20 justify-between", {
              "mt-5": !returnFlight?.legs?.[0],
            })}
          >
            <div className="lg:flex flex-col w-1/5 hidden">
              <Image
                src={departureFlight?.legs?.[0]?.airLineLogoUrl}
                alt="airline logo"
                width={50}
                height={40}
                className="mt-2"
              />
              <p className="text-[#808080] font-normal text-sm w-32 mt-1">
                {departureFlight?.legs?.[0]?.marketerName}
              </p>
            </div>
            <div className="lg:hidden flex items-center gap-4 justify-between">
              <Image
                src={departureFlight?.legs?.[0]?.airLineLogoUrl}
                alt="airline logo"
                width={50}
                height={20}
                className="mt-2"
              />
              <p className="font-semibold text-xs w-32 mt-4 text-end lg:text-start">
                {departureFlight?.legs?.[0]?.marketerName}
              </p>
            </div>
            <div className="flex flex-col items-center lg:w-4/5">
              <div className="flex gap-5 lg:mt-5 lg:justify-normal justify-center">
                <div className="lg:w-40">
                  <div className="flex gap-1 justify-center lg:text-base text-xs lg:font-normal font-light text-gray-400">
                    <p>{departureFlight?.legs?.[0]?.departureCityName}</p>
                    <p>({departureFlight?.legs?.[0]?.departureAirport})</p>
                  </div>
                  <div className="text-center mt-1">
                    <p className="lg:text-lg text-xs lg:font-semibold font-medium text-gray-600 ">
                      {departureFlight?.legs?.[0]?.departureTimeTimeOnly}
                    </p>
                  </div>
                </div>
                <div className="w-2/5">
                  <div className="flex justify-center relative">
                    <AirplaneIcon
                      color="#FFC107"
                      className="rotate-180"
                      height="21"
                      width="23"
                    />
                    <LongArrowIcon className="mt-1.5" />

                    <div className="text-primary text-sm  rounded-full absolute px-4 -top-3">
                      {departureFlight?.stops
                        ? `  توقف : ${departureFlight?.stops}`
                        : "بدون توقف"}
                    </div>
                  </div>
                  <div className="flex gap-2 text-gray-600 justify-center">
                    <p className="text-gray-400 lg:text-base text-xs lg:font-medium font-light mt-0.5 lg:mt-0">
                      زمان سفر
                    </p>
                    <p className="lg:text-gray-600 lg:text-base text-sm lg:font-medium font-light">
                      {convertMinutesToHoursAndMinutes(
                        departureFlight?.totalFlightDuration
                      )}
                    </p>
                  </div>
                </div>
                <div className="lg:w-40">
                  <div className="flex gap-1 justify-center lg:text-base text-xs lg:font-normal font-light text-gray-400">
                    <p>
                      {
                        departureFlight?.legs[departureFlight?.legs.length - 1]
                          ?.arrivalCityName
                      }
                    </p>
                    <p>
                      (
                      {
                        departureFlight?.legs[departureFlight?.legs.length - 1]
                          ?.arrivalAirport
                      }
                      )
                    </p>
                  </div>
                  <div className="text-center mt-1">
                    <p className="lg:text-lg text-xs lg:font-semibold font-medium text-gray-600 ">
                      {
                        departureFlight?.legs[departureFlight?.legs.length - 1]
                          ?.arrivalTimeTimeOnly
                      }
                    </p>
                  </div>
                </div>
              </div>
              <div> </div>
            </div>
          </div>

          {/*  */}
          {!!returnFlight?.legs?.[0] && (
            <div className=" px-5 lg:flex bg-white rounded-lg lg:h-20 justify-between mt-2 pt-1 border-t border-t-gray-200">
              <div className="lg:flex flex-col w-1/5 hidden">
                <Image
                  src={returnFlight?.legs?.[0]?.airLineLogoUrl}
                  alt="airline logo"
                  width={50}
                  height={40}
                  className="mt-1"
                />
                <p className="text-[#808080] font-normal text-sm w-32 mt-1">
                  {returnFlight?.legs?.[0]?.marketerName}
                </p>
              </div>
              <div className="lg:hidden flex items-center gap-4 justify-between">
                <Image
                  src={returnFlight?.legs?.[0]?.airLineLogoUrl}
                  alt="airline logo"
                  width={50}
                  height={20}
                  className="mt-2"
                />
                <p className="font-semibold text-xs w-32 mt-4 text-end lg:text-start">
                  {returnFlight?.legs?.[0]?.marketerName}
                </p>
              </div>

              <div className="flex flex-col items-center lg:w-4/5">
                <div className="flex gap-5 lg:mt-5 mt-2">
                  <div className="lg:w-40">
                    <div className="flex gap-1 justify-center lg:text-base text-xs lg:font-normal font-light text-gray-400">
                      <p>{returnFlight?.legs?.[0]?.departureCityName}</p>
                      <p>({returnFlight?.legs?.[0]?.departureAirport})</p>
                    </div>
                    <div className="text-center mt-1">
                      <p className="lg:text-lg text-xs lg:font-semibold font-medium text-gray-600 ">
                        {returnFlight?.legs?.[0]?.departureTimeTimeOnly}
                      </p>
                    </div>
                  </div>
                  <div className="w-2/5">
                    <div className="flex justify-center relative">
                      <AirplaneIcon
                        color="#FFC107"
                        className="rotate-180"
                        height="21"
                        width="23"
                      />
                      <LongArrowIcon className="mt-1.5" />
                      <div className="text-primary text-sm  rounded-full absolute px-4 -top-3">
                        {returnFlight?.stops
                          ? `  توقف : ${returnFlight?.stops}`
                          : "بدون توقف"}
                      </div>
                    </div>
                    <div className="flex gap-2 text-gray-600 justify-center">
                      <p className="text-gray-400 lg:text-base text-xs lg:font-medium font-light mt-0.5 lg:mt-0">
                        زمان سفر
                      </p>
                      <p className="lg:text-gray-600 lg:text-base text-sm lg:font-medium font-light">
                        {convertMinutesToHoursAndMinutes(
                          returnFlight?.totalFlightDuration
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="lg:w-40">
                    <div className="flex gap-1 justify-center lg:text-base text-xs lg:font-normal font-light text-gray-400">
                      <p>
                        {
                          returnFlight?.legs[returnFlight?.legs.length - 1]
                            .arrivalCityName
                        }
                      </p>
                      <p>
                        (
                        {
                          returnFlight?.legs[returnFlight?.legs.length - 1]
                            .arrivalAirport
                        }
                        )
                      </p>
                    </div>
                    <div className="text-center mt-1">
                      <p className="lg:text-lg text-xs lg:font-semibold font-medium text-gray-600 ">
                        {
                          returnFlight?.legs[returnFlight?.legs.length - 1]
                            ?.arrivalTimeTimeOnly
                        }
                      </p>
                    </div>
                  </div>
                </div>
                <div> </div>
              </div>
            </div>
          )}

          {/*  */}
        </div>

        <div className=" lg:w-2/6 h-auto lg:border-r-2 lg:border-r-[#DDD] lg:border-dashed lg:flex lg:pr-4 gap-4 mt-4 lg:mt-0">
          <div
            className={clsx(
              "flex lg:flex-col justify-center  items-center h-full lg:w-2/3 pl-4 lg:pl-0 lg:pt-1",
              {
                "gap-4": returnFlight?.legs && !!returnFlight?.legs[0],
                "gap-2 py-2": returnFlight?.legs && !returnFlight?.legs[0],
              }
            )}
          >
            <div className="flex gap-2 w-full justify-center">
              <p className="font-bold text-lg">
                {isBookPage &&
                  priceDetailsFareAmount &&
                  priceDetailsFareAmount.toLocaleString()}
                {!isBookPage && totalFareAmount.toLocaleString()}
              </p>
              <p className="mt-0.5 font-bold">ریال</p>
            </div>
            {!isBookPage && (
              <div>
                <div
                  onClick={onBook}
                  className="bg-primary text-white lg:py-2 py-1 lg:w-36 w-28 rounded-3xl flex justify-center cursor-pointer"
                >
                  <p className="font-bold">انتخاب پرواز</p>
                </div>
                <div className="w-full flex  justify-center ">
                  <Menu
                    hasArrow={false}
                    btnText={
                      <p className="text-primary cursor-pointer border-b border-b-primary lg:text-base text-xs lg:font-normal font-light">
                        جزییات قیمت
                      </p>
                    }
                    menuItems={[
                      {
                        text: (
                          <div className="w-56 rounded-lg">
                            {groupFares.map(
                              ({ quantity, displayedTotal, passengerType }) => (
                                <div
                                  className="flex justify-between my-2"
                                  key={passengerType}
                                >
                                  <div className="flex gap-1">
                                    <span>{quantity}</span>
                                    <span>
                                      {passengerType === "ADULT" && "بزرگسال"}
                                      {passengerType === "CHILD" && "کودک"}
                                      {passengerType === "INFANT" && "نوزاد"}
                                    </span>
                                  </div>
                                  <div className="flex gap-1">
                                    <span>
                                      {displayedTotal.toLocaleString()}
                                    </span>
                                    <span>ریال</span>
                                  </div>
                                </div>
                              )
                            )}
                            <div className="w-full border-t-2 border-t-gray-300  border-dashed flex justify-center pt-4 gap-1">
                              <span className="mt-0.5 font-semibold">
                                {totalFareAmount.toLocaleString()}
                              </span>
                              <span className="mt-0.5 font-medium">ریال</span>
                            </div>
                          </div>
                        ),
                        onClick: () => {},
                      },
                    ]}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="h-full flex items-center lg:justify-normal justify-center">
            {isCollapsed && (
              <ChevronDown
                color="#FFC107"
                className="cursor-pointer"
                onClick={toggleCollapse}
              />
            )}
            {!isCollapsed && (
              <ChevronUp
                className="cursor-pointer"
                onClick={toggleCollapse}
                color="#FFC107"
              />
            )}
          </div>
        </div>
      </div>
      <Box
        sx={{
          height: isCollapsed ? "0px" : `${contentHeight}px`,
          maxHeight: "auto",
          backgroundColor: "white",
          borderRadius: "12px",
          borderTop: isCollapsed ? "none" : "2px dashed #DDD",
          overflow: "hidden",
          transition: "height 0.4s",
        }}
        className="shadow-xl"
      >
        <div ref={contentRef}>
          {/* <Collapseitem
            departureFlight={departureFlight}
            returnFlight={returnFlight}
            groupFares={groupFares}
            oneAdultTotalFare={oneAdultTotalFare}
            totalFareAmount={totalFareAmount}
            onBook={onBook}
          /> */}
          <SubTicket
            departureFlight={departureFlight}
            returnFlight={returnFlight}
          />
        </div>
      </Box>
    </div>
  );
}
