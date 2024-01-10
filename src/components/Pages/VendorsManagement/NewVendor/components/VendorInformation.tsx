import { yupResolver } from '@hookform/resolvers/yup';
import { MenuItem } from '@mui/material';
import { Button, DatePicker, Input, Select, SelectSearch } from 'Common';
import { vendorInformationSchema } from 'FormValidation';
import { defaultDate } from 'Helpers';
import { useGetCountries } from 'Hooks/General';
import useGetCities from 'Hooks/General/useGetCities';
import { useGetCurrencyList } from 'Hooks/Market';
import { CountryI } from 'Types/General';
import { CurrencyI } from 'Types/Market';
import { NullResultI } from 'Types/Vendors';
import { useState } from 'react';
import { Globe, Mail } from 'react-feather';
import { SubmitHandler, useForm } from 'react-hook-form';
import { UseMutateFunction } from 'react-query';
import { Params, useNavigate } from 'react-router-dom';

import { VendorFormInputsI } from '../NewVendor';
import DynamicForm from './contactDynamicform/DynamicForm';

interface VendorInformationPropsI {
  vendorAction?: (data: VendorFormInputsI) => void;
  inputsDefaultValue: VendorFormInputsI;
  editVendorAction?: UseMutateFunction<
    NullResultI,
    unknown,
    {
      vendorData: VendorFormInputsI;
      id: string | Readonly<Params<string>>;
    },
    unknown
  >;
  vendorId?: string;
  loading?: boolean;
}

export default function VendorInformation({
  vendorAction,
  inputsDefaultValue,
  editVendorAction,
  vendorId,
  loading,
}: VendorInformationPropsI) {
  const [textSearched, setTextSearched] = useState<string>();

  const {
    control,
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<VendorFormInputsI>({
    defaultValues: inputsDefaultValue,
    resolver: yupResolver(vendorInformationSchema),
  });

  const { countryId } = watch();
  console.log('🚀 ~ file: VendorInformation.tsx:58 ~ watch():', watch());
  const navigate = useNavigate();

  const { currencyListData, currencyListLoading } = useGetCurrencyList();
  const { countriesData, countryLoading } = useGetCountries();
  const { citiesData, citiesLoading } = useGetCities({
    countryId,
    cityName: textSearched as string,
    enabled:
      typeof textSearched === 'string' ? textSearched?.length >= 2 : false,
  });

  const onSubmit: SubmitHandler<VendorFormInputsI> = (data) => {
    if (editVendorAction) {
      editVendorAction({
        id: vendorId as string | Readonly<Params<string>>,
        vendorData: data,
      });
    } else if (vendorAction) {
      vendorAction(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className="mt-8 flex justify-between w-full">
          <div>
            <p className="text-lg font-medium text-gray-900">
              Vendor Information
            </p>
          </div>
          <div className="flex flex-wrap flex-row-reverse mt-4 gap-3">
            <Button
              color="primary"
              className="h-10 px-4"
              type="submit"
              loading={loading}
            >
              <div className="flex flex-wrap gap-2">Save</div>
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
              className="w-[244px] h-11"
              label="Vendor Name"
              name="name"
              placeholder="Enter Name"
              control={control}
              errorMessage={errors.name?.message}
            />
            <Input
              className="w-[244px] h-11"
              label="Display Name"
              name="displayName"
              placeholder="Enter Display Name"
              control={control}
              errorMessage={errors.displayName?.message}
            />
          </div>
          <div> </div>
        </div>
        <div className="pb-6 flex flex-wrap gap-8">
          <div className="flex w-72"> </div>
          <div className="flex flex-wrap gap-6 mt-6">
            <Input
              className="w-[244px] h-11"
              icon={<Globe color="#667085" />}
              label="Website"
              name="website"
              placeholder="Enter Website"
              control={control}
              errorMessage={errors.website?.message}
            />
            <Input
              className="w-[244px] h-11"
              icon={<Mail color="#667085" />}
              label="Email"
              name="email"
              placeholder="Enter Email"
              control={control}
              errorMessage={errors.email?.message}
            />
          </div>
          <div> </div>
        </div>
        <div className="pt-6 mt-5 border-t border-t-gray-200 flex flex-wrap gap-8 w-full">
          <p className="font-medium text-sm text-gray-700 flex w-72">
            Currency
          </p>
          <Select
            control={control}
            name="currencyId"
            className="w-[512px] h-11"
            loading={currencyListLoading}
          >
            {currencyListData?.map(({ name, id }: CurrencyI) => (
              <MenuItem key={id} value={id}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div className="pt-6 pb-12 mt-5 border-t border-t-gray-200 flex flex-wrap gap-8 w-full">
          <p className="font-medium text-sm text-gray-700 flex w-72">
            Address
          </p>
          <div>
            <div className="flex flex-nowrap gap-6 w-[512px]">
              <Select
                defaultValue="none"
                className="w-[246px] h-11"
                label="Country"
                control={control}
                name="countryId"
                errorMessage={errors.countryId?.message}
                loading={countryLoading}
              >
                {countriesData?.map((country: CountryI) => (
                  <MenuItem key={country.id} value={country.id}>
                    <span
                      className={`fi fi-${country.flag.toLocaleLowerCase()} mr-2 rounded-lg`}
                    />
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
              <SelectSearch
                label="City"
                control={control}
                name="city"
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
                  (errors.city?.message && 'City is a required field !') ||
                  errors.city?.id?.message
                }
              />
            </div>
            <div className="mt-5 w-[512px]">
              <Input
                className="w-full h-11"
                label="Address"
                name="address"
                placeholder="Enter Address"
                control={control}
                errorMessage={errors.address?.message}
              />
            </div>
          </div>
        </div>
        <div className="pt-6 border-t border-t-gray-200 flex flex-wrap gap-8">
          <p className="font-medium text-sm text-gray-700 flex w-72">
            Contacts
          </p>
          <DynamicForm
            errors={errors}
            control={control}
            register={register}
          />
          <div> </div>
        </div>
        <div className="py-6 border-t border-b border-t-gray-200 border-b-gray-200  flex flex-wrap gap-8">
          <p className="font-medium text-sm text-gray-700 flex w-72">
            Activation date
          </p>
          <div className="flex gap-6">
            <DatePicker
              label="Start And Expire Date"
              type="RangeDay"
              className="h-11 w-[246px]"
              name="startAndExpireDate"
              control={control}
              size="sm"
              placeholder="Select date"
              minimumDate={defaultDate()?.from}
              position="top"
              iconPosition="left"
            />
            <Select
              className="w-[246px] h-11"
              label="Activation state"
              placeholder="select"
              control={control}
              name="isActive"
            >
              <MenuItem value="1">Active</MenuItem>
              <MenuItem value="">Deactivate</MenuItem>
            </Select>
          </div>
          <div> </div>
        </div>
        <div className="flex flex-wrap flex-row-reverse mt-4 gap-3">
          <Button
            color="primary"
            className="h-10 px-4"
            type="submit"
            loading={loading}
          >
            <div className="flex flex-wrap gap-2">Save</div>
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
    </form>
  );
}
