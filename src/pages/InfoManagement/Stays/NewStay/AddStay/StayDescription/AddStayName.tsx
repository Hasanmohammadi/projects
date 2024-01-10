import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@mui/material';
import { Button, Input } from 'Common';
import { useAppContext } from 'Context';
import { stayNameSchema } from 'FormValidation';
import {
  useGetStayInformation,
  usePostAddStayName,
  usePutEditStayNames,
} from 'Hooks/Stay';
import { StayNameI } from 'Types/Stay';
import { VendorHotelRoomNamesEntityI } from 'Types/Vendors';
import { useEffect, useState } from 'react';
import { Plus } from 'react-feather';
import { useFieldArray, useForm } from 'react-hook-form';

import StayNameModal from './StayNameModal';

export interface StayNamesI {
  stayNames: VendorHotelRoomNamesEntityI[];
}

interface AddStayNamePropsI {
  hotelId: string;
}

export default function AddStayName({ hotelId }: AddStayNamePropsI) {
  const { vendorIdSelected } = useAppContext();
  const [open, setOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const { stayInformationData, getStayInformationAction } =
    useGetStayInformation({ hotelId, VendorId: vendorIdSelected });

  const { hotelName } = stayInformationData ?? {};

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StayNameI>({
    defaultValues: { languageId: '', name: '' },
    resolver: yupResolver(stayNameSchema),
  });

  const { control: readOnlyControl } = useForm<StayNamesI>({
    defaultValues: { stayNames: hotelName },
    resolver: yupResolver(stayNameSchema),
  });

  const { fields, replace } = useFieldArray<StayNamesI>({
    name: 'stayNames',
    control: readOnlyControl,
  });

  useEffect(() => {
    replace(hotelName as StayNameI[]);
  }, [replace, hotelName]);

  const {
    control: editControl,
    setValue: setEditValue,
    handleSubmit: editHandleSubmit,
    formState: { errors: editErrors },
  } = useForm<StayNameI>({
    defaultValues: { languageId: '', name: '' },
    resolver: yupResolver(stayNameSchema),
  });

  const onAddStayNames = async () => {
    setOpen(false);
    reset();
    await getStayInformationAction();
  };

  const { EditStayNamesAction } = usePutEditStayNames({
    onSuccess: () => {
      getStayInformationAction().catch((err) => console.log(err));
    },
  });

  const { addStayNameAction } = usePostAddStayName({
    onSuccess: () => {
      onAddStayNames().catch((err) => console.log(err));
    },
  });

  const onSubmit = ({ languageId, name }: StayNameI) => {
    addStayNameAction({
      hotelId,
      hotelNames: [{ languageId, name }],
    });
    setOpen(false);
    reset();
  };

  const onEditSubmit = ({ languageId, name }: StayNameI) => {
    const x = stayInformationData?.hotelName?.filter(
      (stay) => languageId !== stay.languageId,
    );

    EditStayNamesAction({
      hotelId,
      editHotelNames: [
        ...(x?.map((stay) => ({
          languageId: stay.languageId,
          name: stay.name,
        })) as {
          name: string;
          languageId: string;
        }[]),
        { languageId, name },
      ],
    });

    setEditModalOpen(false);
  };

  const onDeleteName =
    ({ nameLanguageId }: { nameLanguageId: string }) =>
    () => {
      const x = stayInformationData?.hotelName?.filter(
        ({ languageId }) => nameLanguageId !== languageId,
      );

      EditStayNamesAction({
        hotelId,
        editHotelNames: x as StayNameI[],
      });
    };

  const onEditName =
    ({ languageId, name }: StayNameI) =>
    () => {
      setEditValue('languageId', languageId);
      setEditValue('name', name);
      setEditModalOpen(true);
    };

  return (
    <div className="border-b border-b-gray-200 pb-12">
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
      {fields?.map(({ name, languageName, id, languageId }, index) => (
        <div className="flex gap-6 mt-10" key={id}>
          <Input
            control={readOnlyControl}
            name={`stayNames.${index}.languageName`}
            label="Language"
            className="w-60 h-11"
            disabled
          />
          <Input
            control={readOnlyControl}
            name={`stayNames.${index}.name`}
            label="Stay Name"
            className="w-60 h-11"
            disabled
          />

          <div className="flex gap-4 items-center mt-6">
            <Box
              className="cursor-pointer font-medium text-sm text-Primary/900"
              onClick={onEditName({
                languageId,
                name,
                id,
                languageName,
                languageCode: '',
              })}
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

      <StayNameModal
        control={control}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        open={open}
        setOpen={setOpen}
        title="Add Name"
        errors={errors}
      />
      <StayNameModal
        control={editControl}
        handleSubmit={editHandleSubmit}
        onSubmit={onEditSubmit}
        open={editModalOpen}
        setOpen={setEditModalOpen}
        title="Edit Name"
        errors={editErrors}
      />
    </div>
  );
}
