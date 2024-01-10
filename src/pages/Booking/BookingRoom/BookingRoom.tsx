import { EmptyState } from 'Assets/Svg';
import { Button, DatePicker, SelectSearch, Tabs } from 'Common';
import { useAppContext } from 'Context';
import { convertDateToUtc, defaultDate } from 'Helpers';
import { useGetSearchHotelRooms } from 'Hooks/Search';
import { useGetVendorHotels } from 'Hooks/Vendors';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import CustomerInformation, {
  CustomerInformationI,
} from './Components/CustomerInformation';
import GuestsInformation from './Components/GuestsInformation';
import SelectRoom from './Components/SelectRoom';

export interface BookingRoomsFormI {
  hotelId: { id: string; label: string };
  startAndEndDate: {
    from: {
      day: number;
      year: number;
      month: number;
    };
    to: {
      day: number;
      year: number;
      month: number;
    };
  };
}

const defaultValues = {
  hotelId: { id: '', label: '' },
  startAndEndDate: defaultDate(),
};

export default function BookingRoom() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [adultCount, setAdultCount] = useState(0);
  const [childCount, setChildCount] = useState(0);
  const [customerInformation, setCustomerInformation] =
    useState<CustomerInformationI>();
  const [textSearched, setTextSearched] = useState<string>();

  const [roomCapacity, setRoomCapacity] = useState({
    extraCapacity: 0,
    standardCapacity: 0,
  });

  const { vendorIdSelected } = useAppContext();

  const { control, watch, setValue } = useForm<BookingRoomsFormI>({
    defaultValues,
  });

  const { hotelId, startAndEndDate } = watch();

  const { vendorsHotelsData, getVendorHotelLoading } = useGetVendorHotels({
    pageSize: 1000,
    hotelName: textSearched,
    enabled:
      typeof textSearched === 'string' ? textSearched?.length >= 2 : false,
    isActive: true,
  });

  const {
    searchHotelRoomsData,
    getSearchHotelRoomsAction,
    remove,
    isLoading,
  } = useGetSearchHotelRooms({
    hotelId: hotelId.id,
    checkIn: convertDateToUtc(startAndEndDate?.from) as string,
    checkOut: convertDateToUtc(
      startAndEndDate.to || {
        day: 10,
        year: 2023,
        month: 7,
      },
    ) as string,
    vendorId: vendorIdSelected,
  });

  useEffect(() => {
    setActiveTabIndex(0);
  }, [hotelId]);

  useEffect(() => {
    if (vendorIdSelected?.length < 23 && !toast.isActive('chooseVendor')) {
      toast.warning('Please choose your vendor', {
        position: 'top-center',
        style: {
          width: 'max-content',
        },
        toastId: 'chooseVendor',
      });
    }
  }, [vendorIdSelected?.length]);

  return (
    <>
      <h1
        className="text-gray-900 text-3xl font-medium"
        onClick={() => remove()}
        role="presentation"
      >
        Booking room
      </h1>
      <div className="flex w-full">
        <div className="flex gap-4 mt-14">
          <SelectSearch
            disabled={vendorIdSelected.length < 23}
            label="Stay"
            control={control}
            name="hotelId"
            items={vendorsHotelsData?.data.map(({ id, hotelNote }) => ({
              label: hotelNote,
              id,
            }))}
            containerClassName="w-64 h-11"
            setTextSearched={
              setTextSearched as React.Dispatch<
                React.SetStateAction<string>
              >
            }
            textSearched={textSearched as string}
            loading={getVendorHotelLoading}
            placeholder="Search Stay"
          />
          <DatePicker
            type="RangeDay"
            className="h-11 w-64"
            name="startAndEndDate"
            control={control}
            size="sm"
            placeholder="Select date"
            iconPosition="left"
            label="Date"
          />
          <Button
            className="w-44"
            containerClassName="mt-7"
            onClick={getSearchHotelRoomsAction}
            disabled={!hotelId}
          >
            Search
          </Button>
        </div>
      </div>
      {searchHotelRoomsData?.data?.length === 0 && !isLoading && (
        <div className="flex items-center w-full mt-14 bg-gray-50 py-10">
          <div className="m-auto text-center">
            <EmptyState />
            <h1 className="font-medium text-lg text-gray-900 mt-8">
              On this date , there is no availability for room reservation
            </h1>
          </div>
        </div>
      )}
      {hotelId && searchHotelRoomsData?.data[0] && (
        <Tabs
          activeTab={activeTabIndex}
          setActiveTabIndex={setActiveTabIndex}
          className="mt-6"
          tabs={[
            {
              name: 'Select Room',
              children: (
                <SelectRoom
                  rooms={searchHotelRoomsData?.data}
                  setActiveTabIndex={setActiveTabIndex}
                  setRoomCapacity={setRoomCapacity}
                />
              ),

              disabled: !(activeTabIndex === 0),
            },
            {
              name: 'Customer information',
              children: (
                <CustomerInformation
                  adultCount={adultCount}
                  childCount={childCount}
                  setAdultCount={setAdultCount}
                  setChildCount={setChildCount}
                  setActiveTabIndex={setActiveTabIndex}
                  setCustomerInformation={setCustomerInformation}
                  roomCapacity={roomCapacity}
                />
              ),
              disabled: !(activeTabIndex === 1),
            },
            {
              name: 'Guests information',
              children: (
                <GuestsInformation
                  adultCount={adultCount}
                  childCount={childCount}
                  setActiveTabIndex={setActiveTabIndex}
                  customerInformation={
                    customerInformation as CustomerInformationI
                  }
                  startAndEndDate={startAndEndDate}
                  setValue={setValue}
                />
              ),
              disabled: !(activeTabIndex === 2),
            },
          ]}
        />
      )}
    </>
  );
}
