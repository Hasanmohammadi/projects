import { FrontDataFlightsI, GroupFareI } from "@/types/search";
import { Box } from "@mui/material";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "react-feather";

interface TicketResultPropsI {
  departureFlight: FrontDataFlightsI;
  returnFlight: FrontDataFlightsI;
}

export default function SubTicket({
  departureFlight,
  returnFlight,
}: TicketResultPropsI) {
  return (
    <>
      <div className="px-6 py-4 flex shadow-xl">
        <div className="w-[97%]">
          {!!returnFlight?.legs?.[0] && (
            <p className="text-base font-semibold text-gray-400">پرواز رفت</p>
          )}
          <div className="relative">
            {departureFlight?.legs.map((leg) => (
              <>
                <div>
                  <div className="w-full lg:flex justify-between block">
                    <div className="w-full">
                      <div className="flex gap-2">
                        <Image
                          src={leg.airLineLogoUrl}
                          width={40}
                          height={35}
                          className="mr-2 lg:block hidden"
                          alt="air line logo"
                        />
                        <Image
                          src={leg.airLineLogoUrl}
                          width={30}
                          height={25}
                          className="lg:mr-2 lg:hidden"
                          alt="air line logo"
                        />
                        <div className="flex lg:gap-4 gap-1 items-center">
                          <p className="text-gray-400 lg:font-medium font-normal lg:text-sm text-xs w-fit">
                            {leg?.marketerName}
                          </p>
                          <span className="text-gray-400">|</span>
                          <p className="text-gray-400 font-normal text-xs my-0.5">
                            {leg?.flightNumberDisplay}
                          </p>
                          <span className="text-gray-400">|</span>
                          <p className="text-gray-400 lg:font-medium font-normal lg:text-sm text-xs">
                            {departureFlight?.cabinClass === "ECONOMY"
                              ? "اکونومی"
                              : "بیزینس"}
                          </p>
                        </div>
                      </div>
                      <p className="lg:font-semibold font-medium text-xs lg:pr-14 text-gray-400 mt-2 lg:mt-0">
                        Operated by {leg.opratorName}
                      </p>
                    </div>
                    <div>
                      <div className="flex lg:justify-normal justify-end lg:mt-0 mt-3">
                        <div className="flex">
                          <p className="font-semibold text-base">
                            {leg?.departureTimeTimeOnly}
                          </p>
                          <span className="px-1">-</span>
                        </div>
                        <div>
                          <p className="w-28">
                            {departureFlight?.legs?.[0]?.arrivalTimeDateOnly} -
                          </p>
                        </div>
                        <div className="font-normal  flex mt-0.5">
                          <span>{leg?.departureCityName}</span>
                          <span>({leg?.departureAirport})</span>
                        </div>
                      </div>
                      <p className="font-normal text-xs text-end mt-1 text-gray-400">
                        {leg?.departureAirportName}
                      </p>
                    </div>
                    <div className="lg:hidden">
                      <div className="flex lg:justify-normal justify-end mt-4">
                        <div className="flex">
                          <p className="font-semibold text-base">
                            {leg?.arrivalTimeTimeOnly}
                          </p>
                          <span className="px-1">-</span>
                        </div>
                        <div>
                          <p className="w-28">
                            {departureFlight?.legs?.[0]?.arrivalTimeDateOnly} -
                          </p>
                        </div>
                        <div className="font-normal  flex mt-0.5">
                          <span>{leg?.arrivalCityName}</span>
                          <span>({leg?.arrivalAirport})</span>
                        </div>
                      </div>
                      <p className="font-normal text-xs text-end mt-1 text-gray-400">
                        {leg?.arrivalAirportName}
                      </p>
                    </div>
                  </div>
                  <div className="w-full lg:flex justify-between mt-5">
                    <div className="w-full ">
                      <div className="flex lg:gap-6 gap-4">
                        <div className="text-center">
                          <p className="text-gray-500 lg:text-base lg:font-normal text-xs font-light ">
                            کلاس نرخی
                          </p>
                          <p className="text-gray-600 lg:mt-0 mt-2 lg:text-base lg:font-normal text-sm font-normal">
                            {leg?.fareClass}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-gray-500 lg:text-base lg:font-normal text-xs font-light ">
                            شماره پرواز
                          </p>
                          <p className="text-gray-600 lg:mt-0 mt-2 lg:text-base lg:font-normal text-sm font-normal">
                            {leg?.flightNumberDisplay}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-gray-500 lg:text-base lg:font-normal text-xs font-light ">
                            مقدار بار مجاز
                          </p>
                          <p className="text-gray-600 lg:mt-0 mt-2 lg:text-base lg:font-normal text-sm font-normal">
                            {leg?.baggageItems?.[0]?.displayText_Short}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-gray-500 lg:text-base lg:font-normal text-xs font-light ">
                            نوع هواپیما
                          </p>
                          <p className="text-gray-600 lg:mt-0 mt-2 lg:text-base lg:font-normal text-sm font-normal">
                            {leg?.aircraftName}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="hidden lg:block">
                      <div className="flex">
                        <div className="flex">
                          <p className="font-semibold text-base">
                            {leg?.arrivalTimeTimeOnly}
                          </p>
                          <span className="px-1">-</span>
                        </div>
                        <div>
                          <p className="w-28">
                            {departureFlight?.legs?.[0]?.arrivalTimeDateOnly} -
                          </p>
                        </div>
                        <div className="font-normal  flex mt-0.5">
                          <span>{leg?.arrivalCityName}</span>
                          <span>({leg?.arrivalAirport})</span>
                        </div>
                      </div>
                      <p className="font-normal text-xs text-end mt-1 text-gray-400">
                        {leg?.arrivalAirportName}
                      </p>
                    </div>
                  </div>
                </div>
                {!!leg?.stopTimeToNextLegMinute && (
                  <div className="w-full flex justify-end mt-2 lg:mt-0">
                    <div className=" w-full lg:w-fit py-1 mt-2 lg:mb-2 mb-4 px-3 items-center flex lg:justify-end justify-center gap-2 bg-gray-300  rounded-full">
                      <p className="font-medium text-red-600">
                        مدت زمان توقف : {leg?.stopTimeToNextLegText}
                      </p>
                      <Box
                        sx={{
                          borderRadius: "100px",
                          width: "14px",
                          height: "14px",
                          background: "#FFC107",
                        }}
                      ></Box>
                    </div>
                  </div>
                )}
              </>
            ))}
          </div>
        </div>
        <div className="w-[3%] flex justify-end flex-col items-center relative lg:mr-0 mr-2">
          <ChevronUp color="#DDD" className="absolute -top-2" />
          <div className="border border-gray-300 h-full w-0"> </div>
          <ChevronDown color="#DDD" className="absolute -bottom-2" />
        </div>
      </div>
      {!!returnFlight?.legs?.[0] && (
        <div className="px-6 py-4 flex shadow-xl">
          <div className="w-[97%]">
            <p className="text-base font-semibold text-gray-400">پرواز برگشت</p>
            <div className="relative">
              {returnFlight?.legs.map((leg) => (
                <>
                  <div>
                    <div className="w-full lg:flex justify-between block">
                      <div className="w-full">
                        <div className="flex gap-2">
                          <Image
                            src={leg.airLineLogoUrl}
                            width={40}
                            height={35}
                            className="mr-2 lg:block hidden"
                            alt="air line logo"
                          />
                          <Image
                            src={leg.airLineLogoUrl}
                            width={30}
                            height={25}
                            className="lg:mr-2 lg:hidden"
                            alt="air line logo"
                          />
                          <div className="flex lg:gap-4 gap-1 items-center">
                            <p className="text-gray-400 lg:font-medium font-normal lg:text-sm text-xs w-fit">
                              {leg?.marketerName}
                            </p>
                            <span className="text-gray-400">|</span>
                            <p className="text-gray-400 font-normal text-xs my-0.5">
                              {leg?.flightNumberDisplay}
                            </p>
                            <span className="text-gray-400">|</span>
                            <p className="text-gray-400 lg:font-medium font-normal lg:text-sm text-xs">
                              {returnFlight?.cabinClass === "ECONOMY"
                                ? "اکونومی"
                                : "بیزینس"}
                            </p>
                          </div>
                        </div>
                        <p className="lg:font-semibold font-medium text-xs lg:pr-14 text-gray-400 mt-2 lg:mt-0">
                          Operated by {leg.opratorName}
                        </p>
                      </div>
                      <div>
                        <div className="flex lg:justify-normal justify-end lg:mt-0 mt-3">
                          <div className="flex">
                            <p className="font-semibold text-base">
                              {leg?.departureTimeTimeOnly}
                            </p>
                            <span className="px-1">-</span>
                          </div>
                          <div>
                            <p className="w-28">
                              {returnFlight?.legs?.[0]?.arrivalTimeDateOnly} -
                            </p>
                          </div>
                          <div className="font-normal  flex mt-0.5">
                            <span>{leg?.departureCityName}</span>
                            <span>({leg?.departureAirport})</span>
                          </div>
                        </div>
                        <p className="font-normal text-xs text-end mt-1 text-gray-400">
                          {leg?.departureAirportName}
                        </p>
                      </div>
                      <div className="lg:hidden">
                        <div className="flex lg:justify-normal justify-end mt-4">
                          <div className="flex">
                            <p className="font-semibold text-base">
                              {leg?.arrivalTimeTimeOnly}
                            </p>
                            <span className="px-1">-</span>
                          </div>
                          <div>
                            <p className="w-28">
                              {returnFlight?.legs?.[0]?.arrivalTimeDateOnly} -
                            </p>
                          </div>
                          <div className="font-normal  flex mt-0.5">
                            <span>{leg?.arrivalCityName}</span>
                            <span>({leg?.arrivalAirport})</span>
                          </div>
                        </div>
                        <p className="font-normal text-xs text-end mt-1 text-gray-400">
                          {leg?.arrivalAirportName}
                        </p>
                      </div>
                    </div>
                    <div className="w-full lg:flex justify-between mt-5">
                      <div className="w-full ">
                        <div className="flex lg:gap-6 gap-4">
                          <div className="text-center">
                            <p className="text-gray-500 lg:text-base lg:font-normal text-xs font-light ">
                              کلاس نرخی
                            </p>
                            <p className="text-gray-600 lg:mt-0 mt-2 lg:text-base lg:font-normal text-sm font-normal">
                              {leg?.fareClass}
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-gray-500 lg:text-base lg:font-normal text-xs font-light ">
                              شماره پرواز
                            </p>
                            <p className="text-gray-600 lg:mt-0 mt-2 lg:text-base lg:font-normal text-sm font-normal">
                              {leg?.flightNumberDisplay}
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-gray-500 lg:text-base lg:font-normal text-xs font-light ">
                              مقدار بار مجاز
                            </p>
                            <p className="text-gray-600 lg:mt-0 mt-2 lg:text-base lg:font-normal text-sm font-normal">
                              {leg?.baggageItems?.[0]?.displayText_Short}
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-gray-500 lg:text-base lg:font-normal text-xs font-light ">
                              نوع هواپیما
                            </p>
                            <p className="text-gray-600 lg:mt-0 mt-2 lg:text-base lg:font-normal text-sm font-normal">
                              {leg?.aircraftName}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="hidden lg:block">
                        <div className="flex">
                          <div className="flex">
                            <p className="font-semibold text-base">
                              {leg?.arrivalTimeTimeOnly}
                            </p>
                            <span className="px-1">-</span>
                          </div>
                          <div>
                            <p className="w-28">
                              {returnFlight?.legs?.[0]?.arrivalTimeDateOnly} -
                            </p>
                          </div>
                          <div className="font-normal  flex mt-0.5">
                            <span>{leg?.arrivalCityName}</span>
                            <span>({leg?.arrivalAirport})</span>
                          </div>
                        </div>
                        <p className="font-normal text-xs text-end mt-1 text-gray-400">
                          {leg?.arrivalAirportName}
                        </p>
                      </div>
                    </div>
                  </div>
                  {!!leg?.stopTimeToNextLegMinute && (
                    <div className="w-full flex justify-end mt-2 lg:mt-0">
                      <div className=" w-full lg:w-fit py-1 mt-2 lg:mb-2 mb-4 px-3 items-center flex lg:justify-end justify-center gap-2 bg-gray-300  rounded-full">
                        <p className="font-medium text-red-600">
                          مدت زمان توقف : {leg?.stopTimeToNextLegText}
                        </p>
                        <Box
                          sx={{
                            borderRadius: "100px",
                            width: "14px",
                            height: "14px",
                            background: "#FFC107",
                          }}
                        ></Box>
                      </div>
                    </div>
                  )}
                </>
              ))}
            </div>
          </div>
          <div className="w-[3%] flex justify-end flex-col items-center relative lg:mr-0 mr-2">
            <ChevronUp color="#DDD" className="absolute -top-2" />
            <div className="border border-gray-300 h-full w-0"> </div>
            <ChevronDown color="#DDD" className="absolute -bottom-2" />
          </div>
        </div>
      )}
    </>
  );
}
