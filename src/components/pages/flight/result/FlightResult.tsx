"use client";
import { TicketCardLoading } from "@/components/common/loading";
import { useFlightSearchResultContext } from "@/context";
import { usePostSearchResult } from "@/hooks/search";
import { queryClient } from "@/providers/ReactQueryProvider";
import { useEffect, useState } from "react";

import InfiniteScroll from "react-infinite-scroll-component";

import {
  FrontDataFlightGroupsI,
  PostCreateSearchResultI,
} from "@/types/search";
import { Drawer } from "@mui/material";
import { Filter } from "react-feather";
import {
  EmptyState,
  ExpireTimeResult,
  FlightFilters,
  FlightTopBar,
  TicketCard,
} from "./components";

export default function FlightResult() {
  const [searchIdExpire, setSearchIdExpire] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  const [pageSize] = useState(5);
  const [data, setData] = useState<FrontDataFlightGroupsI[]>([]);
  const {
    airLineSelected,
    departureStops,
    arrivalStops,
    searchResult,
    searchResultLoading,
    setSearchResult,
    filter,
    priceFilter,
    isSystemFlight,
  } = useFlightSearchResultContext();

  useEffect(() => {
    if (!pageNumber) {
      setData(searchResult.flightGroups);
    } else {
      setData((pre) => [...pre, ...searchResult.flightGroups]);
    }
  }, [searchResult]);

  useEffect(() => {
    setData([]);
    setPageNumber(1);
  }, [
    localStorage.getItem("searchId"),
    filter,
    priceFilter,
    airLineSelected,
    departureStops,
    arrivalStops,
    isSystemFlight,
  ]);

  const { postSearchResultAction } = usePostSearchResult({
    onSuccess: (newData) => {
      setSearchResult(newData);
    },
  });

  const createSearchResultCatch: PostCreateSearchResultI | undefined =
    queryClient.getQueryData(["searchResult"]);

  const checkExpiration = () => {
    const savedData = localStorage.getItem("searchIdTime");
    if (savedData) {
      const timestamp = JSON.parse(savedData);

      const currentTime = new Date().getTime();
      const elapsedMinutes = (currentTime - timestamp) / (1000 * 60);

      if (elapsedMinutes >= 9) {
        setSearchIdExpire(true);
        localStorage.removeItem("searchIdTime");
      }
    }
  };

  useEffect(() => {
    const expirationInterval = setInterval(() => {
      checkExpiration();
    }, 60 * 100);

    return () => clearInterval(expirationInterval);
  }, []);

  useEffect(() => {
    if (localStorage.getItem("searchId")) {
      postSearchResultAction({
        page: pageNumber,
        pageSize,
        searchId: localStorage.getItem("searchId") as string,
        airlines: airLineSelected,
        departureStops,
        arrivalStops,
        orderBy: filter.name,
        orderByDesc: filter.orderByDesc,
        minTotalFareAmount: priceFilter?.[0],
        maxTotalFareAmount: priceFilter?.[1],
        systemFlight: isSystemFlight,
      });
    }
  }, [
    airLineSelected,
    departureStops,
    arrivalStops,
    postSearchResultAction,
    filter.name,
    filter.orderByDesc,
    priceFilter,
    pageNumber,
    pageSize,
    localStorage.getItem("searchId"),
    isSystemFlight,
  ]);

  return (
    <div className="bg-gray-200 pb-14">
      {searchIdExpire && (
        <ExpireTimeResult setSearchIdExpire={setSearchIdExpire} />
      )}
      <div className="lg:w-4/5 w-full flex m-auto gap-10 pt-4 justify-center lg:justify-normal">
        <FlightFilters className="hidden lg:block w-1/5 lg:sticky top-40" />
        <div className="pb-10 lg:w-4/5 w-11/12">
          <FlightTopBar />
          {searchResultLoading && !data.length && (
            <div>
              <TicketCardLoading />
              <TicketCardLoading />
              <TicketCardLoading />
            </div>
          )}
          <InfiniteScroll
            dataLength={data.length}
            next={() => setPageNumber((pre) => pre + 1)}
            hasMore={searchResult.totalRemaining > 0}
            loader={
              <div>
                <TicketCardLoading />
                <TicketCardLoading />
                <TicketCardLoading />
              </div>
            }
          >
            {createSearchResultCatch?.noResultFound ? (
              <EmptyState />
            ) : (
              data.map((flightGroup) => (
                <TicketCard
                  key={flightGroup.id}
                  departureFlight={flightGroup?.flights?.[0]}
                  currencyCode={flightGroup?.currencyCode}
                  returnFlight={flightGroup?.flights?.[1]}
                  groupFares={flightGroup?.groupFares}
                  groupId={flightGroup?.groupId}
                  id={flightGroup?.id}
                  passengersCount={{
                    adult: 1,
                    child: 0,
                    infant: 0,
                  }}
                  oneAdultTotalFare={flightGroup?.oneAdultTotalFare}
                  totalFareAmount={flightGroup?.totalFareAmount}
                />
              ))
            )}
          </InfiniteScroll>
        </div>
      </div>
      <div>
        <Drawer
          anchor="bottom"
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          sx={{
            [".MuiPaper-root"]: {},
          }}
        >
          <FlightFilters />
          <div
            className="w-full py-4 bg-red-600 text-white text-center"
            onClick={() => setIsDrawerOpen(false)}
          >
            بستن فیلتر
          </div>
        </Drawer>
      </div>
      <div
        className="fixed bottom-4 left-3 bg-blue-900 p-3 rounded-full lg:hidden"
        onClick={() => setIsDrawerOpen(true)}
      >
        <Filter color="white" />
      </div>
    </div>
  );
}
