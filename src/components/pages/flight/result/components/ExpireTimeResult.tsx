import { ExpireTimeIcon, SafarestanLogo } from "@/assets/svg";
import { useFlightInfoContext, useFlightSearchResultContext } from "@/context";
import { convertJalaliToGregorian } from "@/helpers";
import { usePostCreateSearch, usePostSearchResult } from "@/hooks/search";
import { CircularProgress } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { createPortal } from "react-dom";

interface ExpireTimeResultI {
  setSearchIdExpire: Dispatch<SetStateAction<boolean>>;
}
export default function ExpireTimeResult({
  setSearchIdExpire,
}: ExpireTimeResultI) {
  const {
    setSearchResult,
    setOpratorDetails,
    setPriceFilter,
    searchResultLoading,
  } = useFlightSearchResultContext();

  const {
    arrivalPlace,
    departureDate,
    departurePlace,
    flightClass,
    passengers,
    returnDate,
    wayType,
  } = useFlightInfoContext();

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
    },
  });

  const onSubmit = () => {
    postCreateSearchAction({
      cabinClass: flightClass,
      returnDate:
        wayType === "Round-trip" ? convertJalaliToGregorian(returnDate) : "",
      departureDate: convertJalaliToGregorian(departureDate),
      hasReturnFlight: wayType === "Round-trip",
      travelerAvailAdultCount: passengers.adults,
      travelerAvailChildCount: passengers.children,
      travelerAvailInfantCount: passengers.infants,
      origin: departurePlace.id,
      destination: arrivalPlace.id,
      allAirportsDestination: arrivalPlace.isCity,
      allAirportsOrigin: departurePlace.isCity,
    });
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      setSearchIdExpire(false);
      localStorage.removeItem("searchId");
    }, 0);
  };

  return (
    <>
      {createPortal(
        <div
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-[60] expire-time-result"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
        >
          <div className="w-[700px] px-4 lg:px-0 h-screen lg:h-fit my-4 bg-white m-auto rounded-lg py-11 flex flex-col items-center gap-8 place-content-center">
            <SafarestanLogo className="block lg:hidden" />
            <ExpireTimeIcon />
            <div className="text-center">
              <p className="my-4">
                اطلاعات نمایش داده شده در این صفحه متعلق به لحظاتی پیش تر می
                باشند.
              </p>
              <p className="my-4">لطفا مجددا جستجو نمایید.</p>
            </div>
            <div
              className="bg-primary text-white py-2 w-52 rounded-3xl flex justify-center cursor-pointer"
              onClick={onSubmit}
            >
              {searchResultLoading ? (
                <CircularProgress />
              ) : (
                <p className="font-bold">جستجوی مجدد</p>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
