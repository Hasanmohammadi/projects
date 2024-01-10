import { MenuItem } from '@mui/material';
import { Button, Input, Select } from 'Common';
import { useAppContext } from 'Context';
import { convertTableFormatToUtc } from 'Helpers';
import { usePostCopyPrice } from 'Hooks/Vendors/VendorHotelRooms';
import { PostCopyPriceI } from 'Services/Vendors/postCopyPrice';
import { SalesChannelListResultI } from 'Types/SalesChannels';
import { VendorHotelsDataI, VendorHotelsI } from 'Types/Vendors';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import CopyPriceModalStyleContainer from './CopyPriceModal.style';

interface CopyPriceModalPropsI {
  onCancel: () => void;
  onApply: () => void;
  saleChannel: string;
  roomName: string;
  from: string;
  to: string;
  vendorSalesChannelListData: SalesChannelListResultI;
  vendorsHotelsData: VendorHotelsDataI;
  salesChannelId: string;
  roomId: string;
}

export default function CopyPriceModal({
  onApply,
  onCancel,
  roomName,
  saleChannel,
  vendorSalesChannelListData,
  vendorsHotelsData,
  from,
  to,
  salesChannelId,
  roomId,
}: CopyPriceModalPropsI) {
  const { hotelId } = useAppContext();

  const { copyPriceAction, isLoading } = usePostCopyPrice({
    onSuccess: onCancel,
  });
  const [hotelInfo, setHotelInfo] = useState<VendorHotelsI>();

  useEffect(() => {
    if (vendorsHotelsData?.data) {
      setHotelInfo(
        vendorsHotelsData?.data.find(({ id }) => id === hotelId),
      );
    }
  }, [hotelId]);

  const { control, handleSubmit, watch } = useForm<PostCopyPriceI>({
    defaultValues: {
      from: convertTableFormatToUtc(from),
      to: convertTableFormatToUtc(to),
      priceEntry: '',
      salesChannelId,
      roomId,
      copyType: '',
      value: '0',
      newSalesChannelId: '',
      stayId: hotelId,
    },
  });

  const { priceEntry, copyType } = watch();

  const onSubmit = (data: PostCopyPriceI) => {
    copyPriceAction({
      price: {
        ...data,
        value: priceEntry === 'markDown' ? `-${+data.value}` : data.value,
      },
    });
  };

  return (
    <div className="w-96">
      <h1 className="font-semibold text-lg text-gray-900">Copy Price</h1>
      <div className="bg-gray-100 p-4 my-4">
        <p className="text-gray-900 font-bold text-base">source:</p>
        <div className="flex justify-between mt-4">
          <p className="font-normal text-sm text-gray-500">Stay</p>
          <p className="font-medium text-sm text-gray-600">
            {!!hotelInfo && hotelInfo.hotelNote}
          </p>
        </div>
        <div className="flex justify-between mt-2">
          <p className="font-normal text-sm text-gray-500">Sale Channel</p>
          <p className="font-medium text-sm text-gray-600">
            {saleChannel}
          </p>
        </div>
        <div className="flex justify-between mt-2">
          <p className="font-normal text-sm text-gray-500">Room</p>
          <p className="font-medium text-sm text-gray-600">{roomName}</p>
        </div>
        <div className="flex justify-between mt-2">
          <p className="font-normal text-sm text-gray-500">Date</p>
          <p className="font-medium text-sm text-gray-600">
            {from} - {to}
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CopyPriceModalStyleContainer className="h-[43vh] overflow-auto pr-2">
          <Select
            defaultValue="none"
            className="w-full h-11"
            control={control}
            name="newSalesChannelId"
            containerClassName="w-full"
            label="Sale Channel"
          >
            <MenuItem value="" disabled>
              <span className=" text-gray-400">Select sales channel</span>
            </MenuItem>
            {vendorSalesChannelListData?.data
              .filter(({ name }) => name !== saleChannel)
              .map(({ name, id }) => (
                <MenuItem key={id} value={id}>
                  <span className="text-sm">{name}</span>
                </MenuItem>
              ))}
          </Select>

          <div className="flex gap-4">
            <Select
              defaultValue="none"
              className="w-full h-11"
              control={control}
              name="priceEntry"
              containerClassName="w-1/2 mt-3"
              label="Price Entry"
            >
              <MenuItem value="" disabled>
                <span className=" text-gray-400">Select entry</span>
              </MenuItem>
              <MenuItem value="markUp">Markup</MenuItem>
              <MenuItem value="markDown">Markdown</MenuItem>
            </Select>
            <Select
              defaultValue="fix"
              className="w-full h-11"
              control={control}
              name="copyType"
              containerClassName="w-1/2 mt-3"
              label="Type"
              disabled={!priceEntry}
            >
              <MenuItem value="" disabled>
                <span className=" text-gray-400">Select entry</span>
              </MenuItem>
              <MenuItem value="1">Fix</MenuItem>
              <MenuItem value="2">Percent</MenuItem>
            </Select>
          </div>
          <Input
            control={control}
            name="value"
            label="Value"
            className="w-full h-11 mt-4"
            disabled={!copyType}
          />
        </CopyPriceModalStyleContainer>
        <div className="mt-8 flex w-full justify-center gap-3">
          <Button
            color="ghost"
            className="w-full h-11"
            containerClassName="w-full h-11"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            className="w-full h-11"
            containerClassName="w-full h-11"
            onClick={onApply}
            type="submit"
            loading={isLoading}
          >
            Apply
          </Button>
        </div>
      </form>
    </div>
  );
}
