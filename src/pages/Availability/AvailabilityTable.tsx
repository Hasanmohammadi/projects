/* eslint-disable react/jsx-props-no-spreading */
import { Box, CircularProgress } from '@mui/material';
import { useAppContext } from 'Context';
import { convertDateToTableFormat, convertDateToUtc } from 'Helpers';
import { usePostAddHotelRoomAvailability } from 'Hooks/Vendors/VendorHotelRooms';
import { RoomAvailabilityListResultI } from 'Types/Vendors';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Check, Edit2 } from 'react-feather';
import {
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFieldArrayReplace,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from 'react-query';

import AvailabilityTableContainer from './AvailabilityTable.style';
import { useMakeNewAvailability } from './Hooks';

export interface DateI {
  day: number;
  month: number;
  year: number;
}

export interface DatesI {
  day: string;
  month: string;
  year: number;
}

interface AvailabilityTablePropsI {
  startAndExpireDate: {
    from: DateI;
    to: DateI;
  };
  availabilityData: RoomAvailabilityListResultI;
  getAvailabilityListAction: <TPageData>(
    options?:
      | (RefetchOptions & RefetchQueryFilters<TPageData>)
      | undefined,
  ) => Promise<QueryObserverResult<RoomAvailabilityListResultI, Error>>;
  loading: boolean;
  append: UseFieldArrayAppend<RoomsInfoI, 'dateRange'>;
  replace: UseFieldArrayReplace<RoomsInfoI, 'dateRange'>;
  fields: FieldArrayWithId<RoomsInfoI, 'dateRange', 'id'>[];
  register: UseFormRegister<RoomsInfoI>;
  handleSubmit: UseFormHandleSubmit<RoomsInfoI>;
  setDates: React.Dispatch<React.SetStateAction<DatesI[]>>;
  dates: DatesI[];
  setTotalCountDefaultValue: React.Dispatch<React.SetStateAction<number>>;
  totalCountDefaultValue: number;
}

interface RoomInfoI {
  date: string;
  totalAvailableCount: number;
  totalBookedCount: number;
  totalRemainigCount: string;
}

export interface RoomsInfoI {
  dateRange: RoomInfoI[];
}

const firstColumns = ['Date', 'Total Count', 'Sold', 'Available'];

export default function AvailabilityTable({
  startAndExpireDate,
  availabilityData,
  getAvailabilityListAction,
  loading,
  replace,
  fields,
  handleSubmit,
  register,
  dates,
  setTotalCountDefaultValue,
  totalCountDefaultValue,
  append,
}: AvailabilityTablePropsI) {
  console.log('🚀 ~ file: AvailabilityTable.tsx:88 ~ fields:', fields);
  const roomAvailability = availabilityData?.data?.[0]?.availablity;
  const { roomId } = useAppContext();
  const { from, to } = startAndExpireDate;

  const [isEdit, setIsEdit] = useState(false);

  const { postAddHotelRoomAvailabilityAction, isLoading } =
    usePostAddHotelRoomAvailability({
      onSuccessResponse: () => {
        getAvailabilityListAction().catch((err) => console.log(err));
      },
    });

  const { finalFields } = useMakeNewAvailability({
    availabilities: roomAvailability,
    fields,
    dates,
  });

  useEffect(() => {
    console.log(
      '🚀 ~ file: AvailabilityTable.tsx:107 ~ useEffect ~ finalFields:',
      finalFields,
    );
    if (finalFields?.[0]) {
      replace(finalFields);
    }
    //  else {
    //   replace([]);
    //   append({
    //     date: convertDateToTableFormat(roomAvailability?.[0].date),
    //     totalAvailableCount: roomAvailability?.[0].totalAvailableCount,
    //     totalBookedCount: roomAvailability?.[0].totalBookedCount,
    //     totalRemainigCount: roomAvailability?.[0].totalRemainigCount,
    //   });
    // }
  }, [finalFields, replace]);

  const onSubmit = (data: RoomsInfoI) => {
    if (isEdit) {
      postAddHotelRoomAvailabilityAction({
        dateRange: data.dateRange,
        vendorHotelRoomId: roomId,
      });
    }
    setIsEdit((pre) => !pre);
  };

  return (
    <AvailabilityTableContainer className="border border-gray-200 border-t-0 mt-6 rounded-xl w-full">
      <div className="bg-Primary/25 flex justify-between px-4 py-5">
        <p className="text-Primary/700 font-semibold text-sm">
          Room Name : {availabilityData?.data?.[0]?.roomName}
        </p>
        <p className="text-Primary/700 font-semibold text-sm">
          {availabilityData?.data?.[0]?.salesChannelName}
        </p>
      </div>
      <div className="relative">
        <form
          className="w-full overflow-auto flex bg-white pr-16"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="absolute left-0 z-10">
            {firstColumns?.map((col) => (
              <div
                key={col}
                className="px-6 pl-3 border border-gray-200 bg-gray-50 text-sm py-4"
              >
                {col}
              </div>
            ))}
          </div>
          <div className="flex">
            <div className="flex flex-col ml-28 w-24">
              <div className="py-2.5 border border-gray-200 font-semibold text-xs first-col-dates text-center w-full">
                <p>
                  {convertDateToTableFormat(
                    convertDateToUtc(from) as string,
                  )}
                </p>
                <p>
                  {convertDateToTableFormat(
                    convertDateToUtc(to) as string,
                  )}
                </p>
              </div>
              <input
                className="py-4 pl-5 text-center border border-gray-200 text-sm first-col"
                value={totalCountDefaultValue}
                disabled={!isEdit}
                onChange={(e) =>
                  setTotalCountDefaultValue(+e.target.value)
                }
                type="number"
                min={0}
              />
              <input
                className="py-4 pl-5 text-center border border-gray-200 text-sm first-col"
                defaultValue={0}
                disabled
                type="number"
              />
              <input
                className="py-4 pl-5 text-center border border-gray-200 text-sm first-col"
                defaultValue={0}
                disabled
                type="number"
              />
            </div>
            {loading && (
              <div className="flex gap-6 h-full items-center ml-6">
                <CircularProgress color="primary" />
              </div>
            )}
            {fields?.map((field, index) => (
              <div
                key={field.id}
                className="flex flex-col flex-shrink-0 w-16"
              >
                <input
                  className="py-[18px] border border-gray-200 text-gray-500 text-xs w-full pl-3 text-center font-normal hidden"
                  defaultValue={field.totalAvailableCount}
                  {...register(`dateRange.${index}.date` as const)}
                  disabled
                />
                <div className="py-1.5 border border-gray-200 font-medium text-xs first-col-dates text-center w-full text-gray-500">
                  <p className="text-sm">{field.date.split(',')?.[0]}</p>
                  <p className="text-sm">{field.date.split(',')?.[1]}</p>
                </div>
                <input
                  className="py-4 border text-sm w-full pl-3 text-center"
                  defaultValue={field.totalAvailableCount}
                  {...register(
                    `dateRange.${index}.totalAvailableCount` as const,
                  )}
                  disabled={!isEdit}
                  type="number"
                  min={0}
                />
                <input
                  className="py-4 border text-sm w-full pl-3 text-center"
                  defaultValue={field.totalAvailableCount}
                  {...register(
                    `dateRange.${index}.totalBookedCount` as const,
                  )}
                  disabled
                  type="number"
                />
                <input
                  className="py-4 border text-sm w-full pl-3 text-center"
                  defaultValue={field.totalAvailableCount}
                  {...register(
                    `dateRange.${index}.totalRemainigCount` as const,
                  )}
                  disabled
                  type="number"
                />
              </div>
            ))}
          </div>
          <button
            className={clsx(
              'w-16 px-4 cursor-pointer absolute right-0 h-full border-gray-50 border rounded-br-lg',
              {
                ' bg-gray-50': !isEdit,
                ' bg-primary': isEdit,
              },
            )}
            type="submit"
          >
            {isLoading && (
              <Box className="w-full">
                <CircularProgress size={30} />
              </Box>
            )}
            {!isLoading &&
              (!isEdit ? (
                <Box className="w-full">
                  <Edit2 className="h-full ml-1" size={21} />
                </Box>
              ) : (
                <Box className="w-full">
                  <Check className="h-full ml-1" color="white" />
                </Box>
              ))}
          </button>
        </form>
      </div>
    </AvailabilityTableContainer>
  );
}
