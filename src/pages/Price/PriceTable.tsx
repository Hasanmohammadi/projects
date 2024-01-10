/* eslint-disable react/jsx-props-no-spreading */
import { Box, CircularProgress } from '@mui/material';
import { Button, Modal } from 'Common';
import { useAppContext } from 'Context';
import {
  addCommas,
  clearCommas,
  convertDateToTableFormat,
  convertDateToUtc,
  defaultDate,
} from 'Helpers';
import { usePutEditRoomMarket } from 'Hooks/Vendors/VendorHotelRooms';
import {
  CurrencyInfoI,
  SalesChannelListResultI,
} from 'Types/SalesChannels';
import { RoomMarketListResultI, VendorHotelsDataI } from 'Types/Vendors';
import clsx from 'clsx';
import getSymbolFromCurrency from 'currency-symbol-map';
import { useEffect, useState } from 'react';
import { Check, Edit2 } from 'react-feather';
import { useFieldArray, useForm } from 'react-hook-form';

import CopyPriceModal from './CopyPriceModal';
import { DateI } from './Price';
import PriceTableContainer from './PriceTable.style';

interface Date {
  day: number;
  month: number;
  year: number;
}

interface PriceTablePropsI {
  priceDate: DateI;
  VendorHotelRoomMarketListData: RoomMarketListResultI;
  vendorSalesChannelListData: SalesChannelListResultI;
  vendorsHotelsData: VendorHotelsDataI;
  salesChannelId: string;
  roomId: string;
  currencyInfo: CurrencyInfoI;
}

interface RoomInfoI {
  date: string;
  basePrice: number;
  extraAdultPrice: number;
  extraInfantPrice: number;
  extraChild1Price: number;
  extraChild2Price: number;
  editable: boolean;
}

export interface RoomsInfoI {
  roomPrices: RoomInfoI[];
}

export interface PricesI {
  basePrice: number;
  extraAdultPrice: number;
  extraInfantPrice: number;
  extraChild1Price: number;
  extraChild2Price: number;
}

const firstColumns = [
  'Date',
  'Base Price',
  'Extra Adult',
  'Extra Infant',
  'Extra Child 1',
  'Extra Child 2',
];

