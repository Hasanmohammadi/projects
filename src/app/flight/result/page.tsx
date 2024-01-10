"use client";

import { FlightSearchBox } from "@/components/pages/flight";
import FlightResult from "@/components/pages/flight/result";
import { useFlightInfoContext } from "@/context";
import { useState } from "react";

export default function Result() {
  const [searchBoxVisible, setSearchBoxVisible] = useState(false);
  const { arrivalPlace, departurePlace, departureDate, returnDate, wayType } =
    useFlightInfoContext();
  return (
    <>
      <div className="w-full bg-slate-200 sticky top-0 z-50 hidden lg:block">
        <FlightSearchBox />
      </div>
      <div
        className="w-full bg-gray-200 top-0 z-50 px-4 overflow-hidden lg:hidden"
        style={{
          height: !searchBoxVisible ? "0px" : `450px`,
          maxHeight: "auto",
          transition: "height 0.4s",
        }}
      >
        <FlightSearchBox />
      </div>
      <div
        className="flex lg:hidden justify-between w-full p-3 items-center"
        style={{
          background:
            "linear-gradient(44deg, rgba(6, 15, 58, 0.94) 0%, rgba(19, 50, 98, 0.97) 104.12%)",
        }}
      >
        <div className=" font-light text-xs text-white">
          <p>
            پرواز {departurePlace.id} به {arrivalPlace.id}
          </p>
          <div className="flex mt-1">
            <p>
              {wayType === "Round-trip" ? "رفت:" : "تاریخ:"} {departureDate}
            </p>
            <p className="mx-1"> </p>
            {wayType === "Round-trip" && <p>برگشت: {returnDate}</p>}
          </div>
        </div>
        <div>
          <div
            className="bg-primary text-white py-1 w-24 rounded-3xl flex justify-center cursor-pointer"
            onClick={() => setSearchBoxVisible((pre) => !pre)}
          >
            <p className="font-bold">{searchBoxVisible ? "بستن" : "تغییر"}</p>
          </div>
        </div>
      </div>
      <FlightResult />
    </>
  );
}
