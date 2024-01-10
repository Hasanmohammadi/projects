import { MenuItem } from '@mui/material';
import { Button, Modal, Select, TextArea } from 'Common';
import { useGetLanguages } from 'Hooks/General';
import { Control, FieldErrors } from 'react-hook-form';
import { UseFormHandleSubmit } from 'react-hook-form/dist/types/form';

import { AddRoomDescriptionI } from '../AddRoomDescription';

interface RoomDescriptionModalI {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: UseFormHandleSubmit<any>;
  onSubmit: ({
    longDescription,
    shortDescription,
  }: AddRoomDescriptionI) => void;
  control: Control<AddRoomDescriptionI>;
  title: string;
  errors: FieldErrors<AddRoomDescriptionI>;
}

export default function RoomDescriptionModal({
  open,
  setOpen,
  handleSubmit,
  onSubmit,
  control,
  title,
  errors,
}: RoomDescriptionModalI) {
  const { getLanguagesData } = useGetLanguages();

  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <form className="w-96 h-[580px]" onSubmit={handleSubmit(onSubmit)}>
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
          <TextArea
            control={control}
            name="shortDescription"
            label="Short Description"
            className="w-full h-[100px] mt-3"
            errorMessage={errors.shortDescription?.message}
          />
          <TextArea
            control={control}
            name="longDescription"
            label="Long Description"
            className="w-full h-[140px] mt-10"
            errorMessage={errors.longDescription?.message}
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
