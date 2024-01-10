import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@mui/material';
import { Button } from 'Common';
import { useAppContext } from 'Context';
import { roomDescriptionSchema } from 'FormValidation';
import {
  useGetVendorHotelRoom,
  usePutEditVendorHotelRoomDescription,
} from 'Hooks/Vendors/VendorHotelRooms';
import usePostAddVendorHotelRoomsDescription from 'Hooks/Vendors/VendorHotelRooms/usePostAddVendorHotelRoomsDescription';
import { VendorHotelRoomDescriptionEntityI } from 'Types/Vendors/vendors';
import { useState } from 'react';
import { Plus } from 'react-feather';
import { useForm } from 'react-hook-form';

import RoomDescriptionModal from './Components/RoomDescriptionModal';

export interface AddRoomDescriptionI {
  shortDescription: string;
  longDescription: string;
  languageId: string;
}

export default function AddRoomDescription() {
  const { roomId } = useAppContext();
  const [open, setOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const { vendorHotelRoomData, getStayRoomDataAction } =
    useGetVendorHotelRoom({ roomId });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddRoomDescriptionI>({
    defaultValues: { longDescription: '', shortDescription: '' },
    resolver: yupResolver(roomDescriptionSchema),
  });

  const {
    control: editControl,
    setValue: setEditValue,
    handleSubmit: editHandleSubmit,
  } = useForm<AddRoomDescriptionI>({
    defaultValues: { longDescription: '', shortDescription: '' },
  });

  const onAddVendorRoomName = async () => {
    setOpen(false);
    reset();
    await getStayRoomDataAction();
  };

  const { EditVendorHotelRoomDescriptionAction } =
    usePutEditVendorHotelRoomDescription({
      onSuccess: () => {
        getStayRoomDataAction().catch((err) => console.log(err));
      },
    });

  const { addVendorHotelRoomDescriptionAction } =
    usePostAddVendorHotelRoomsDescription({
      onSuccess: () => {
        onAddVendorRoomName().catch((err) => console.log(err));
      },
    });

  const onSubmit = ({
    longDescription,
    shortDescription,
    languageId,
  }: AddRoomDescriptionI) => {
    addVendorHotelRoomDescriptionAction({
      vendorHotelRoomId: roomId,
      roomDescriptions: [
        { longDescription, shortDescription, languageId },
      ],
    });
  };

  const onEditSubmit = ({
    longDescription,
    shortDescription,
    languageId,
  }: AddRoomDescriptionI) => {
    const x = vendorHotelRoomData?.vendorHotelRoomDescription?.filter(
      (room) => languageId !== room.languageId,
    );

    EditVendorHotelRoomDescriptionAction({
      vendorHotelRoomId: roomId,
      roomDescriptions: [
        ...(x as VendorHotelRoomDescriptionEntityI[]),
        { longDescription, shortDescription, languageId },
      ],
    });

    setEditModalOpen(false);
  };

  const onDeleteName =
    ({ languageId }: { languageId: string }) =>
    () => {
      const x = vendorHotelRoomData?.vendorHotelRoomDescription?.filter(
        (room) => room.languageId !== languageId,
      );

      EditVendorHotelRoomDescriptionAction({
        vendorHotelRoomId: roomId,
        roomDescriptions: x as VendorHotelRoomDescriptionEntityI[],
      });
    };

  const onEditName =
    ({
      longDescription,
      shortDescription,
      languageId,
    }: AddRoomDescriptionI) =>
    () => {
      setEditValue('longDescription', longDescription);
      setEditValue('shortDescription', shortDescription);
      setEditValue('languageId', languageId);
      setEditModalOpen(true);
    };

  return (
    <div>
      <div className="mt-6 flex justify-between">
        <div>
          <p className="text-lg font-normal text-gray-900">
            Add descriptions
          </p>
        </div>
        <Button color="secondary" onClick={() => setOpen(true)}>
          <>
            <Plus size={20} />
            <span className="ml-2">Add</span>
          </>
        </Button>
      </div>
      {vendorHotelRoomData?.vendorHotelRoomDescription?.map(
        ({
          languageId,
          longDescription,
          shortDescription,
          languageName,
        }) => (
          <div className="mt-10  w-full">
            <div className="flex w-full justify-between">
              <p>{languageName}</p>
              <div className="flex gap-4 items-center pr-3">
                <Box
                  className="cursor-pointer font-medium text-sm text-Primary/900"
                  onClick={onEditName({
                    longDescription,
                    languageId,
                    shortDescription,
                  })}
                >
                  Edit
                </Box>
                <Box
                  className="cursor-pointer font-medium text-sm text-gray-500"
                  onClick={onDeleteName({ languageId })}
                >
                  Delete
                </Box>
              </div>
            </div>
            <div className="rounded-lg py-3 px-4 border border-gray-300 mt-2 w-full">
              <div className="border-b border-b-gray-200 pb-2">
                <p className="font-semibold  text-sm text-gray-500">
                  Short Description
                </p>
                <p>{shortDescription}</p>
              </div>
              <div className="w-full mt-2">
                <p className="font-semibold text-sm text-gray-500">
                  Long Description
                </p>
                <p>{longDescription}</p>
              </div>
            </div>
          </div>
        ),
      )}

      <RoomDescriptionModal
        control={control}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        open={open}
        setOpen={setOpen}
        title="Add Name"
        errors={errors}
      />
      <RoomDescriptionModal
        control={editControl}
        handleSubmit={editHandleSubmit}
        onSubmit={onEditSubmit}
        open={editModalOpen}
        setOpen={setEditModalOpen}
        title="Edit Name"
        errors={errors}
      />
    </div>
  );
}
