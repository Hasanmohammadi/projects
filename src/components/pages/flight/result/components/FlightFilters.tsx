"use client";
import { useEffect } from "react";

import { Checkbox, Collapse } from "@/components/common";
import { useFlightInfoContext, useFlightSearchResultContext } from "@/context";
import RangeFilter from "./RangeFilter";
import clsx from "clsx";

export default function FlightFilters({ className }: { className?: string }) {
  const {
    opratorDetails,
    airLineSelected,
    setAirLineSelected,
    departureStops,
    setDepartureStops,
    arrivalStops,
    setArrivalStops,
    searchResult,
    searchResultLoading,
    setIsSystemFlight,
    isSystemFlight,
  } = useFlightSearchResultContext();
  const { wayType } = useFlightInfoContext();

  const onAddAirLine = (value: string) => {
    if (!airLineSelected.includes(value)) {
      setAirLineSelected([...airLineSelected, value]);
    }
  };
  const onRemoveAirline = (value: string) => {
    const x = [...airLineSelected];
    const y = x.filter((airline) => airline !== value);
    setAirLineSelected(y);
  };

  const onAddDepartureStops = (stop: number) => {
    if (!departureStops.includes(stop)) {
      setDepartureStops([...departureStops, stop]);
    }
  };
  const onRemoveDepartureStops = (stop: number) => {
    const x = [...departureStops];
    const y = x.filter((airline) => airline !== stop);
    setDepartureStops(y);
  };

  const onAddArrivalStops = (stop: number) => {
    if (!arrivalStops.includes(stop)) {
      setArrivalStops([...arrivalStops, stop]);
    }
  };
  const onRemoveArrivalStops = (stop: number) => {
    const x = [...arrivalStops];
    const y = x.filter((airline) => airline !== stop);
    setArrivalStops(y);
  };

  useEffect(() => {
    setAirLineSelected([]);
    setDepartureStops([]);
    setArrivalStops([]);
    setIsSystemFlight(null);
  }, []);

  return (
    <div
      className={clsx(className, "bg-white rounded-lg py-4 h-fit")}
      style={{ direction: "rtl" }}
    >
      <div className="flex justify-between items-center border-b-2 border-b-gray-200 px-4 pb-3">
        <p className="text-gray-600 font-medium text-lg">فیلترها</p>
        {/* {hasFilter && (
          <div className="flex gap-3">
            <p className="text-gray-400 font-medium text-base">لغو فیلترها</p>
            <span className="text-gray-400 font-medium text-lg cursor-pointer self-center">
              <XSquare size={20} />
            </span>
          </div>
        )} */}
      </div>
      <Collapse
        className="mt-2 px-4"
        title="تعداد توقف (مسیر رفت)"
        additionalHeight={5}
        loading={searchResultLoading}
      >
        <>
          <Checkbox
            hasBorder={false}
            className="my-2"
            label={<span className="text-gray-400">بدون توقف</span>}
            checked={departureStops.includes(1)}
            onChecked={() => onAddDepartureStops(1)}
            onUnChecked={() => onRemoveDepartureStops(1)}
          />
          <Checkbox
            hasBorder={false}
            className="my-2"
            label={<span className="text-gray-400">یک توقف</span>}
            checked={departureStops.includes(2)}
            onChecked={() => onAddDepartureStops(2)}
            onUnChecked={() => onRemoveDepartureStops(2)}
          />
          <Checkbox
            hasBorder={false}
            className="my-2"
            label={<span className="text-gray-400">دو توقف و بیشتر</span>}
            checked={departureStops.includes(3)}
            onChecked={() => onAddDepartureStops(3)}
            onUnChecked={() => onRemoveDepartureStops(3)}
          />
        </>
      </Collapse>

      {wayType === "Round-trip" && (
        <Collapse
          loading={searchResultLoading}
          className="mt-4 px-4"
          title="تعداد توقف (مسیر برگشت)"
          additionalHeight={5}
        >
          <>
            <Checkbox
              hasBorder={false}
              className="my-2"
              label={<span className="text-gray-400">بدون توقف</span>}
              checked={arrivalStops.includes(1)}
              onChecked={() => onAddArrivalStops(1)}
              onUnChecked={() => onRemoveArrivalStops(1)}
            />
            <Checkbox
              hasBorder={false}
              className="my-2"
              label={<span className="text-gray-400">یک توقف</span>}
              checked={arrivalStops.includes(2)}
              onChecked={() => onAddArrivalStops(2)}
              onUnChecked={() => onRemoveArrivalStops(2)}
            />
            <Checkbox
              hasBorder={false}
              className="my-2"
              label={<span className="text-gray-400">دو توقف و بیشتر</span>}
              checked={arrivalStops.includes(3)}
              onChecked={() => onAddArrivalStops(3)}
              onUnChecked={() => onRemoveArrivalStops(3)}
            />
          </>
        </Collapse>
      )}
      <Collapse
        className="mt-4 px-4"
        title="شرکت های هواپیمایی"
        additionalHeight={5}
        loading={searchResultLoading}
      >
        <div>
          {opratorDetails.map(({ opratorName, opratorCode }) => (
            <>
              <Checkbox
                hasBorder={false}
                className="my-2"
                label={<span className="text-gray-400">{opratorName}</span>}
                checked={airLineSelected.includes(opratorName)}
                onChecked={() => onAddAirLine(opratorCode)}
                onUnChecked={() => onRemoveAirline(opratorCode)}
              />
            </>
          ))}
        </div>
      </Collapse>
      <Collapse className="mt-4 px-4" title="بازه قیمت" additionalHeight={30}>
        <div className="pt-2">
          <RangeFilter
            className="w-40 m-auto"
            currency="ريال"
            maxValue={searchResult.maxTotalFareAmount}
            minValue={searchResult.minTotalFareAmount}
          />
        </div>
      </Collapse>

      <Collapse
        className="mt-4 px-4"
        additionalHeight={6}
        title="نوع بلیط"
        loading={searchResultLoading}
      >
        <>
          <Checkbox
            hasBorder={false}
            className="my-2"
            onChecked={() => setIsSystemFlight(true)}
            onUnChecked={() => setIsSystemFlight(null)}
            label={<span className="text-gray-400">سیستمی</span>}
            checked={!!isSystemFlight}
          />
          <Checkbox
            hasBorder={false}
            className="my-2"
            label={<span className="text-gray-400">چارتری</span>}
            onChecked={() => setIsSystemFlight(false)}
            onUnChecked={() => setIsSystemFlight(null)}
            checked={!isSystemFlight}
          />
        </>
      </Collapse>
    </div>
  );
}