export default function PriceTable({
  VendorHotelRoomMarketListData,
  priceDate = defaultDate(),
  vendorSalesChannelListData,
  currencyInfo,
  vendorsHotelsData,
  salesChannelId,
}: PriceTablePropsI) {
  const { roomId } = useAppContext();
  const [isEdit, setIsEdit] = useState(false);

  const [prices, setPrices] = useState<PricesI>({
    basePrice: 0,
    extraAdultPrice: 0,
    extraInfantPrice: 0,
    extraChild1Price: 0,
    extraChild2Price: 0,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { control, handleSubmit, register, watch } = useForm<RoomsInfoI>({
    defaultValues: {
      roomPrices: [],
    },
  });

  const { roomPrices } = watch();

  const { fields, append, remove, replace } = useFieldArray({
    name: 'roomPrices',
    control,
  });

  useEffect(() => {
    if (VendorHotelRoomMarketListData?.data[0]) {
      VendorHotelRoomMarketListData?.data?.map(
        ({
          date,
          basePrice,
          extraAdultPrice,
          extraInfantPrice,
          extraChild1Price,
          extraChild2Price,
          editable,
        }) =>
          append({
            date: convertDateToTableFormat(date),
            basePrice,
            extraAdultPrice,
            extraInfantPrice,
            extraChild1Price,
            extraChild2Price,
            editable,
          }),
      );
    }
  }, [VendorHotelRoomMarketListData?.data[0]]);

  useEffect(() => {
    remove();
    if (VendorHotelRoomMarketListData?.data[0]) {
      VendorHotelRoomMarketListData?.data?.map(({ date }, index) =>
        append({
          date: convertDateToTableFormat(date),
          basePrice: prices.basePrice,
          extraAdultPrice: roomPrices[index]?.extraAdultPrice,
          extraChild1Price: roomPrices[index]?.extraChild1Price,
          extraChild2Price: roomPrices[index]?.extraChild2Price,
          extraInfantPrice: roomPrices[index]?.extraInfantPrice,
          editable: roomPrices[index]?.editable,
        }),
      );
    }
  }, [prices.basePrice]);

  useEffect(() => {
    remove();
    if (VendorHotelRoomMarketListData?.data[0]) {
      VendorHotelRoomMarketListData?.data?.map(({ date }, index) =>
        append({
          date: convertDateToTableFormat(date),
          basePrice: roomPrices[index]?.basePrice,
          extraAdultPrice: prices.extraAdultPrice,
          extraChild1Price: roomPrices[index]?.extraChild1Price,
          extraChild2Price: roomPrices[index]?.extraChild2Price,
          extraInfantPrice: roomPrices[index]?.extraInfantPrice,
          editable: roomPrices[index]?.editable,
        }),
      );
    }
  }, [prices.extraAdultPrice]);

  useEffect(() => {
    remove();
    if (VendorHotelRoomMarketListData?.data[0]) {
      VendorHotelRoomMarketListData?.data?.map(({ date }, index) =>
        append({
          date: convertDateToTableFormat(date),
          basePrice: roomPrices[index]?.basePrice,
          extraAdultPrice: roomPrices[index]?.extraAdultPrice,
          extraChild2Price: roomPrices[index]?.extraChild2Price,
          extraInfantPrice: roomPrices[index]?.extraInfantPrice,
          extraChild1Price: prices.extraChild1Price,
          editable: roomPrices[index]?.editable,
        }),
      );
    }
  }, [prices.extraChild1Price]);

  useEffect(() => {
    remove();
    if (VendorHotelRoomMarketListData?.data[0]) {
      VendorHotelRoomMarketListData?.data?.map(({ date }, index) =>
        append({
          date: convertDateToTableFormat(date),
          basePrice: roomPrices[index]?.basePrice,
          extraAdultPrice: roomPrices[index]?.extraAdultPrice,
          extraInfantPrice: roomPrices[index]?.extraInfantPrice,
          extraChild1Price: roomPrices[index]?.extraChild1Price,
          extraChild2Price: prices.extraChild2Price,
          editable: roomPrices[index]?.editable,
        }),
      );
    }
  }, [prices.extraChild2Price]);

  useEffect(() => {
    remove();
    if (VendorHotelRoomMarketListData?.data[0]) {
      VendorHotelRoomMarketListData?.data?.map(({ date }, index) =>
        append({
          date: convertDateToTableFormat(date),
          basePrice: roomPrices[index]?.basePrice,
          extraAdultPrice: roomPrices[index]?.extraAdultPrice,
          extraInfantPrice: prices.extraInfantPrice,
          extraChild1Price: roomPrices[index]?.extraChild1Price,
          extraChild2Price: roomPrices[index]?.extraChild2Price,
          editable: roomPrices[index]?.editable,
        }),
      );
    }
  }, [prices.extraInfantPrice]);

  const { EditVendorHotelRoomMarketAction, isLoading } =
    usePutEditRoomMarket({});

  console.log(
    '🚀 ~ file: PriceTable.tsx:223 ~ clearCommas():',
    addCommas(roomPrices[0]?.basePrice),
  );

  const onSubmit = (data: RoomsInfoI) => {
    if (isEdit) {
      EditVendorHotelRoomMarketAction({
        prices: data?.roomPrices?.map(
          (
            {
              basePrice,
              extraAdultPrice,
              extraChild1Price,
              extraChild2Price,
              extraInfantPrice,
            },
            index,
          ) => ({
            id: VendorHotelRoomMarketListData?.data[index]
              .roomAvailabilityId,
            basePrice,
            extraAdultPrice,
            extraChild1Price,
            extraChild2Price,
            extraInfantPrice,
            salesChannelId:
              VendorHotelRoomMarketListData?.data[index].salesChannelId,
            vendorHotelRoomAvailabilityId:
              VendorHotelRoomMarketListData?.data[index]
                .roomAvailabilityId,
            currencyId:
              VendorHotelRoomMarketListData?.data[index].currencyId,
          }),
        ),
      });
    }
    setIsEdit((pre) => !pre);
  };

  const onApplyModal = () => {};

  const onCancelModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    replace(
      VendorHotelRoomMarketListData?.data.map((room) => ({
        ...room,
        date: convertDateToTableFormat(room?.date),
      })),
    );
  }, [VendorHotelRoomMarketListData?.data, replace, roomId]);

  return (
    <PriceTableContainer className="border border-gray-200 border-t-0 mt-6 rounded-xl w-full">
      <div className="bg-Primary/25 flex justify-between px-4 py-5 items-center">
        <p className="text-Primary/700 font-semibold text-sm">
          Room Name : {VendorHotelRoomMarketListData?.data[0]?.roomName}
        </p>
        <Button
          color="secondary"
          containerClassName={clsx('border rounded-lg', {
            'border-primary': !!fields.length,
          })}
          onClick={() => setIsModalOpen(true)}
          disabled={!fields.length}
        >
          Copy Price
        </Button>
      </div>
      <div className="relative">
        <form
          className="w-full overflow-auto flex bg-white"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="absolute left-0 z-10">
            {firstColumns?.map((col, index) => (
              <div
                key={col}
                className="px-6 pr-1.5 gap-2 flex justify-between pl-3 border border-gray-200 bg-gray-50 text-sm py-4"
              >
                <span>{col}</span>
                <span className="font-semibold text-gray-900">
                  {!!index &&
                    (getSymbolFromCurrency(currencyInfo?.code) as string)}
                </span>
              </div>
            ))}
          </div>
          <div className="flex">
            <div className="flex flex-col ml-[129px] w-24">
              <div className="py-2.5  border border-gray-200 font-semibold text-xs first-col-dates text-center w-full">
                <p>
                  {(priceDate?.from as Date) &&
                    convertDateToTableFormat(
                      convertDateToUtc(priceDate?.from as Date) as string,
                    )}
                </p>
                <p>
                  {(priceDate?.to as Date) &&
                    convertDateToTableFormat(
                      convertDateToUtc(priceDate?.to as Date) as string,
                    )}
                </p>
              </div>
              <input
                step="0.01"
                className="py-4 text-center border border-gray-200 text-sm first-col"
                disabled={!isEdit}
                defaultValue={prices?.basePrice}
                onChange={(e) =>
                  setPrices((pre: PricesI) => ({
                    ...pre,
                    basePrice: +e.target.value,
                  }))
                }
                type="number"
                min={0}
              />
              <input
                step="0.01"
                className="py-4 text-center border border-gray-200 text-sm first-col"
                disabled={!isEdit}
                defaultValue={prices?.extraAdultPrice}
                onChange={(e) =>
                  setPrices((pre: PricesI) => ({
                    ...pre,
                    extraAdultPrice: +e.target.value,
                  }))
                }
                type="number"
                min={0}
              />
              <input
                step="0.01"
                className="py-4 text-center border border-gray-200 text-sm first-col"
                disabled={!isEdit}
                defaultValue={prices?.extraInfantPrice}
                onChange={(e) =>
                  setPrices((pre: PricesI) => ({
                    ...pre,
                    extraInfantPrice: +e.target.value,
                  }))
                }
                type="number"
                min={0}
              />
              <input
                step="0.01"
                className="py-4 text-center border border-gray-200 text-sm first-col"
                disabled={!isEdit}
                defaultValue={prices?.extraChild1Price}
                onChange={(e) =>
                  setPrices((pre: PricesI) => ({
                    ...pre,
                    extraChild1Price: +e.target.value,
                  }))
                }
                type="number"
                min={0}
              />
              <input
                step="0.01"
                disabled={!isEdit}
                className="py-4 text-center border border-gray-200 text-sm first-col"
                defaultValue={prices?.extraChild2Price}
                onChange={(e) =>
                  setPrices((pre: PricesI) => ({
                    ...pre,
                    extraChild2Price: +e.target.value,
                  }))
                }
                type="number"
                min={0}
              />
            </div>
            {fields?.map((field, index) => (
              <div
                key={field.id}
                className={clsx('flex flex-col flex-shrink-0 w-24', {
                  'mr-16': index === fields?.length - 1,
                })}
              >
                <input
                  step="0.01"
                  className="hidden py-4 border border-gray-200 text-gray-500 text-sm text-center font-normal"
                  defaultValue={convertDateToTableFormat(field?.date)}
                  {...register(`roomPrices.${index}.date` as const)}
                  value={convertDateToTableFormat(field?.date)}
                  disabled
                />
                <div className="py-1.5 border border-gray-200 font-medium text-xs first-col-dates text-center w-full text-gray-500">
                  <p className="text-sm">{field.date.split(',')?.[0]}</p>
                  <p className="text-sm">{field.date.split(',')?.[1]}</p>
                </div>
                <input
                  className="py-4 border text-sm text-center"
                  defaultValue={field?.basePrice}
                  {...register(`roomPrices.${index}.basePrice` as const)}
                  disabled={!isEdit || !field.editable}
                  type="number"
                  min={0}
                />
                <input
                  step="0.01"
                  className="py-4 border text-sm text-center"
                  defaultValue={field.extraAdultPrice}
                  {...register(
                    `roomPrices.${index}.extraAdultPrice` as const,
                  )}
                  type="number"
                  min={0}
                  disabled={!isEdit || !field.editable}
                />
                <input
                  step="0.01"
                  className="py-4 border text-sm text-center"
                  defaultValue={field.extraInfantPrice}
                  {...register(
                    `roomPrices.${index}.extraInfantPrice` as const,
                  )}
                  type="number"
                  min={0}
                  disabled={!isEdit || !field.editable}
                />
                <input
                  step="0.01"
                  className="py-4 border text-sm text-center"
                  defaultValue={field.extraChild1Price}
                  {...register(
                    `roomPrices.${index}.extraChild1Price` as const,
                  )}
                  type="number"
                  min={0}
                  disabled={!isEdit || !field.editable}
                />
                <input
                  step="0.01"
                  className="py-4 border text-sm text-center"
                  defaultValue={field.extraChild2Price}
                  {...register(
                    `roomPrices.${index}.extraChild2Price` as const,
                  )}
                  type="number"
                  min={0}
                  disabled={!isEdit || !field.editable}
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
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CopyPriceModal
          vendorSalesChannelListData={vendorSalesChannelListData}
          vendorsHotelsData={vendorsHotelsData}
          onApply={onApplyModal}
          onCancel={onCancelModal}
          saleChannel={
            VendorHotelRoomMarketListData?.data[0]?.salesChannelName
          }
          roomName={VendorHotelRoomMarketListData?.data[0]?.roomName}
          from={convertDateToTableFormat(
            convertDateToUtc(priceDate?.from as Date) as string,
          )}
          to={
            priceDate?.to
              ? convertDateToTableFormat(
                  convertDateToUtc(priceDate?.to as Date) as string,
                )
              : ''
          }
          salesChannelId={salesChannelId}
          roomId={roomId}
        />
      </Modal>
    </PriceTableContainer>
  );
}
