/* eslint-disable react/jsx-props-no-spreading */

/* eslint-disable @typescript-eslint/no-unsafe-call */
import { yupResolver } from '@hookform/resolvers/yup';
import { MenuItem } from '@mui/material';
import {
  Button,
  Input,
  Modal,
  Select,
  SelectSearch,
  TextArea,
} from 'Common';
import { useAppContext } from 'Context';
import { stayInformationSchema } from 'FormValidation';
import { capitalizeFirstLetter } from 'Helpers';
import {
  convertLocationDistance,
  convertStayInfoToApiData,
} from 'Helpers/stay';
import { useGetCities, useGetCountries } from 'Hooks/General';
import { useGetStayInformation } from 'Hooks/Stay';
import usePostAddHotelDetail from 'Hooks/Stay/usePostAddHotelDetail';
import usePutEditHotelDetail from 'Hooks/Stay/usePutEditHotelDetail';
import { CountryI } from 'Types/General';
import { AddHotelDetailInfoI } from 'Types/Stay';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import {
  Globe,
  Mail,
  Map,
  Phone,
  PlusCircle,
  Printer,
  Trash,
} from 'react-feather';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { Params, useNavigate } from 'react-router-dom';

import LocationModal from './LocationModal';

interface VendorInformationPropsI {
  inputsDefaultValue?: AddHotelDetailInfoInputsI;
  stayName?: string | Readonly<Params<string>>;
  setActiveTabIndex: React.Dispatch<React.SetStateAction<number>>;
  isEdit: boolean;
}

export interface AddHotelDetailInfoInputsI
  extends Omit<
    AddHotelDetailInfoI,
    'locationDistanceList' | 'stayLocation'
  > {
  locationDistanceList: {
    location: string;
    distance: string;
    unit?: 'KM' | 'M';
    id?: string;
  }[];
  stayLocation: {
    hotelId: string;
    addressDetail: string;
    latitude: string;
    longitude: string;
    countryId: string;
    city: { id: string; label: string };
  };
}

