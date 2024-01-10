import { yupResolver } from '@hookform/resolvers/yup';
import { MenuItem } from '@mui/material';
import { Button, Input, Select } from 'Common';
import { useAppContext } from 'Context';
import { stayPolicySchema } from 'FormValidation';
import { convertStayPolicyToApiData } from 'Helpers/stay';
import { useGetStayInformation, usePostAddStayPolicy } from 'Hooks/Stay';
import { StayPolicyI } from 'Types/Stay/stay';
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
  setActiveTabIndex: React.Dispatch<React.SetStateAction<number>>;
  defaultValue?: StayPolicyI;
}

export default function StayPolicy({
  setActiveTabIndex,
  defaultValue,
}: FacilitiesPropsI) {
  const { hotelId, vendorIdSelected } = useAppContext();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<StayPolicyFormI>({
    mode: 'onChange',
    defaultValues: {
      hotelId,
      noshowHour:
        defaultValue?.cancellationPolicy.cancellationHour || +'00',
      noShowMin:
        defaultValue?.cancellationPolicy.cancellationMinute || +'00',
      onlyAdultAccepted: defaultValue?.cancellationPolicy.adultOnly
        ? 1
        : 0,
      onlyManNotAccepted: defaultValue?.cancellationPolicy.couplesOnly
        ? 1
        : 0,
      infantPolicy: {
        fromAge: defaultValue?.infant?.from,
        toAge: defaultValue?.infant?.to,
        passengerType: 4,
        bedRequired: defaultValue?.infant?.bedRequired ? 1 : 0,
      },
      child1Policy: {
        fromAge: defaultValue?.child1?.from,
        toAge: defaultValue?.child1?.to,
        passengerType: 1,
        bedRequired: defaultValue?.child1?.bedRequired ? 1 : 0,
      },
      child2Policy: {
        fromAge: defaultValue?.child2?.from,
        toAge: defaultValue?.child2?.to,
        passengerType: 2,
        bedRequired: defaultValue?.child2?.bedRequired ? 1 : 0,
      },
    },
    resolver: yupResolver(stayPolicySchema),
  });

  const { getStayInformationAction } = useGetStayInformation({
    hotelId,
    VendorId: vendorIdSelected,
  });

  const { addHotelPolicyAction } = usePostAddStayPolicy({
    setActiveTabIndex,
    onSuccess: () => {
      getStayInformationAction().catch((err) => console.log(err));
    },
  });

  const onSubmit = (data: StayPolicyFormI) => {
    addHotelPolicyAction(
      convertStayPolicyToApiData({ data, vendorId: vendorIdSelected }),
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="pb-4">
      <div className="mt-6 flex justify-between w-full border-b border-b-gray-200 pb-5">
        <div>
          <p className="text-lg font-medium text-gray-900">Policy</p>
        </div>
        <div className="flex flex-wrap flex-row-reverse mt-4 gap-3">
          <Button color="primary" className="h-10 px-4" type="submit">
            <div className="flex flex-wrap gap-2" role="presentation">
              Save and Next
            </div>
          </Button>
          <Button
            color="ghost"
            className="h-10 px-4"
            onClick={() => setActiveTabIndex((pre) => pre - 1)}
          >
            <div className="flex flex-wrap gap-2">Back</div>
          </Button>
        </div>
      </div>
      <div>
        <p className="font-medium text-gray-700 text-sm mt-6">Policy</p>
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
        <Button
          color="ghost"
          className="h-10 px-4"
          onClick={() => setActiveTabIndex((pre) => pre - 1)}
        >
          <div className="flex flex-wrap gap-2">Back</div>
        </Button>
      </div>
    </form>
  );
}
