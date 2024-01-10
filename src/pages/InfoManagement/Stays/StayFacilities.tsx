import { Button, Checkbox, Search } from 'Common';
import { useAppContext } from 'Context';
import {
  useGetHotelPropertyList,
  useGetStayInformation,
} from 'Hooks/Stay';
import usePostAddHotelProperty from 'Hooks/Stay/usePostAddHotelProperty';
import { StayProperties } from 'Types/Stay/stay';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Params } from 'react-router-dom';

interface FacilitiesPropsI {
  setActiveTabIndex: React.Dispatch<React.SetStateAction<number>>;
  stayName: string | Readonly<Params<string>>;
  defaultValue?: StayProperties[];
}

export default function StayFacilities({
  setActiveTabIndex,
  stayName,
  defaultValue = [],
}: FacilitiesPropsI) {
  const { hotelId, vendorIdSelected } = useAppContext();
  const [propertyIds, setPropertyIds] = useState<string[]>(
    defaultValue.map(({ propertyId }) => propertyId),
  );
  const [stayPropertyList, setStayPropertyList] = useState<
    StayProperties[]
  >([]);

  const { getStayInformationAction } = useGetStayInformation({
    hotelId,
    VendorId: vendorIdSelected,
  });

  const { stayPropertyListData, isLoading } = useGetHotelPropertyList({});

  const removeId = (id: string) => {
    const x = [...propertyIds];
    const y = x.filter((propertyId) => propertyId !== id);
    setPropertyIds(y);
  };

  const { control, watch } = useForm({
    defaultValues: { search: '' },
  });

  const { search } = watch();

  const { addHotelPropertyAction } = usePostAddHotelProperty({
    setActiveTabIndex,
    onSuccess: () => {
      getStayInformationAction().catch((err) => console.log(err));
    },
  });

  useEffect(() => {
    setStayPropertyList(stayPropertyListData as StayProperties[]);
  }, [stayPropertyListData]);

  useEffect(() => {
    if (stayPropertyListData && stayPropertyListData[0]) {
      const x = [...stayPropertyListData];
      const y = x.filter(({ name }) =>
        name.toLocaleUpperCase().includes(search.toLocaleUpperCase()),
      );
      setStayPropertyList(y);
    }
  }, [search]);

  const onSubmit = () => {
    addHotelPropertyAction({ hotelId, hotelPropertyIds: propertyIds });
  };

  return (
    <div className="pb-7">
      <div className="flex justify-between w-full border-b border-b-gray-200 py-6">
        <div className="self-center">
          <p className="text-lg font-medium text-gray-900">
            {stayName as string} Facilities
          </p>
        </div>
        <div className="flex flex-wrap flex-row-reverse gap-3">
          <Button
            color="primary"
            className="h-10 px-4"
            type="submit"
            onClick={onSubmit}
            disabled={!propertyIds.length}
          >
            <div className="flex flex-wrap gap-2">Save and Next</div>
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

      <Search control={control} name="search" className="w-80 mt-6" />

      <div className="p-6 bg-white mt-6 border border-gray-200 rounded-lg shadow-sm">
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {stayPropertyList?.map(({ name, propertyId }) => (
              <Checkbox
                key={propertyId}
                label={name}
                onChecked={() => {
                  setPropertyIds((pre) => [...pre, propertyId]);
                }}
                onUnChecked={() => removeId(propertyId)}
                checked={propertyIds.includes(propertyId)}
              />
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-wrap flex-row-reverse mt-6 pt-4 gap-3 border-t border-t-gray-200  ">
        <Button
          color="primary"
          className="h-10 px-4"
          type="submit"
          onClick={() => onSubmit()}
          disabled={!propertyIds.length}
        >
          <div className="flex flex-wrap gap-2">Save and Next</div>
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
  );
}
