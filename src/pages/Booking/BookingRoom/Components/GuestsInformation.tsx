/* eslint-disable react/jsx-props-no-spreading */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Button, Input } from 'Common';
import { useAppContext } from 'Context';
import { convertDateToUtc } from 'Helpers';
import { usePostBookByAdmin } from 'Hooks/Book';
import clsx from 'clsx';
import { useEffect } from 'react';
import { UseFormSetValue, useFieldArray, useForm } from 'react-hook-form';

import { BookingRoomsFormI } from '../BookingRoom';
import { CustomerInformationI } from './CustomerInformation';

interface GuestsInformationPropsI {
  adultCount: number;
  childCount: number;
  setActiveTabIndex: React.Dispatch<React.SetStateAction<number>>;
  customerInformation: CustomerInformationI;
  startAndEndDate: {
    from: {
      day: number;
      year: number;
      month: number;
    };
    to: {
      day: number;
      year: number;
      month: number;
    };
  };
  setValue: UseFormSetValue<BookingRoomsFormI>;
}

interface AdultInformationI {
  firstName: string;
  lastName: string;
}

interface ChildInformationI {
  age: string;
}

interface GuestsInfo {
  adults: AdultInformationI[];
  children: ChildInformationI[];
}

export default function GuestsInformation({
  adultCount,
  childCount,
  customerInformation,
  startAndEndDate,
  setValue,
}: GuestsInformationPropsI) {
  const { roomId } = useAppContext();
  const { email, firstName, lastName, phoneNumber } = customerInformation;
  const { control, handleSubmit, register } = useForm<GuestsInfo>({
    defaultValues: {
      adults: [{ firstName: '', lastName: '' }],
    },
  });

  const { fields: adultsFields, append: adultAppend } =
    useFieldArray<GuestsInfo>({
      name: 'adults',
      control,
    });

  const { fields: childFields, append: childAppend } =
    useFieldArray<GuestsInfo>({
      name: 'children',
      control,
    });

  const { bookByAdminAction } = usePostBookByAdmin({
    onSuccess: () => setValue('hotelId', { id: '', label: '' }),
  });

  const onSubmit = (data: GuestsInfo) => {
    bookByAdminAction({
      firstName,
      email,
      lastName,
      phone: phoneNumber,
      adultCount,
      extraCount: childCount,
      extraAges: data.children.map(({ age }) => +age),
      guests: data.adults,
      checkIn: convertDateToUtc(startAndEndDate?.from) as Date,
      checkOut: convertDateToUtc(startAndEndDate?.to) as Date,
      roomId,
    });
  };

  useEffect(() => {
    [...Array(adultCount - 1)].map(() =>
      adultAppend({ firstName: '', lastName: '' }),
    );
  }, [adultCount]);

  useEffect(() => {
    [...Array(childCount)].map(() => childAppend({ age: '' }));
  }, [childCount]);

  return (
    <form className="w-full flex" onSubmit={handleSubmit(onSubmit)}>
      <div className="m-auto">
        {adultsFields.map(({ id }, index) => (
          <>
            <div
              key={id}
              className={clsx({
                'mt-11': index,
                'mt-5': !index,
              })}
            >
              <p className="font-semibold text-sm py-3">
                Adult {index + 1}
              </p>
              <div>
                <div className="flex flex-wrap gap-6">
                  <Input
                    className="w-[244px] h-11"
                    label="First Name"
                    {...register(`adults.${index}.firstName` as const)}
                    placeholder="Enter Name"
                    control={control}
                  />
                  <Input
                    className="w-[244px] h-11"
                    label="Last Name"
                    {...register(`adults.${index}.lastName` as const)}
                    placeholder="Enter Last Name"
                    control={control}
                  />
                </div>
              </div>
            </div>
          </>
        ))}
        <div className="grid grid-cols-2 gap-x-6">
          {childFields.map(({ id }, index) => (
            <div className="mt-11 w-full" key={id}>
              <p className="font-semibold text-sm py-3">
                child {index + 1}
              </p>
              <div>
                <div className="flex flex-wrap gap-6">
                  <Input
                    className="w-[244px] h-11"
                    label="Age"
                    {...register(`children.${index}.age` as const)}
                    placeholder="Enter Age"
                    control={control}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <br />
        <div className="flex flex-wrap flex-row-reverse gap-3 mt-10">
          <Button color="primary" className="h-10 px-4" type="submit">
            Done
          </Button>
        </div>
      </div>
    </form>
  );
}
