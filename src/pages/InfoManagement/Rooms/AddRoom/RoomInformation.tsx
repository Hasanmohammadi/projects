import { yupResolver } from '@hookform/resolvers/yup';
import { MenuItem } from '@mui/material';
import { Button, Input, Select, Tag, TextArea } from 'Common';
import { useAppContext } from 'Context';
import { roomInformationSchema } from 'FormValidation';
import { useGetLanguages } from 'Hooks/General';
import {
  useGetHotelRoomBaseTypeList,
  useGetHotelRoomViewTypes,
  useGetVendorHotelRoom,
  useGetVendorHotelRoomPensions,
  usePutEditStayRoom,
} from 'Hooks/Vendors/VendorHotelRooms';
import usePostAddVendorHotelRoom from 'Hooks/Vendors/VendorHotelRooms/usePostAddVendorHotelRooms';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export interface RoomInformationI {
  note: string;
  shortDescription: string;
  longDescription: string;
  VendorHotelRoomBaseTypeId: string;
  VendorHotelRoomViewTypeId: string;
  roomNumbers: string;
  roomName: string;
  extraCapacity: number;
  minSize: number;
  maxSize: number;
  bedRoomCount: string;
  standardCapacity: number;
  languageId: string;
  VendorHotelRoomPensionId: string;
  hotelId?: string;
  vendorId?: string;
  vendorHotelRoomDetailId: string;
}

interface RoomInformationPropsI {
  setActiveTabIndex: React.Dispatch<React.SetStateAction<number>>;
  defaultValues: RoomInformationI;
  isEdit?: boolean;
}

