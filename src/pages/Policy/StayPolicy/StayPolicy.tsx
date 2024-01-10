import { yupResolver } from '@hookform/resolvers/yup';
import { MenuItem } from '@mui/material';
import {
  Button,
  EditVendorLoading,
  Input,
  Select,
  SelectSearch,
} from 'Common';
import { useAppContext } from 'Context';
import { stayPolicySchema } from 'FormValidation';
import { createStayPolicyDefaultValue } from 'Helpers';
import {
  convertFormPolicyDataToApi,
  convertStayPolicyToApiData,
} from 'Helpers/stay';
import {
  useGetStayInformation,
  usePostAddStayPolicy,
  usePutEditStayPolicy,
} from 'Hooks/Stay';
import { useGetVendorHotels } from 'Hooks/Vendors';
import { StayPolicyI } from 'Types/Stay/stay';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface PolicyI {
  fromAge: number;
  toAge: number;
  passengerType: number;
  bedRequired: number;
}

export interface StayPolicyFormI {
  hotelId: string;
  noshowHour: number;
  noShowMin: number;
  onlyAdultAccepted: number;
  onlyManNotAccepted: number;
  infantPolicy: PolicyI;
  child1Policy: PolicyI;
  child2Policy: PolicyI;
}

interface FacilitiesPropsI {
  defaultValue?: StayPolicyI;
  loading?: boolean;
  editMode?: boolean;
}

