import { MenuItem } from '@mui/material';
import { EmptyState } from 'Assets/Svg';
import { Button, DatePicker, Select, SelectSearch } from 'Common';
import { useAppContext } from 'Context';
import { defaultDate } from 'Helpers';
import {
  useGetSalesChannelsList,
  useGetVendorSalesChannels,
} from 'Hooks/SalesChannels';
import { useGetVendorHotels } from 'Hooks/Vendors';
import { useGetVendorHotelRoomMarketList } from 'Hooks/Vendors/VendorHotelRooms';
import useGetVendorHotelRooms from 'Hooks/Vendors/useGetVendorHotelRooms';
import { CurrencyInfoI } from 'Types/SalesChannels';
import { VendorHotelsDataI } from 'Types/Vendors';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import PriceTable from './PriceTable';

export interface DateI {
  from: {
    day: number;
    month: number;
    year: number;
  };
  to: {
    day: number;
    month: number;
    year: number;
  };
}

interface SelectsI {
  hotel: { label: string; id: string };
  salesChannels: string;
  room: string;
  startAndExpireDate: DateI;
}

export default function Price() {
  const { setHotelId, vendorIdSelected, setRoomId, roomId } =
    useAppContext();
  const [textSearched, setTextSearched] = useState<string>();

  const [currencyInfo, setCurrencyInfo] = useState<CurrencyInfoI>();
  const { control, watch, handleSubmit, setValue } = useForm<SelectsI>({
    defaultValues: {
      hotel: { id: '', label: '' },
      salesChannels: '',
      room: '',
      startAndExpireDate: defaultDate(),
    },
  });

  const { vendorSalesChannelListData } = useGetVendorSalesChannels({
    enabled: vendorIdSelected.length > 23,
    pageDataSize: 1000,
  });

  const {
    hotel,
    room,
    salesChannels,
    startAndExpireDate: { from, to },
  } = watch();

  useEffect(() => {
    setValue('room', '');
    setValue('salesChannels', '');
  }, [hotel]);

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

  const { vendorsHotelsData, getVendorHotelLoading } = useGetVendorHotels({
    pageSize: 1000,
    hotelName: textSearched,
    enabled:
      typeof textSearched === 'string' ? textSearched?.length >= 2 : false,
    isActive: true,
  });

  const { vendorHotelRoomsData, getVendorHotelRoomsAction } =
    useGetVendorHotelRooms({
      hotelId: hotel?.id,
    });

  useEffect(() => {
    setValue('room', '');
    getVendorHotelRoomsAction().catch((err) => console.log(err));
    vendorSalesChannelListData?.data?.forEach(({ id, currency }) => {
      if (id === salesChannels) {
        setCurrencyInfo(currency);
      }
    });
  }, [salesChannels]);

  const {
    VendorHotelRoomMarketListData,
    isLoading,
    vendorHotelRoomMarketListAction,
  } = useGetVendorHotelRoomMarketList({
    date: {
      from: `${from?.year}-${from?.month}-${from?.day}`,
      to: `${to?.year}-${to?.month}-${to?.day}`,
    },
    salesChannelId: salesChannels,
    roomId: room,
  });

  useEffect(() => {
    setHotelId(hotel?.id);
    return () => {
      setHotelId('');
      setRoomId('');
    };
  }, [hotel?.id, salesChannels, setHotelId, setRoomId]);

  const onConfirm = async (data: SelectsI) => {
    setRoomId(data.room);
    await vendorHotelRoomMarketListAction();
  };

  return (
    <div className="pb-7">
      <h1 className="text-gray-900 font-medium text-3xl">Price</h1>
      <>
        <div className="mt-9 flex justify-between w-full">
          <form
            className="flex gap-4 mt-2.5 w-full"
            onSubmit={handleSubmit(onConfirm)}
          >
            <SelectSearch
              disabled={vendorIdSelected.length < 23}
              label="Stay"
              control={control}
              name="hotel"
              items={vendorsHotelsData?.data.map(({ id, hotelNote }) => ({
                label: hotelNote,
                id,
              }))}
              className="w-full h-11"
              containerClassName="w-1/4"
              setTextSearched={
                setTextSearched as React.Dispatch<
                  React.SetStateAction<string>
                >
              }
              textSearched={textSearched as string}
              loading={getVendorHotelLoading}
              placeholder="Search Stay"
            />
            <Select
              defaultValue="none"
              className="w-full h-11"
              control={control}
              name="salesChannels"
              containerClassName="w-1/4"
              disabled={hotel?.id?.length < 30}
              label="Sales Channel"
            >
              <MenuItem value="">
                <span className="text-sm text-gray-400">
                  Select sales channel
                </span>
              </MenuItem>
              {vendorSalesChannelListData?.data
                .filter(({ isActive }) => isActive)
                .map(({ name, id }) => (
                  <MenuItem key={id} value={id}>
                    <span className="text-sm">{name}</span>
                  </MenuItem>
                ))}
            </Select>
            <Select
              defaultValue="none"
              className="w-full h-11"
              control={control}
              name="room"
              label="Room"
              containerClassName="w-1/4"
              disabled={salesChannels?.length < 30}
            >
              <MenuItem value="" disabled>
                <span className="text-sm text-gray-400">Select room</span>
              </MenuItem>
              {vendorHotelRoomsData?.data[0]?.vendorRooms
                .filter(({ active }) => active)
                .map(({ roomName, id }) => (
                  <MenuItem key={id} value={id}>
                    <span className="text-sm">{roomName}</span>
                  </MenuItem>
                ))}
            </Select>
            <DatePicker
              type="RangeDay"
              className="h-11 w-64"
              name="startAndExpireDate"
              control={control}
              size="sm"
              placeholder="Select date"
              iconPosition="left"
              label="Date"
            />
            <Button
              className="h-11 w-full"
              containerClassName="w-1/5 mt-7"
              type="submit"
              disabled={hotel?.id?.length < 30 || room?.length < 30}
              loading={isLoading}
            >
              Confirm
            </Button>
          </form>
        </div>
        {VendorHotelRoomMarketListData?.data.length === 0 && (
          <div className="flex items-center w-full mt-14 bg-gray-50 py-10">
            <div className="m-auto text-center">
              <EmptyState />
              <h1 className="font-medium text-lg text-gray-900 mt-8">
                Available room not found
              </h1>
            </div>
          </div>
        )}
        {!isLoading &&
          roomId &&
          VendorHotelRoomMarketListData?.data[0] && (
            <>
              <div className="mt-14">
                <PriceTable
                  VendorHotelRoomMarketListData={
                    VendorHotelRoomMarketListData
                  }
                  priceDate={{ from, to } as DateI}
                  vendorSalesChannelListData={vendorSalesChannelListData}
                  vendorsHotelsData={
                    vendorsHotelsData as VendorHotelsDataI
                  }
                  salesChannelId={salesChannels}
                  roomId={roomId}
                  currencyInfo={currencyInfo as CurrencyInfoI}
                />
              </div>
            </>
          )}
      </>
    </div>
  );
}
