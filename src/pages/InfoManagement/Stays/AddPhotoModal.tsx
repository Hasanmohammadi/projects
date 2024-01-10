import { yupResolver } from '@hookform/resolvers/yup';
import { CircularProgress, MenuItem } from '@mui/material';
import { Button, Input, Modal, Select } from 'Common';
import { useAppContext } from 'Context';
import { stayAddPhotoSchema } from 'FormValidation';
import { usePostAddStayPhotos } from 'Hooks/Stay';
import useGetStayPhotoCategoryList from 'Hooks/Stay/useGetStayPhotoCategoryList';
import { StayInformationResultI } from 'Types/Stay';
import { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { UploadCloud } from 'react-feather';
import { useForm } from 'react-hook-form';
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from 'react-query';
import { toast } from 'react-toastify';

import FileUploaderContainerStyled from './NewStay/AddStay/FileUploader.style';

const fileTypes = ['JPEG', 'JPG', 'PNG'];

interface AddPhotoModalI {
  modalIsOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  getStayInformationAction?: <TPageData>(
    options?:
      | (RefetchOptions & RefetchQueryFilters<TPageData>)
      | undefined,
  ) => Promise<QueryObserverResult<StayInformationResultI, Error>>;
}

export default function AddPhotoModal({
  modalIsOpen,
  setModalIsOpen,
  getStayInformationAction,
}: AddPhotoModalI) {
  const { hotelId } = useAppContext();

  const [files, setFiles] = useState<File>();
  const [radioValue, setRadioValue] = useState({
    radioText: 'Upload',
    value: 'upload',
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      title: '',
      categoryId: '',
      url: '',
    },
    resolver: yupResolver(stayAddPhotoSchema),
  });
  const formData = new FormData();

  const { stayPhotoCategoryListData } = useGetStayPhotoCategoryList();
  const { addHotelPhotosAction, isLoading } = usePostAddStayPhotos({
    onSuccess: () => {
      setModalIsOpen(false);
      setValue('url', '');
      setValue('title', '');
      formData.append('categoryId', '');
      if (getStayInformationAction) {
        getStayInformationAction().catch((err) => console.log(err));
      }
    },
  });

  const handleChange = (file: File) => {
    setFiles(file);
  };

  const onSave = ({
    categoryId,
    title,
    url,
  }: {
    title: string;
    categoryId: string;
    url: string;
  }) => {
    formData.append('hotelId', hotelId);
    formData.append('categoryId', categoryId);
    formData.append('name', title);
    formData.append('photoLinks', url);
    formData.append('photoFiles', files as File);

    addHotelPhotosAction(formData);
  };

  const onCancel = () => {
    setModalIsOpen(false);
    setRadioValue({
      radioText: 'Upload',
      value: 'upload',
    });

    setValue('url', '');
    setValue('title', '');
    formData.delete('categoryId');
  };

  return (
    <Modal open={modalIsOpen} onClose={onCancel}>
      <form className="w-96" onSubmit={handleSubmit(onSave)}>
        <div className="border-b border-b-gray-200 pb-5">
          <h1 className="font-medium text-lg">Add image</h1>
        </div>
        <div className="border-b border-b-gray-200 py-5">
          <Input
            control={control}
            name="title"
            placeholder="Enter image title"
            className="h-11 w-full"
            label="Image title"
            errorMessage={errors.title?.message}
          />
          <Select
            control={control}
            name="categoryId"
            label="Category"
            containerClassName="w-full mt-10"
            className="w-full h-11"
            errorMessage={errors.categoryId?.message}
          >
            <MenuItem disabled value="">
              <span className="text-gray-400">Select category</span>
            </MenuItem>

            {stayPhotoCategoryListData?.map(
              ({ propertyId, propertyName }) => (
                <MenuItem value={propertyId}>{propertyName}</MenuItem>
              ),
            )}
          </Select>
        </div>
        <div className="pb-5 pt-2">
          {/* <RadioButton
            className="w-full"
            defaultValue="upload"
            radios={[
              {
                radioText: (
                  <span className="text-gray-600 font-normal">URL</span>
                ),
                value: 'url',
                size: 'small',
                className: 'border-b border-b-gray-200 pb-5',
                children: (
                  <Input
                    name="url"
                    control={control}
                    disabled={radioValue.value !== 'url'}
                    className="h-11 w-full"
                    placeholder="www.untitledui.com"
                  />
                ),
              },
              {
                radioText: (
                  <span className="text-gray-600 font-normal">Upload</span>
                ),
                value: 'upload',
                size: 'small',
                className: 'mt-2',
                children: (
                  <FileUploaderContainerStyled className="mt-2 relative cursor-pointer">
                    <FileUploader
                      handleChange={handleChange}
                      disabled={radioValue.value !== 'upload'}
                      name="file"
                      types={fileTypes}
                      maxSize={0.5}
                      onSizeError={(file: unknown) =>
                        toast.error(file as string, {
                          position: 'top-right',
                        })
                      }
                      onTypeError={(file: unknown) =>
                        toast.error(file as string, {
                          position: 'top-center',
                        })
                      }
                    >
                      <div className="w-full flex cursor-pointer">
                        {files ? (
                          <div className="flex-col w-full">
                            <div>File name: {files.name}</div>
                            <div className="m-auto mt-2 cursor-pointer">
                              <UploadCloud
                                color="#475467"
                                className="m-auto w-10 h-10 p-2 rounded-full bg-slate-100"
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="m-auto mt-4">
                            <div className="m-auto">
                              <UploadCloud
                                color="#475467"
                                className="m-auto w-10 h-10 p-2 rounded-full bg-slate-100"
                              />
                            </div>
                            <p className="font-normal text-sm text-gray-500 text-center mt-1">
                              <span className="font-medium text-sm text-black mr-1">
                                Click to upload
                              </span>
                              or drag and drop
                            </p>
                            <p className="font-normal text-sm text-gray-500 mt-1">
                              SVG, PNG, JPG (max. 200 kilobytes)
                            </p>
                          </div>
                        )}
                      </div>
                    </FileUploader>
                    {radioValue.value !== 'upload' && (
                      <div className="absolute w-full h-full bg-black top-0 rounded-lg opacity-5">
                        {' '}
                      </div>
                    )}
                  </FileUploaderContainerStyled>
                ),
              },
            ]}
            onChange={(e, value) => {
              setRadioValue({ value, radioText: '' });
            }}
          /> */}
          <FileUploaderContainerStyled className="mt-2 relative cursor-pointer">
            <FileUploader
              handleChange={handleChange}
              disabled={radioValue.value !== 'upload'}
              name="file"
              types={fileTypes}
              maxSize={0.5}
              onSizeError={(file: unknown) =>
                toast.error(file as string, {
                  position: 'top-right',
                })
              }
              onTypeError={(file: unknown) =>
                toast.error(file as string, {
                  position: 'top-center',
                })
              }
            >
              <div className="w-full flex cursor-pointer">
                {files ? (
                  <div className="flex-col w-full">
                    <div>File name: {files.name}</div>
                    <div className="m-auto mt-2 cursor-pointer">
                      <UploadCloud
                        color="#475467"
                        className="m-auto w-10 h-10 p-2 rounded-full bg-slate-100"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="m-auto mt-4">
                    <div className="m-auto">
                      <UploadCloud
                        color="#475467"
                        className="m-auto w-10 h-10 p-2 rounded-full bg-slate-100"
                      />
                    </div>
                    <p className="font-normal text-sm text-gray-500 text-center mt-1">
                      <span className="font-medium text-sm text-black mr-1">
                        Click to upload
                      </span>
                      or drag and drop
                    </p>
                    <p className="font-normal text-sm text-gray-500 mt-1">
                      SVG, PNG, JPG (max. 200 kilobytes)
                    </p>
                  </div>
                )}
              </div>
            </FileUploader>
            {radioValue.value !== 'upload' && (
              <div className="absolute w-full h-full bg-black top-0 rounded-lg opacity-5">
                {' '}
              </div>
            )}
          </FileUploaderContainerStyled>
        </div>
        {isLoading ? (
          <div className="w-full flex py-3">
            <CircularProgress className="m-auto" size={20} />
          </div>
        ) : (
          <div className="mt-4 flex w-full justify-center gap-3">
            <Button
              color="ghost"
              className="w-full h-full"
              containerClassName="w-full h-11"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              disabled={!radioValue.value}
              color="primary"
              className="w-full h-full"
              containerClassName="w-full h-11"
              type="submit"
            >
              Save
            </Button>
          </div>
        )}
      </form>
    </Modal>
  );
}