export default function StayPolicy({
  defaultValue,
  loading,
  editMode,
}: FacilitiesPropsI) {
  const { hotelId, vendorIdSelected, setHotelId } = useAppContext();
  const [textSearched, setTextSearched] = useState<string>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<StayPolicyFormI>({
    values: createStayPolicyDefaultValue({
      dataDefaultValue: defaultValue,
      hotelId,
    }),
    defaultValues: createStayPolicyDefaultValue({
      dataDefaultValue: defaultValue,
      hotelId,
    }),
    resolver: yupResolver(stayPolicySchema),
  });

  const {
    control: selectsControl,
    watch: selectsWatch,
    handleSubmit: selectHandelSubmit,
    setValue: selectSetValue,
  } = useForm<{ hotel: { id: string; label: string } }>({});

  const { getStayInformationAction } = useGetStayInformation({
    hotelId,
    VendorId: vendorIdSelected,
  });

  const { EditStayPolicyAction } = usePutEditStayPolicy({
    onSuccess: () => {
      getStayInformationAction().catch((err) => console.log(err));
      selectSetValue('hotel', { id: '', label: '' });
      setHotelId('');
    },
  });
  const { addHotelPolicyAction } = usePostAddStayPolicy({
    onSuccess: () => {
      getStayInformationAction().catch((err) => console.log(err));
      selectSetValue('hotel', { id: '', label: '' });
      setHotelId('');
    },
  });

  const { hotel } = selectsWatch();

  useEffect(() => {
    setHotelId('');
  }, [hotel, setHotelId]);

  const onSubmit = (data: StayPolicyFormI) => {
    if (editMode) {
      EditStayPolicyAction(
        convertFormPolicyDataToApi({
          data,
          stayPolicyId: defaultValue?.stayPolicyId as string,
          vendorId: vendorIdSelected,
          vendorStayPolicyId: defaultValue?.vendorStayPolicyId as string,
        }),
      );
    } else {
      addHotelPolicyAction(
        convertStayPolicyToApiData({ data, vendorId: vendorIdSelected }),
      );
    }
  };

  const { vendorsHotelsData, getVendorHotelLoading } = useGetVendorHotels({
    pageSize: 1000,
    isActive: true,
  });

  return (
    <div className="pb-4">
      <form
        onSubmit={selectHandelSubmit(() => setHotelId(hotel?.id))}
        className="mt-6 flex gap-3 w-full border-b border-b-gray-200 pb-5"
      >
        <SelectSearch
          disabled={vendorIdSelected.length < 23}
          label="Stay"
          control={selectsControl}
          name="hotel"
          items={vendorsHotelsData?.data
            ?.filter(({ active }) => active)
            .map(({ id, hotelNote }) => ({
              label: hotelNote,
              id,
            }))}
          containerClassName="w-64 h-11"
          setTextSearched={
            setTextSearched as React.Dispatch<React.SetStateAction<string>>
          }
          textSearched={textSearched as string}
          loading={getVendorHotelLoading}
          placeholder="Search Stay"
        />

        <Button
          className="h-11 w-full"
          containerClassName="w-48 mt-7"
          type="submit"
          disabled={!hotel}
        >
          Confirm
        </Button>
      </form>

      {loading && (
        <div className="mt-10">
          <EditVendorLoading hasHeader={false} />
        </div>
      )}

      {hotelId && !loading && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <p className="font-medium text-gray-700 text-sm mt-6">
              Policy
            </p>
            <div className="flex w-full justify-center">
              <p className="w-48 text-gray-700 font-normal text-sm self-center">
                Noshow
              </p>
              <div className="relative flex">
                <Input
                  className="w-36 h-11"
                  control={control}
                  name="noshowHour"
                  label="Hour"
                  required={!!errors.noshowHour?.message}
                />
              </div>
              <div className="relative flex pl-2">
                <Input
                  className="w-36 h-11"
                  control={control}
                  name="noShowMin"
                  label="Min"
                  required={!!errors.noShowMin?.message}
                />
              </div>
            </div>
            <div className="flex w-full justify-center mt-12">
              <p className="w-48 text-gray-700 font-normal text-sm self-center">
                Adult only
              </p>
              <Select
                control={control}
                name="onlyAdultAccepted"
                className="w-[296px] h-11"
                defaultValue="0"
              >
                <MenuItem value={0}>No</MenuItem>
                <MenuItem value={1}>Yes</MenuItem>
              </Select>
            </div>
            <div className="flex w-full justify-center mt-5">
              <p className="w-48 text-gray-700 font-normal text-sm self-center">
                Cupels only
              </p>
              <Select
                control={control}
                name="onlyManNotAccepted"
                className="w-[296px] h-11"
                defaultValue="0"
              >
                <MenuItem value={0}>No</MenuItem>
                <MenuItem value={1}>Yes</MenuItem>
              </Select>
            </div>
          </div>
          <div className="border-t border-t-gray-200 mt-6">
            <p className="font-medium text-gray-700 text-sm mt-6">
              Child Policy
            </p>
            <div className="flex w-full justify-center">
              <p className="w-48 text-gray-700 font-normal text-sm self-center">
                Infant
              </p>
              <div className="flex gap-2.5 mt-2">
                <div className="flex gap-1">
                  <Input
                    className="w-[70px] h-11"
                    control={control}
                    name="infantPolicy.fromAge"
                    placeholder="From"
                    label="From"
                    required={!!errors.infantPolicy?.fromAge}
                  />
                  <Input
                    className="w-[70px] h-11 "
                    control={control}
                    name="infantPolicy.toAge"
                    placeholder="To"
                    label="To"
                    required={!!errors.infantPolicy?.toAge}
                  />
                </div>
                <Select
                  control={control}
                  name="infantPolicy.bedRequired"
                  className="w-36 h-11"
                  label="Bed Required"
                >
                  <MenuItem value={0}>No</MenuItem>
                  <MenuItem value={1}>Yes</MenuItem>
                </Select>
              </div>
            </div>
            <div className="flex w-full justify-center mt-7">
              <p className="w-48 text-gray-700 font-normal text-sm self-center">
                Child 1
              </p>
              <div className="flex gap-2.5 mt-2">
                <div className="flex gap-1">
                  <Input
                    className="w-[70px] h-11"
                    control={control}
                    name="child1Policy.fromAge"
                    placeholder="From"
                    label="From"
                    required={!!errors.child1Policy?.fromAge}
                  />
                  <Input
                    className="w-[70px] h-11 "
                    control={control}
                    name="child1Policy.toAge"
                    placeholder="To"
                    label="To"
                    required={!!errors.child1Policy?.toAge}
                  />
                </div>
                <Select
                  control={control}
                  name="child1Policy.bedRequired"
                  className="w-36 h-11"
                  label="Bed Required"
                  defaultValue="0"
                >
                  <MenuItem value={0}>No</MenuItem>
                  <MenuItem value={1}>Yes</MenuItem>
                </Select>
              </div>
            </div>
            <div className="flex w-full justify-center mt-7">
              <p className="w-48 text-gray-700 font-normal text-sm self-center">
                Child 2
              </p>
              <div className="flex gap-2.5 mt-2">
                <div className="flex gap-1">
                  <Input
                    className="w-[70px] h-11"
                    control={control}
                    name="child2Policy.fromAge"
                    placeholder="From"
                    label="From"
                    required={!!errors.child2Policy?.fromAge}
                  />
                  <Input
                    className="w-[70px] h-11 "
                    control={control}
                    name="child2Policy.toAge"
                    placeholder="To"
                    label="To"
                    required={!!errors.child2Policy?.toAge}
                  />
                </div>
                <Select
                  control={control}
                  name="child2Policy.bedRequired"
                  className="w-36 h-11"
                  label="Bed Required"
                  defaultValue="0"
                >
                  <MenuItem value={0}>No</MenuItem>
                  <MenuItem value={1}>Yes</MenuItem>
                </Select>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap flex-row-reverse mt-6 pt-4 gap-3 border-t border-t-gray-200">
            <Button color="primary" className="h-10 px-4" type="submit">
              <div className="flex flex-wrap gap-2" role="presentation">
                Save and Next
              </div>
            </Button>
            <Button color="ghost" className="h-10 px-4">
              <div className="flex flex-wrap gap-2">Back</div>
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
