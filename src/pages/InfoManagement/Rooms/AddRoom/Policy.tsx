import { yupResolver } from '@hookform/resolvers/yup';
import { Button, DatePicker, Input } from 'Common';
import { useAppContext } from 'Context';
import { roomPolicySchema } from 'FormValidation';
import { convertDateToUtc } from 'Helpers';
import {
  useGetVendorHotelRoom,
  usePostAddCancellationPolicy,
} from 'Hooks/Vendors/VendorHotelRooms';
import { SubmitHandler, useForm } from 'react-hook-form';

interface CancellationPolicyI {
  title: string;
  salesChannelId: string;
  freeCancellationDay: number;
  startAndExpireDate: {
    from: {
      day: number;
      month: number;
      year: number;
    };
    to: {
      day: number;
      month: number;
      year: number;
    };
  };
  cancellationPolicy1Percent: number;
  cancellationPolicy1Day: number;
  cancellationPolicy2Percent: number;
  cancellationPolicy2Day: number;
  noShowTimePercent: number;
}

interface PolicyPropsI {
  setActiveTabIndex: React.Dispatch<React.SetStateAction<number>>;
  defaultValues: CancellationPolicyI;
}

export default function Policy({
  setActiveTabIndex,
  defaultValues,
}: PolicyPropsI) {
  const { roomId } = useAppContext();
  const {
    control: policyControl,
    handleSubmit: policyHandleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(roomPolicySchema),
  });

  const { getStayRoomDataAction } = useGetVendorHotelRoom({
    roomId,
  });

  const { addCancellationPolicyAction } = usePostAddCancellationPolicy({
    setActiveTabIndex,
    onSuccess: () => {
      getStayRoomDataAction().catch((err) => console.log(err));
    },
  });

  const onSubmit: SubmitHandler<CancellationPolicyI> = (data) => {
    addCancellationPolicyAction({
      ...data,
      vendorHotelRoomId: roomId,
      fromDate: convertDateToUtc(data.startAndExpireDate.from) as Date,
      toDate: convertDateToUtc(data.startAndExpireDate.to) as Date,
    });
  };

  return (
    <>
      <form onSubmit={policyHandleSubmit(onSubmit)}>
        <div className="mt-6 flex justify-between w-full border-b border-b-gray-200 pb-5">
          <div>
            <p className="text-lg font-medium text-gray-900">Policy</p>
          </div>
          <div className="flex flex-wrap flex-row-reverse mt-4 gap-3">
            <Button color="primary" className="h-10 px-4" type="submit">
              <div className="flex flex-wrap gap-2">Save</div>
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
        <div className="border-b border-b-gray-200">
          <div className="pt-6 border-t  border-t-gray-200 flex flex-wrap gap-8">
            <p className="font-medium text-sm text-gray-700 flex w-72">
              Policy
            </p>
            <div className="flex gap-6">
              <Input
                control={policyControl}
                name="title"
                label="Title"
                placeholder="Enter Title"
                className="w-[244px] h-11"
                errorMessage={errors.title?.message}
              />
              <DatePicker
                label="Start And Expire Date"
                type="RangeDay"
                className="h-11 w-[244px]"
                name="startAndExpireDate"
                control={policyControl}
                size="sm"
                placeholder="Select date"
              />
            </div>
            <div className="w-1/3"> </div>
          </div>
          <div className=" flex flex-wrap gap-8">
            <div className="flex gap-6">
              <div className="font-medium text-sm text-gray-700 flex w-72" />
              <div className="w-[244px] h-11 ml-2">
                <p className="font-medium text-sm text-gray-700 flex w-72" />
                <Input
                  control={policyControl}
                  name="noShowTimePercent"
                  label="No Show Time Percent"
                  className="w-full h-full"
                  type="number"
                />
              </div>
              <Input
                className="w-[244px] h-11"
                label="Free Cancellation Day"
                placeholder="select"
                control={policyControl}
                name="freeCancellationDay"
                type="number"
              />
            </div>
            <div> </div>
          </div>

          <div className="py-6 mt-10 flex flex-wrap gap-8">
            <p className="font-medium text-sm text-gray-700 flex w-72">
              Cancellation Policy 1
            </p>
            <div className="flex gap-6">
              <Input
                control={policyControl}
                name="cancellationPolicy1Day"
                label="Day"
                className="w-[244px] h-11"
                type="number"
              />
              <Input
                control={policyControl}
                name="cancellationPolicy1Percent"
                label="Percent"
                className="w-[244px] h-11"
                type="number"
              />
            </div>
            <div className="w-1/3"> </div>
          </div>
          <div className="py-6 flex flex-wrap gap-8">
            <p className="font-medium text-sm text-gray-700 flex w-72">
              Cancellation Policy 2
            </p>
            <div className="flex gap-6">
              <Input
                control={policyControl}
                name="cancellationPolicy2Day"
                label="Day"
                className="w-[244px] h-11"
                type="number"
              />
              <Input
                control={policyControl}
                name="cancellationPolicy2Percent"
                label="Percent"
                className="w-[244px] h-11"
                type="number"
              />
            </div>
            <div className="w-1/3"> </div>
          </div>
        </div>
        <div className="flex flex-wrap flex-row-reverse mt-4 gap-3">
          <Button color="primary" className="h-10 px-4" type="submit">
            <div className="flex flex-wrap gap-2">Save</div>
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
      {/* <form onSubmit={generalPolicyHandleSubmit(onSubmitGeneralPolicy)}>
     <div className="mt-6 justify-between w-full
      border-b border-b-gray-200 border-t border-t-gray-200 py-5">
          <p className="text-lg font-medium text-gray-900">
            General Policy
          </p>
          <span className="text-sm font-normal text-gray-500">
          </span>
        </div>
        <div className="pt-6 border-t  border-t-gray-200 flex flex-wrap gap-8">
          <div className="font-medium text-sm text-gray-700 flex w-72" />
          <div className="">
            <Input
              control={generalPolicyControl}
              name="title"
              label="Title"
              className="w-[244px] h-11"
              placeholder="Enter Title"
            />
            <div className="mt-10">
              <p className="text-sm font-medium mb-2 text-gray-700">
                Description
              </p>
              <TextArea
                name="description"
                control={generalPolicyControl}
                cols={5}
                rows={6}
                className="w-[512px]"
                placeholder="Description"
              />
            </div>
          </div>
          <div className="w-1/3"> </div>
        </div>
        <div className="flex flex-wrap flex-row-reverse mt-4 gap-3">
          <Button color="primary" className="h-10 px-4" type="submit">
            <div className="flex flex-wrap gap-2">Save and Next</div>
          </Button>
          <Button color="ghost" className="h-10 px-4">
            <div className="flex flex-wrap gap-2">Cancel</div>
          </Button>
        </div>
      </form> */}
    </>
  );
}