export default function StayInformation({
  inputsDefaultValue,
  stayName,
  setActiveTabIndex,
  isEdit,
}: VendorInformationPropsI) {
  const { hotelId, vendorIdSelected } = useAppContext();
  const [locationModalOpen, setLocationModalOpen] = useState(false);

  // const controlReference = useRef(null);

  const [anchor, setAnchor] = useState<[number, number]>([
    35.76624041884067, 51.39519704404526,
  ]);

  const [textSearched, setTextSearched] = useState<string>();

  const {
    control,
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<AddHotelDetailInfoInputsI>({
    mode: 'onChange',
    resolver: yupResolver(stayInformationSchema),
    defaultValues: inputsDefaultValue,
  });

  const navigate = useNavigate();

  const { countriesData } = useGetCountries();

  const { stayLocation } = watch();
  console.log(
    '🚀 ~ file: StayInformation.tsx:106 ~  watch():',
    watch().locationDistanceList,
  );

  const { citiesData, citiesLoading } = useGetCities({
    countryId: stayLocation?.countryId,
    cityName: textSearched as string,
    enabled:
      typeof textSearched === 'string' ? textSearched?.length >= 2 : false,
  });

  const { getStayInformationAction, stayInformationData } =
    useGetStayInformation({
      hotelId,
      VendorId: vendorIdSelected,
    });

  const { addHotelDetailAction } = usePostAddHotelDetail({
    setActiveTabIndex,
    onSuccess: () => {
      getStayInformationAction().catch((err) => console.log(err));
    },
  });

  const { editHotelDetailAction } = usePutEditHotelDetail({
    setActiveTabIndex,
    onSuccess: () => {
      getStayInformationAction().catch((err) => console.log(err));
    },
  });

  const onSubmit: SubmitHandler<AddHotelDetailInfoInputsI> = (data) => {
    if (isEdit) {
      editHotelDetailAction({
        HotelDetailInfo: convertStayInfoToApiData({
          stayInfo: {
            ...data,
            locationDistanceList: convertLocationDistance(
              data.locationDistanceList,
            ),
          },
          anchor: {
            lat: anchor[0].toString(),
            long: anchor[1].toString(),
          },
          hotelId,
          hotelDetailId: stayInformationData?.hotelDetailId,
        }),
      });
    } else {
      addHotelDetailAction({
        HotelDetailInfo: convertStayInfoToApiData({
          stayInfo: {
            ...data,
            locationDistanceList: convertLocationDistance(
              data.locationDistanceList,
            ),
          },
          anchor: {
            lat: anchor[0].toString(),
            long: anchor[1].toString(),
          },
          hotelId,
          hotelDetailId: stayInformationData?.hotelDetailId,
        }),
      });
    }
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'locationDistanceList',
  });
  console.log('🚀 ~ file: StayInformation.tsx:178 ~ fields:', fields);

  useEffect(() => {
    if (!fields.length) {
      append({
        distance: '0',
        location: '',
        unit: 'KM',
      });
    }
  }, []);

  useEffect(() => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }, []);

  useEffect(() => {
    const x = citiesData?.find(
      ({ cityId }) => cityId === stayLocation?.city?.id,
    );
    if (x) setAnchor([+x?.latitude, +x?.longitude]);
  }, [citiesData, stayLocation?.city?.id]);

  useEffect(() => {
    setAnchor([
      Number(inputsDefaultValue?.stayLocation?.latitude as string),
      Number(inputsDefaultValue?.stayLocation?.longitude as string),
    ]);
  }, [inputsDefaultValue?.stayLocation]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className="mt-8 flex justify-between w-full">
          <div>
            <p className="text-lg font-medium text-gray-900">
              {isEdit
                ? `${stayInformationData?.note as string} Information`
                : `${capitalizeFirstLetter(
                    stayName as string,
                  )} Information`}
            </p>
          </div>
          <div className="flex flex-wrap flex-row-reverse mt-4 gap-3">
            <Button color="primary" className="h-10 px-4" type="submit">
              <div className="flex flex-wrap gap-2">Save and Next</div>
            </Button>
            <Button
              color="ghost"
              className="h-10 px-4"
              onClick={() => navigate(-1)}
            >
              <div className="flex flex-wrap gap-2">Cancel</div>
            </Button>
          </div>
        </div>
        <div className="py-6 mt-5 border-t border-t-gray-200 flex flex-wrap gap-8">
          <p className="font-medium text-sm text-gray-700 flex w-72">
            General information
          </p>
          <div className="flex flex-wrap gap-6">
            <Input
              autoFocus
              className="w-[244px] h-11"
              label="Stay name"
              name="name"
              placeholder="Enter Name"
              control={control}
              errorMessage={errors.name?.message}
            />
            <Input
              className="w-[244px] h-11"
              label="Stay official title"
              name="officialName"
              placeholder="Enter Title"
              control={control}
            />
          </div>
          <div> </div>
        </div>
        <div className="pb-6 flex flex-wrap gap-8 mt-5">
          <div className="flex w-72"> </div>
          <div className="flex flex-wrap gap-6">
            <Input
              className="w-[244px] h-11"
              icon={<Mail color="#667085" size={20} />}
              label="Email"
              name="email"
              placeholder="olivia@untitledui.com"
              control={control}
            />
            <Input
              className="w-[244px] h-11"
              icon={<Phone color="#667085" className="mt-0.5" size={20} />}
              label="Phone number"
              name="primaryMobilePhone"
              placeholder="+1 (555) 000-0000"
              type="number"
              control={control}
              errorMessage={errors.primaryMobilePhone?.message}
            />
          </div>
          <div> </div>
        </div>
        <div className="pb-6 flex flex-wrap gap-8 mt-5">
          <div className="flex w-72"> </div>
          <div className="flex flex-wrap gap-6">
            <Input
              className="w-[244px] h-11"
              label="Postal code"
              name="postalCode"
              placeholder="Enter Postal Code"
              control={control}
            />
            <Input
              className="w-[244px] h-11"
              icon={
                <Printer color="#667085" className="mt-0.5" size={20} />
              }
              label="Fax"
              name="fax"
              placeholder="+1 (555) 000-0000"
              control={control}
            />
          </div>
          <div> </div>
        </div>
        <div className="pb-6 flex flex-wrap gap-8 mt-5">
          <div className="flex w-72"> </div>
          <div className="flex flex-wrap gap-6">
            <div className=" w-[512px]">
              <Input
                icon={<Globe color="#667085" size={20} />}
                className="w-full h-11"
                label="Website"
                name="website"
                placeholder="Enter Website"
                control={control}
              />
            </div>
          </div>
          <div> </div>
        </div>
        <div className="py-6 mt-5 border-t border-t-gray-200 flex flex-wrap gap-8 w-full">
          <p className="font-medium text-sm text-gray-700 flex w-72 ">
            Address
          </p>
          <div className="flex  gap-6">
            <Select
              defaultValue="none"
              className="w-[246px] h-11"
              label="Country"
              control={control}
              name="stayLocation.countryId"
              errorMessage={errors.stayLocation?.countryId?.message}
            >
              {countriesData?.map((country: CountryI) => (
                <MenuItem key={country?.id} value={country?.id}>
                  <span
                    className={`fi fi-${country.flag.toLowerCase()} mr-2 rounded-lg`}
                  />
                  {country.name}
                </MenuItem>
              ))}
            </Select>
            <SelectSearch
              disabled={!stayLocation?.countryId}
              label="City"
              control={control}
              name="stayLocation.city"
              items={citiesData?.map(({ cityId, cityName }) => ({
                label: cityName,
                id: cityId,
              }))}
              className="w-[246px] h-11"
              setTextSearched={
                setTextSearched as React.Dispatch<
                  React.SetStateAction<string>
                >
              }
              textSearched={textSearched as string}
              loading={citiesLoading}
              placeholder="Search City"
              errorMessage={
                (errors.stayLocation?.city?.message &&
                  'City is a required field !') ||
                errors.stayLocation?.city?.id?.message
              }
            />
          </div>
        </div>
        <div className=" flex gap-8 w-full">
          <div className="font-medium text-sm text-gray-700 flex w-72 ">
            {' '}
          </div>
          <Button
            color="secondary"
            containerClassName="h-11 w-[512px]"
            className="h-full w-full"
            onClick={() => setLocationModalOpen(true)}
          >
            <div className="flex gap-3">
              <Map color="#FB6514" size={20} className="mt-0.5" />
              <span className="text-primary">Choose a location</span>
            </div>
          </Button>
        </div>
        <div className="mt-5 flex gap-8 w-full">
          <div className="font-medium text-sm text-gray-700 flex w-72 ">
            {' '}
          </div>
          <Input
            className="h-11 w-[512px]"
            label="Address Detail"
            name="stayLocation.addressDetail"
            placeholder="Enter Address"
            control={control}
          />
        </div>
        <div className="flex flex-wrap gap-8 w-full mt-12">
          <p className="font-medium text-sm text-gray-700 flex w-72 ">
            Distance to
          </p>
          <div className="flex flex-col gap-5">
            {fields.map(({ id, distance, location, unit }, index) => (
              <div className="h-16 relative" key={id}>
                <div className="flex flex-wrap gap-8">
                  <div className="flex flex-col">
                    <p className="text-sm font-medium mb-2 text-gray-700">
                      Location Name
                    </p>
                    <input
                      defaultValue={location}
                      className="py-4 px-6 border border-gray-200 text-gray-500 text-sm w-[244px] font-normal rounded-lg h-11"
                      placeholder="Enter Name"
                      {...register(
                        `locationDistanceList.${index}.location` as const,
                      )}
                      // ref={controlReference}
                    />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-sm font-medium mb-2 text-gray-700">
                      Distance
                    </p>
                    <div className="relative flex">
                      <input
                        defaultValue={distance}
                        className="py-4 px-6 border border-gray-200 text-gray-500 text-sm w-[244px] font-normal rounded-lg h-11"
                        placeholder="Enter Distance"
                        {...register(
                          `locationDistanceList.${index}.distance` as const,
                        )}
                        // ref={controlReference}
                      />
                      <div className="absolute right-0 top-2.5 flex">
                        <Select
                          defaultValue={unit}
                          type="ghost"
                          {...register(
                            `locationDistanceList.${index}.unit` as const,
                          )}
                          control={control}
                          className="h-1"
                        >
                          <MenuItem key="M" id="M" value="M">
                            <span className="text-sm text-gray-500">
                              M
                            </span>
                          </MenuItem>
                          <MenuItem key="KM" id="KM" value="KM">
                            <span className="text-sm text-gray-500">
                              KM
                            </span>
                          </MenuItem>
                        </Select>
                      </div>
                    </div>
                  </div>
                  <div
                    className={clsx(
                      'flex justify-between absolute top-10',
                      {
                        '-right-[68px]': index === fields.length - 1,
                        '-right-10': index !== fields.length - 1,
                      },
                    )}
                  >
                    {(index !== fields.length - 1 ||
                      fields.length > 1) && (
                      <button type="button" onClick={() => remove(index)}>
                        <Trash
                          className="mx-2"
                          size={20}
                          color="#667085"
                        />
                      </button>
                    )}
                    {index === fields.length - 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          append({
                            distance: '0',
                            location: '',
                            unit: 'KM',
                          })
                        }
                      >
                        <PlusCircle
                          className="ml-2"
                          size={20}
                          color="#667085"
                        />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="py-6 mt-10 border-t border-t-gray-200 flex flex-wrap gap-8 w-full">
        <div className="w-72">
          <p className="font-medium text-sm text-gray-700">Description</p>
          <span className="text-gray-500">
            Write a short introduction.
          </span>
        </div>
        <TextArea
          control={control}
          name="description"
          className="w-[512px] h-32"
        />
      </div>
      <div className="flex flex-wrap flex-row-reverse mt-4 gap-3 border-t border-t-gray-200 py-6">
        <Button color="primary" className="h-10 px-4" type="submit">
          <div className="flex flex-wrap gap-2">Save and Next</div>
        </Button>
        <Button
          color="ghost"
          className="h-10 px-4"
          onClick={() => navigate(-1)}
        >
          <div className="flex flex-wrap gap-2">Cancel</div>
        </Button>
      </div>

      <Modal
        open={locationModalOpen}
        onClose={() => setLocationModalOpen(false)}
      >
        <LocationModal
          anchor={anchor}
          setAnchor={setAnchor}
          onApply={() => setLocationModalOpen(false)}
        />
      </Modal>
    </form>
  );
}
