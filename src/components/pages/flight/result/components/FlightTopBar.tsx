"use client";
import { AlphaFilterIcon } from "@/assets/svg";
import { useFlightSearchResultContext } from "@/context";
import clsx from "clsx";
import { useEffect } from "react";

const filters = [
  {
    id: 1,
    text: "قیمت",
    icon: <AlphaFilterIcon className="self-center" />,
    value: "OneAdultTotalFare",
  },
  {
    id: 2,
    text: "ساعت",
    icon: <AlphaFilterIcon className="self-center" />,
    value: "DepartureTimes",
  },
  {
    id: 3,
    text: "مدت پرواز",
    icon: <AlphaFilterIcon className="self-center" />,
    value: "TotalFlightDuration",
  },
  {
    id: 4,
    text: "توقف",
    icon: <AlphaFilterIcon className="self-center" />,
    value: "stops",
  },
];

export default function FlightTopBar() {
  const { filter, setFilter } = useFlightSearchResultContext();

  useEffect(() => {
    setFilter({ name: "", orderByDesc: false });
  }, []);

  const onFilterClick = (value: string) => {
    if (filter.name === value && !filter.orderByDesc) {
      setFilter({ name: value, orderByDesc: true });
    } else if (filter.name === value && filter.orderByDesc) {
      setFilter({ name: "", orderByDesc: false });
    } else {
      setFilter({ name: value, orderByDesc: false });
      console.log("final else");
    }
  };

  return (
    <div className="flex justify-between gap-3" style={{ direction: "rtl" }}>
      <div className="w-full cursor-pointer bg-white flex rounded-lg justify-between h-12 items-center">
        {filters.map(({ icon, id, text, value }, index) => (
          <div
            key={id}
            className={clsx(
              "flex px-4 w-1/4 justify-center gap-2 h-full items-center",
              {
                "border-r border-r-gray-300": index,
                "border-b-2 border-b-red-600": filter.name === value,
              }
            )}
            onClick={() => onFilterClick(value)}
          >
            <p className="lg:text-base text-xs">{text}</p>

            <div
              className={clsx({
                "rotate-180": filter.name === value && filter.orderByDesc,
              })}
            >
              {icon}
            </div>
          </div>
        ))}
      </div>
      {/* <div className="w-2/5 bg-white flex rounded-lg justify-between h-12 items-center px-2">
        <div className="cursor-pointer flex gap-2">
          <ChevronRight />
          <p>روز قبل</p>
        </div>
        <p className="font-medium text-sm">سه‌شنبه ۲۳ اردیبهشت</p>
        <div className="cursor-pointer flex gap-2">
          <p>روز بعد</p>
          <ChevronLeft />
        </div>
      </div> */}
    </div>
  );
}
