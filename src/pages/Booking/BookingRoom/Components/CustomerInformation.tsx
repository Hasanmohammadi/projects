/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Button, Input } from 'Common';
import { Mail, Minus, Phone, Plus } from 'react-feather';
import { useForm } from 'react-hook-form';

interface CustomerInformationPropsI {
  adultCount: number;
  setAdultCount: React.Dispatch<React.SetStateAction<number>>;
  childCount: number;
  setChildCount: React.Dispatch<React.SetStateAction<number>>;
  setActiveTabIndex: React.Dispatch<React.SetStateAction<number>>;
  setCustomerInformation: React.Dispatch<
    React.SetStateAction<CustomerInformationI | undefined>
  >;
  roomCapacity: {
    extraCapacity: number;
    standardCapacity: number;
  };
}

export interface CustomerInformationI {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
}

export default function CustomerInformation({
  adultCount,
  childCount,
  roomCapacity,
  setAdultCount,
  setChildCount,
  setActiveTabIndex,
  setCustomerInformation,
}: CustomerInformationPropsI) {
  const { control, handleSubmit } = useForm<CustomerInformationI>({
    defaultValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
    },
  });

  const onNext = (data: CustomerInformationI) => {
    setCustomerInformation(data);
    setActiveTabIndex((pre) => pre + 1);
  };

  return (
    <form onSubmit={handleSubmit(onNext)}>
      <div className="py-6 rounded-lg">
        <div className="py-6 mt-5 flex flex-wrap gap-8">
          <p className="font-medium text-lg text-gray-700 flex w-72"> </p>
          <div className="flex flex-wrap gap-6">
            <Input
              className="w-[244px] h-11"
              label="First Name"
              name="firstName"
              placeholder="Enter Name"
              control={control}
            />
            <Input
              className="w-[244px] h-11"
              label="Last Name"
              name="lastName"
              placeholder="Enter Last Name"
              control={control}
            />
          </div>
          <div> </div>
        </div>
        <div className="py-6 flex flex-wrap gap-8">
          <p className="font-medium text-lg text-gray-700 flex w-72"> </p>
          <div className="flex flex-wrap gap-6">
            <Input
              className="w-[244px] h-11"
              label="Email"
              name="email"
              placeholder="olivia@untitledui.com"
              control={control}
              icon={<Mail size={20} color="#667085" />}
            />
            <Input
              className="w-[244px] h-11"
              label="Phone number"
              name="phoneNumber"
              placeholder="+1 (555) 000-0000"
              control={control}
              icon={<Phone size={20} color="#667085" />}
            />
          </div>
          <div> </div>
        </div>
        <div className="py-6 flex flex-wrap gap-8">
          <p className="font-medium text-lg text-gray-700 flex w-72"> </p>
          <div className="flex justify-between gap-6">
            <div className="flex justify-between mt-2 w-[244px]">
              <p className="text-sm font-medium mb-2 text-gray-700 self-center">
                Adult
              </p>
              <div className="flex flex-wrap gap-6 place-content-center">
                <div className="flex border border-gray-300 justify-between w-32 text-center items-center rounded-md h-10">
                  <div
                    role="presentation"
                    onClick={() => {
                      if (adultCount) {
                        setAdultCount((pre) => pre - 1);
                      }
                    }}
                    className="w-1/3 text-sm font-semibold flex justify-center mt-0.5 cursor-pointer"
                  >
                    <Minus size={20} />
                  </div>
                  <div className="w-1/3 border-l border-r border-gray-300 h-full items-center pt-2">
                    {adultCount}
                  </div>
                  <div
                    role="presentation"
                    onClick={() => {
                      if (
                        adultCount + childCount <
                        roomCapacity.standardCapacity +
                          roomCapacity.extraCapacity
                      ) {
                        setAdultCount((pre) => pre + 1);
                      }
                    }}
                    className="w-1/3 text-sm font-semibold flex justify-center mt-[1px] cursor-pointer"
                  >
                    <Plus size={20} />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-2 w-[244px]">
              <p className="text-sm font-medium mb-2 text-gray-700 self-center">
                Child
              </p>
              <div className="flex flex-wrap gap-6 place-content-center">
                <div className="flex border border-gray-300 justify-between w-32 text-center items-center rounded-md h-10">
                  <div
                    role="presentation"
                    onClick={() => {
                      if (childCount) {
                        setChildCount((pre) => pre - 1);
                      }
                    }}
                    className="w-1/3 text-sm font-semibold flex justify-center mt-0.5 cursor-pointer"
                  >
                    <Minus size={20} />
                  </div>
                  <div className="w-1/3 border-l border-r border-gray-300 h-full items-center pt-2">
                    {childCount}
                  </div>
                  <div
                    role="presentation"
                    onClick={() => {
                      if (
                        childCount + adultCount <
                        roomCapacity.extraCapacity +
                          roomCapacity.standardCapacity
                      ) {
                        setChildCount((pre) => pre + 1);
                      }
                    }}
                    className="w-1/3 text-sm font-semibold flex justify-center mt-[1px] cursor-pointer"
                  >
                    <Plus size={20} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div> </div>
        </div>
      </div>
      <div className="flex flex-wrap flex-row-reverse gap-3">
        <Button
          color="primary"
          className="h-10 px-4"
          type="submit"
          disabled={!adultCount}
        >
          <div className="flex flex-wrap gap-2">Next</div>
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
