import { MenuItem } from '@mui/material';
import { Button, Input, Modal, Select } from 'Common';
import { useGetLanguages } from 'Hooks/General';
import { Control, FieldErrors } from 'react-hook-form';
import { UseFormHandleSubmit } from 'react-hook-form/dist/types/form';

import { RoomNameI } from '../AddRoomName';

interface RoomNameModalI {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: UseFormHandleSubmit<any>;
  onSubmit: ({ languageId, name }: RoomNameI) => void;
  control: Control<RoomNameI>;
  title: string;
  errors: FieldErrors<RoomNameI>;
}

export default function RoomNameModal({
  open,
  setOpen,
  handleSubmit,
  onSubmit,
  control,
  title,
  errors,
}: RoomNameModalI) {
  const { getLanguagesData } = useGetLanguages();

  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <form className="w-96 h-auto" onSubmit={handleSubmit(onSubmit)}>
          <p className="font-medium text-lg text-gray-900">{title}</p>

          <div className="mt-5">
            <Select
              control={control}
              name="languageId"
              className="w-full h-11"
              label="language"
              errorMessage={errors.languageId?.message}
            >
              <MenuItem value="" disabled>
                Select language
              </MenuItem>
              {getLanguagesData?.map(({ name, id }) => (
                <MenuItem value={id}>{name}</MenuItem>
              ))}
            </Select>
          </div>
          <Input
            control={control}
            name="name"
            label="Room Name"
            className="w-full h-11 mt-3"
            errorMessage={errors.name?.message}
          />
          <div className="flex w-full justify-between gap-3 mt-16">
            <Button
              color="ghost"
              className="w-full"
              containerClassName="w-full"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              className="w-full"
              containerClassName="w-full"
              type="submit"
            >
              Add
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
