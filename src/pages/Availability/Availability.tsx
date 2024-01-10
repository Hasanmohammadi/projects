import { CircularProgress, MenuItem } from '@mui/material';
import { Button, DatePicker, Select, SelectSearch } from 'Common';
import { useAppContext } from 'Context';
import { convertDateToUtc, defaultDate, getDatesInRange } from 'Helpers';
import { useGetVendorHotels } from 'Hooks/Vendors';
import { useGetVendorHotelRoomAvailabilityList } from 'Hooks/Vendors/VendorHotelRooms';
import useGetVendorHotelRooms from 'Hooks/Vendors/useGetVendorHotelRooms';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import AvailabilityTable, {
  DatesI,
  RoomsInfoI,
} from './AvailabilityTable';

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
  hotel: { id: string; label: string };
  salesChannels: string;
  room: string;
  startAndExpireDate: DateI;
}

export default function Availability() {
  const { setHotelId, vendorIdSelected, setRoomId, roomId } =
    useAppContext();
  const [textSearched, setTextSearched] = useState<string>();

  const [totalCountDefaultValue, setTotalCountDefaultValue] = useState(0);

  const [date, setDate] = useState<DateI>(defaultDate());
  const [dates, setDates] = useState<DatesI[]>([]);

  const {
    control: selectsControl,
    watch: selectsWatch,
    handleSubmit: selectHandelSubmit,
    setValue: selectSetValue,
  } = useForm<SelectsI>({
    defaultValues: {
      hotel: { id: '', label: '' },
      salesChannels: '',
      room: '',
      startAndExpireDate: defaultDate(),
    },
  });

  const {
    control: tableControl,
    handleSubmit: tableHandleSubmit,
    register: tableRegister,
  } = useForm<RoomsInfoI>({
    defaultValues: {
      dateRange: [],
    },
  });

  const {
    fields: tableFields,
    append: tableAppend,
    remove: tableRemove,
    replace: tableReplace,
  } = useFieldArray({
    name: 'dateRange',
    control: tableControl,
  });

  const { hotel, room, salesChannels, startAndExpireDate } =
    selectsWatch();

  const {
    vendorHotelRoomAvailabilityListData,
    availabilityListLoading,
    getAvailabilityListAction,
  } = useGetVendorHotelRoomAvailabilityList({
    vendorHotelRoomId: room,
    date: {
      from: convertDateToUtc(startAndExpireDate?.from) as string,
      to:
        startAndExpireDate?.to &&
        (convertDateToUtc(startAndExpireDate?.to) as string),
    },
  });

  const { vendorsHotelsData, getVendorHotelLoading } = useGetVendorHotels({
    pageSize: 1000,
    hotelName: textSearched,
    enabled:
      typeof textSearched === 'string' ? textSearched?.length >= 2 : false,
    isActive: true,
  });

  useEffect(() => {
    selectSetValue('room', '');
    selectSetValue('salesChannels', '');
  }, [hotel]);

  useEffect(() => {
    selectSetValue('room', '');
  }, [salesChannels]);

  useEffect(() => {
    if (vendorIdSelected.length < 23 && !toast.isActive('chooseVendor')) {
      toast.warning('Please choose your vendor', {
        position: 'top-center',
        style: {
          width: 'max-content',
        },
        toastId: 'chooseVendor',
      });
    }
  }, [vendorIdSelected.length]);

  const { vendorHotelRoomsData } = useGetVendorHotelRooms({
    hotelId: hotel.id,
  });

  useEffect(() => {
    setHotelId(hotel.id);
    setRoomId('');
    return () => {
      setHotelId('');
      setRoomId('');
    };
  }, [hotel.id]);

  useEffect(() => {
    tableRemove();

    if (dates[1]) {
      dates?.map(({ day, month, year }) =>
        tableAppend({
          date: `${month} ${day.length === 1 ? `0${day}` : day}, ${year}`,
          totalAvailableCount: totalCountDefaultValue,
          totalBookedCount: 0,
          totalRemainigCount: '0',
        }),
      );
    }
  }, [tableAppend, dates]);

  useEffect(() => {
    tableRemove();
    if (dates[1]) {
      dates?.map(({ day, month, year }, index) =>
        tableAppend({
          date: `${month} ${day.length === 1 ? `0${day}` : day}, ${year}`,
          totalAvailableCount: totalCountDefaultValue,
          totalBookedCount:
            vendorHotelRoomAvailabilityListData?.data?.[0]?.availablity?.[
              index
            ]?.totalBookedCount ?? 0,
          totalRemainigCount:
            vendorHotelRoomAvailabilityListData?.data?.[0]?.availablity?.[
              index
            ]?.totalRemainigCount ?? '0',
        }),
      );
    }
  }, [totalCountDefaultValue]);

  const onConfirm = async (data: SelectsI) => {
    setTotalCountDefaultValue(0);
    tableRemove();
    setRoomId(data.room);
    setDate(data.startAndExpireDate);
    await getAvailabilityListAction();
    setDates(
      getDatesInRange({
        startDate: new Date(convertDateToUtc(startAndExpireDate?.from)),
        endDate: new Date(convertDateToUtc(startAndExpireDate?.to)),
      }),
    );
  };

  return (
    <>
      <h1 className="text-gray-900 font-medium text-3xl">Availability</h1>
      <>
        <div className="mt-9 flex justify-between w-full">
          <form
            className="flex gap-4 mt-2.5 w-full"
            onSubmit={selectHandelSubmit(onConfirm)}
          >
            <SelectSearch
              disabled={vendorIdSelected.length < 23}
              label="Stay"
              control={selectsControl}
              name="hotel"
              items={vendorsHotelsData?.data
                ?.filter(({ active }) => active)
                .map(({ id, hotelNote }) => ({
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
              containerClassName="w-1/4"
              control={selectsControl}
              name="room"
              disabled={hotel.id.length < 30}
              label="Room"
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
              className="h-11 w-72 mt-2"
              name="startAndExpireDate"
              control={selectsControl}
              size="md"
              placeholder="Select date"
              iconPosition="left"
              label="Date"
            />
            <Button
              className="h-11 w-full"
              containerClassName="w-1/5 mt-7"
              type="submit"
              disabled={hotel.id.length < 30 || room.length < 30}
            >
              Confirm
            </Button>
          </form>
        </div>

        {availabilityListLoading && (
          <div className="flex justify-center pt-16">
            <CircularProgress color="primary" size={100} />
          </div>
        )}
        {!availabilityListLoading &&
          roomId &&
          vendorHotelRoomAvailabilityListData?.data && (
            <div className="mt-14">
              <AvailabilityTable
                startAndExpireDate={date}
                availabilityData={vendorHotelRoomAvailabilityListData}
                getAvailabilityListAction={getAvailabilityListAction}
                loading={availabilityListLoading}
                append={tableAppend}
                replace={tableReplace}
                fields={tableFields}
                handleSubmit={tableHandleSubmit}
                register={tableRegister}
                dates={dates}
                setDates={setDates}
                setTotalCountDefaultValue={setTotalCountDefaultValue}
                totalCountDefaultValue={totalCountDefaultValue}
              />
            </div>
          )}
      </>
    </>
  );
}
