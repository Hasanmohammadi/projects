import { Bed } from 'Assets/Svg';
import { Button, RadioButton } from 'Common';
import { useAppContext } from 'Context';
import { useGetVendorSalesChannels } from 'Hooks/SalesChannels';
import { getVendorSalesChannels } from 'Services/SalesChannel';
import { SearchHotelRoomI } from 'Types/Search';
import clsx from 'clsx';
import getSymbolFromCurrency from 'currency-symbol-map';
import { useState } from 'react';

interface SelectRoomI {
  rooms: SearchHotelRoomI[];
  setActiveTabIndex: React.Dispatch<React.SetStateAction<number>>;
  setRoomCapacity: React.Dispatch<
    React.SetStateAction<{
      extraCapacity: number;
      standardCapacity: number;
    }>
  >;
}

export default function SelectRoom({
  rooms,
  setActiveTabIndex,
  setRoomCapacity,
}: SelectRoomI) {
  const { setRoomId, vendorIdSelected } = useAppContext();
  const [radioValue, setRadioValue] = useState({
    radioText: '',
    value: '',
  });

  const { vendorSalesChannelListData } = useGetVendorSalesChannels({
    enabled: true,
  });

  const findRoomCurrency = (salesChannelId: string) =>
    vendorSalesChannelListData?.data?.find(
      ({ id }) => id === salesChannelId,
    )?.currency.code;

  return (
    <div className="py-6">
      <RadioButton
        className="w-full"
        grid
        onChange={(e, value) => {
          setRadioValue({ value, radioText: '' });
          rooms.forEach(({ extraCapacity, standardCapacity, roomId }) => {
            if (roomId === value) {
              setRoomCapacity({ extraCapacity, standardCapacity });
            }
          });
        }}
        radios={rooms.map(
          ({
            roomName,
            roomId,
            standardCapacity,
            extraCapacity,
            basePrice,
            salesChannelId,
          }: SearchHotelRoomI) => ({
            radioText: roomName,
            value: roomId,
            children: (
              <>
                <div
                  className="absolute top-8 right-3 text-xs font-semibold text-gray-500 flex gap-2"
                  key={roomId}
                >
                  <Bed />
                  <p>
                    {standardCapacity} + {extraCapacity}
                  </p>
                </div>
                <div className="flex justify-between mt-2">
                  <p className="text-gray-500">Amount</p>
                  <div className="flex gap-2">
                    <p>
                      {getSymbolFromCurrency(
                        findRoomCurrency(salesChannelId) as string,
                      )}
                    </p>
                    <p>{basePrice.toLocaleString()}</p>
                  </div>
                </div>
              </>
            ),
            className: clsx(
              'px-4 py-5 rounded-lg justify-between relative border',
              {
                'border-Primary/700 bg-Primary/25':
                  radioValue.value === roomId,
                'border-gray-200': radioValue.value !== roomId,
              },
            ),
            size: 'small',
          }),
        )}
      />
      <div className="flex justify-end">
        <Button
          color="primary"
          className="h-10 px-4"
          type="submit"
          onClick={() => {
            setActiveTabIndex((pre) => pre + 1);
            setRoomId(radioValue.value);
          }}
          disabled={!radioValue.value}
        >
          <div className="flex flex-wrap gap-2">Next</div>
        </Button>
      </div>
    </div>
  );
}
