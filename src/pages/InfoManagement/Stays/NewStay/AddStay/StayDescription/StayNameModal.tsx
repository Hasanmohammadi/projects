import { MenuItem } from '@mui/material';
import { Button, Input, Modal, Select } from 'Common';
import { useGetLanguages } from 'Hooks/General';
import { StayNameI } from 'Types/Stay';
import { Control, FieldErrors } from 'react-hook-form';
import { UseFormHandleSubmit } from 'react-hook-form/dist/types/form';

interface StayNameModalI {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: UseFormHandleSubmit<any>;
  onSubmit: ({ languageId, name }: StayNameI) => void;
  control: Control<StayNameI>;
  title: string;
  errors?: FieldErrors<StayNameI>;
}

export default function StayNameModal({
  open,
  setOpen,
  handleSubmit,
  onSubmit,
  control,
  title,
  errors,
}: StayNameModalI) {
  const { getLanguagesData } = useGetLanguages();

  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <form className="w-96 h-[340px]" onSubmit={handleSubmit(onSubmit)}>
          <p className="font-medium text-lg text-gray-900">{title}</p>

          <div className="mt-5">
            <Select
              control={control}
              name="languageId"
              className="w-full h-11"
              label="language"
              errorMessage={errors?.languageId?.message}
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
            label="Stay Name"
            className="w-full h-11 mt-3"
            errorMessage={errors?.name?.message}
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