export default function RoomInformation({
  setActiveTabIndex,
  defaultValues,
  isEdit,
}: RoomInformationPropsI) {
  const { vendorIdSelected, hotelId, roomId } = useAppContext();

  const [roomNumbers, setRoomNumbers] = useState<string[]>(
    defaultValues.roomNumbers?.[0]
      ? defaultValues.roomNumbers.split(',')
      : [],
  );

  const {
    control,
    handleSubmit,
    resetField,
    setValue,
    formState: { errors },
  } = useForm<RoomInformationI>({
    defaultValues: { ...defaultValues, roomNumbers: '' },
    resolver: yupResolver(roomInformationSchema),
  });

  const navigate = useNavigate();

  const { getStayRoomDataAction } = useGetVendorHotelRoom({
    roomId,
  });

  const { hotelRoomBaseTypeListData } = useGetHotelRoomBaseTypeList();

  const { hotelRoomViewTypesData } = useGetHotelRoomViewTypes();

  const { hotelRoomBookingTheBasisData } = useGetVendorHotelRoomPensions();

  const { getLanguagesData } = useGetLanguages();

  const { addVendorHotelRoom } = usePostAddVendorHotelRoom({
    setActiveTabIndex,
  });

  const { EditStayRoomAction, isLoading } = usePutEditStayRoom({
    setActiveTabIndex,
    onSuccess: () => {
      getStayRoomDataAction().catch((err) => console.log(err));
    },
  });

  const onSubmit: SubmitHandler<RoomInformationI> = (data, e) => {
    e?.preventDefault();

    if (isEdit) {
      EditStayRoomAction({
        roomInfo: {
          roomNumbers: roomNumbers.join(),
          hotelId,
          roomId,
          vendorHotelRoomDetailId: data.vendorHotelRoomDetailId,
          name: data.roomName,
          vendorHotelRoomPensionId: data.VendorHotelRoomPensionId,
          vendorHotelRoomBaseTypeId: data.VendorHotelRoomBaseTypeId,
          standardCapacity: data.standardCapacity,
          extraCapacity: data.extraCapacity,
          minSize: data.minSize,
          maxSize: data.maxSize,
          bedRoomCount: +data.bedRoomCount,
          note: data.note,
          vendorHotelRoomViewTypeId: data.VendorHotelRoomViewTypeId,
          roomDescription: {
            languageId: data.languageId,
            longDescription: data.longDescription,
            shortDescription: `General: ${data.shortDescription}`,
          },
        },
      });
    } else {
      addVendorHotelRoom({
        ...data,
        roomNumbers: roomNumbers.join(),
        hotelId,
        vendorId: vendorIdSelected,
        shortDescription: `General: ${data.shortDescription}`,
      });
    }
  };

  const onDelete = (value: string) => {
    const x = [...roomNumbers];
    const y = x.filter((number) => value !== number);
    setRoomNumbers(y);
  };

  const addNumber = (value: string) => {
    resetField('roomNumbers');
    if (!(value === '' && ' ')) {
      const x = [...roomNumbers];
      x.push(value);
      setRoomNumbers(x);
    }
  };

  const onRoomSelect = ({
    extraCapacity,
    standardCapacity,
  }: {
    extraCapacity: number;
    standardCapacity: number;
  }) => {
    setValue('extraCapacity', +extraCapacity);
    setValue('standardCapacity', +standardCapacity);
  };

  const checkKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') e.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onKeyDown={(e) => checkKeyDown(e)}
      role="presentation"
    >
      <div>
        <div className="mt-6 flex justify-between w-full">
          <div>
            <p className="text-lg font-medium text-gray-900">
              Room Information
            </p>
          </div>
          <div className="flex flex-wrap flex-row-reverse mt-4 gap-3">
            <Button
              color="primary"
              className="h-10 px-4"
              type="submit"
              loading={isLoading}
            >
              <div className="flex flex-wrap gap-2">Save</div>
            </Button>
            <Button
              color="ghost"
              className="h-10 px-4"
              onClick={() => navigate(-1)}
              disabled={isLoading}
            >
              <div className="flex flex-wrap gap-2">Cancel</div>
            </Button>
          </div>
        </div>
        <div className="py-6 mt-5 border-t border-t-gray-200 flex flex-wrap gap-8">
          <p className="font-medium text-sm text-gray-700 flex w-72">
            General information
          </p>
          <div className="flex gap-6">
            <Select
              defaultValue="none"
              className="w-[246px] h-11 pr-3"
              label="Room type"
              control={control}
              name="VendorHotelRoomBaseTypeId"
              errorMessage={errors.VendorHotelRoomBaseTypeId?.message}
            >
              {hotelRoomBaseTypeListData
                ?.sort((a, b) => a.standardCapacity - b.standardCapacity)
                .map(({ id, name, extraCapacity, standardCapacity }) => (
                  <MenuItem
                    key={id}
                    value={id}
                    onClick={() =>
                      onRoomSelect({ standardCapacity, extraCapacity })
                    }
                  >
                    {name}
                  </MenuItem>
                ))}
            </Select>
            <Select
              defaultValue="none"
              className="w-[246px] h-11 pr-3"
              label="Room View type"
              control={control}
              name="VendorHotelRoomViewTypeId"
              errorMessage={errors.VendorHotelRoomViewTypeId?.message}
            >
              {hotelRoomViewTypesData?.map(({ id, name }) => (
                <MenuItem key={id} value={id}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div> </div>
        </div>
        <div className="pb-6 flex flex-wrap gap-8">
          <div className="flex w-72"> </div>
          <div className="flex flex-wrap gap-6">
            <Input
              label="Room name"
              name="roomName"
              placeholder="Enter Name"
              className="w-[246px] h-11"
              control={control}
              errorMessage={errors.roomName?.message}
            />
            <Input
              label="Room label"
              name="note"
              placeholder="Enter lable"
              className="w-[246px] h-11"
              control={control}
              errorMessage={errors?.note?.message}
            />
          </div>
          <div> </div>
        </div>
        <div className="py-6 mt-5 border-t border-t-gray-200 flex flex-wrap gap-8 w-full">
          <p className="font-medium text-sm text-gray-700 flex w-72">
            Room Numbers
          </p>
          <div className=" w-[512px]">
            <p className="text-sm font-medium mb-2 text-gray-700">
              Room Numbers
            </p>
            <div className=" bg-white border border-gray-300 rounded-lg min-h-20 pb-3">
              <Input
                name="roomNumbers"
                placeholder="Enter Room Number"
                className="w-[246px] -mt-2 h-11"
                control={control}
                hasBorder={false}
                type="number"
                onEnter={(e) =>
                  addNumber((e.target as HTMLInputElement).value)
                }
              />
              <div className="pl-3 flex flex-wrap gap-2">
                {roomNumbers.map((number) => (
                  <Tag
                    text={number}
                    color="grey"
                    onDelete={() => onDelete(number)}
                  />
                ))}
              </div>
            </div>
            <p className="font-normal text-sm text-gray-500 leading-relaxed">
              You can add a new room number by entering the room number and
              pressing the enter button
            </p>
          </div>
        </div>
        <div className="pt-6 pb-12 mt-5 border-t border-t-gray-200 flex flex-wrap gap-8 w-full">
          <p className="font-medium text-sm text-gray-700 flex w-72">
            Maximum capacity
          </p>
          <div>
            <div className=" w-[512px] flex gap-6 justify-between">
              <Input
                className="w-full h-11"
                label="Standard capacity"
                name="standardCapacity"
                placeholder="Enter number"
                type="number"
                control={control}
                errorMessage={errors.standardCapacity?.message}
              />
              <Input
                className="w-full h-11"
                label="Extra capacity"
                name="extraCapacity"
                placeholder="Enter number"
                type="number"
                control={control}
                errorMessage={errors.extraCapacity?.message}
              />
            </div>
          </div>
        </div>
        <div className="py-6 border-t border-t-gray-200 flex flex-wrap gap-8">
          <p className="font-medium text-sm text-gray-700 flex w-72">
            Other information
          </p>
          <Input
            className="w-[244px] h-11"
            label="Min Room size (m²)"
            name="minSize"
            placeholder="Max"
            type="number"
            control={control}
          />
          <Input
            className="w-[244px] h-11"
            label="Max Room size (m²)"
            name="maxSize"
            placeholder="Min"
            type="number"
            control={control}
          />

          <div> </div>
        </div>
        <div className="py-6  flex flex-wrap gap-8">
          <p className="font-medium text-sm text-gray-700 flex w-72"> </p>
          <Input
            className="w-[244px] h-11"
            label="Bedroom Count"
            name="bedRoomCount"
            placeholder="Enter Bedroom Count"
            control={control}
            errorMessage={errors.bedRoomCount?.message}
          />
          <Select
            defaultValue="none"
            className="w-[246px] h-11 pr-3"
            label="Board"
            control={control}
            name="VendorHotelRoomPensionId"
            errorMessage={errors.VendorHotelRoomPensionId?.message}
          >
            {hotelRoomBookingTheBasisData?.map(({ id, name }) => (
              <MenuItem key={id} value={id}>
                {name}
              </MenuItem>
            ))}
          </Select>

          <div> </div>
        </div>

        <div className="py-6 border-t  border-t-gray-200  flex flex-wrap gap-8">
          <div>
            <p className="font-medium text-sm text-gray-700 flex w-72">
              Short Description
            </p>
            <p className="font-normal text-sm text-gray-500">
              Write a short introduction.
            </p>
          </div>
          <div>
            <Select
              control={control}
              name="languageId"
              className="w-[512px] h-11"
              errorMessage={errors.languageId?.message}
              label="Language"
            >
              {getLanguagesData?.map(({ name, id }) => (
                <MenuItem key={id} value={id}>
                  {name}
                </MenuItem>
              ))}
            </Select>
            <TextArea
              name="shortDescription"
              control={control}
              cols={5}
              rows={6}
              className="w-[512px] mt-5"
              placeholder="Short Description"
              errorMessage={errors.shortDescription?.message}
            />
          </div>
          <div> </div>
        </div>
        <div className="pt-6 pb-12 border-b border-b-gray-200  flex flex-wrap gap-8">
          <div>
            <p className="font-medium text-sm text-gray-700 flex w-72">
              Long Description
            </p>
            <p className="font-normal text-sm text-gray-500">
              Write a Long introduction.
            </p>
          </div>
          <div className="flex gap-6">
            <TextArea
              name="longDescription"
              control={control}
              cols={5}
              rows={6}
              className="w-[512px]"
              placeholder="Long Description"
              errorMessage={errors.longDescription?.message}
            />
          </div>
          <div> </div>
        </div>
        <div className="flex flex-wrap flex-row-reverse mt-4 gap-3">
          <Button
            color="primary"
            className="h-10 px-4"
            type="submit"
            loading={isLoading}
          >
            <div className="flex flex-wrap gap-2">Save</div>
          </Button>
          <Button
            color="ghost"
            className="h-10 px-4"
            onClick={() => navigate(-1)}
            disabled={isLoading}
          >
            <div className="flex flex-wrap gap-2">Cancel</div>
          </Button>
        </div>
      </div>
    </form>
  );
}
