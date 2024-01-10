import { yupResolver } from '@hookform/resolvers/yup';
import { Box, MenuItem } from '@mui/material';
import { Button, Input, Select } from 'Common';
import { useAppContext } from 'Context';
import { roomNameSchema } from 'FormValidation';
import {
  useGetVendorHotelRoom,
  usePostAddVendorHotelRoomName,
  usePutEditVendorHotelRoomName,
} from 'Hooks/Vendors/VendorHotelRooms';
import { VendorHotelRoomNamesEntityI } from 'Types/Vendors/vendors';
import { useEffect, useState } from 'react';
import { Plus } from 'react-feather';
import { useFieldArray, useForm } from 'react-hook-form';

import RoomNameModal from './Components/RoomNameModal';

export interface RoomNamesI {
  roomNames: VendorHotelRoomNamesEntityI[];
}

export interface RoomNameI {
  languageId: string;
  name: string;
}

export default function AddRoomName() {
  const { roomId } = useAppContext();
  const [open, setOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const { vendorHotelRoomData, getStayRoomDataAction } =
    useGetVendorHotelRoom({ roomId });

  const { vendorHotelRoomNames } = vendorHotelRoomData ?? {};

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RoomNameI>({
    defaultValues: { languageId: '', name: '' },
    resolver: yupResolver(roomNameSchema),
  });

  const { control: readOnlyControl } = useForm<RoomNamesI>({
    defaultValues: {
      roomNames: vendorHotelRoomNames,
    },
  });

  const { fields, replace } = useFieldArray<RoomNamesI>({
    name: 'roomNames',
    control: readOnlyControl,
  });

  useEffect(() => {
    replace(vendorHotelRoomNames as VendorHotelRoomNamesEntityI[]);
  }, [replace, vendorHotelRoomNames]);

  const {
    control: editControl,
    setValue: setEditValue,
    handleSubmit: editHandleSubmit,
  } = useForm<RoomNameI>({
    defaultValues: { languageId: '', name: '' },
  });

  const onAddVendorRoomName = async () => {
    setOpen(false);
    reset();
    await getStayRoomDataAction();
  };

  const { EditVendorHotelRoomNameAction } = usePutEditVendorHotelRoomName({
    onSuccess: () => {
      getStayRoomDataAction().catch((err) => console.log(err));
    },
  });

  const { addVendorHotelRoomNameAction } = usePostAddVendorHotelRoomName({
    onSuccess: () => {
      onAddVendorRoomName().catch((err) => console.log(err));
    },
  });

  const onSubmit = ({ languageId, name }: RoomNameI) => {
    addVendorHotelRoomNameAction({
      vendorHotelRoomId: roomId,
      vendorHotelRoomNames: [{ languageId, name }],
    });
  };

  const onEditSubmit = ({ languageId, name }: RoomNameI) => {
    const x = vendorHotelRoomNames?.filter(
      (room) => languageId !== room.languageId,
    );

    EditVendorHotelRoomNameAction({
      vendorHotelRoomId: roomId,
      vendorHotelRoomNames: [
        ...(x as VendorHotelRoomNamesEntityI[]),
        { languageId, name },
      ],
    });

    setEditModalOpen(false);
  };

  const onDeleteName =
    ({ nameLanguageId }: { nameLanguageId: string }) =>
    () => {
      const x = vendorHotelRoomNames?.filter(
        ({ languageId }) => nameLanguageId !== languageId,
      );

      EditVendorHotelRoomNameAction({
        vendorHotelRoomId: roomId,
        vendorHotelRoomNames: x as VendorHotelRoomNamesEntityI[],
      });
    };

  const onEditName =
    ({ languageId, name }: RoomNameI) =>
    () => {
      setEditValue('languageId', languageId);
      setEditValue('name', name);
      setEditModalOpen(true);
    };

  return (
    <div className="border-b border-b-gray-200 pb-6">
      <div className="mt-6 flex justify-between">
        <div>
          <p className="text-lg font-normal text-gray-900">Add Name</p>
        </div>
        <Button color="secondary" onClick={() => setOpen(true)}>
          <>
            <Plus size={20} />
            <span className="ml-2">Add</span>
          </>
        </Button>
      </div>
      {fields.map(({ name, languageId, languageName, id }, index) => (
        <div className="flex gap-6 mt-10" key={id}>
          <Select
            control={readOnlyControl}
            name={`roomNames.${index}.languageId`}
            className="w-60 h-11"
            label="Language"
            disabled
          >
            <MenuItem value={languageId}>{languageName}</MenuItem>
          </Select>
          <Input
            control={readOnlyControl}
            name={`roomNames.${index}.name`}
            label="Room Name"
            className="w-60 h-11"
            disabled
          />
          <div className="flex gap-4 items-center mt-6">
            <Box
              className="cursor-pointer font-medium text-sm text-Primary/900"
              onClick={onEditName({ languageId, name })}
            >
              Edit
            </Box>
            <Box
              className="cursor-pointer font-medium text-sm text-gray-500"
              onClick={onDeleteName({ nameLanguageId: languageId })}
            >
              Delete
            </Box>
          </div>
        </div>
      ))}
      <RoomNameModal
        control={control}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        open={open}
        setOpen={setOpen}
        title="Add Name"
        errors={errors}
      />
      <RoomNameModal
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
