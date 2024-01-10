import { Button, Checkbox } from 'Common';
import { useAppContext } from 'Context';
import useGetRoomPropertiesList from 'Hooks/Vendors/VendorHotelRooms/useGetRoomPropertiesList';
import usePostAddVendorHotelRoomFacility from 'Hooks/Vendors/VendorHotelRooms/usePostAddVendorHotelRoomFacility';
import { VendorHotelRoomFacilityI } from 'Types/Vendors/vendors';
import { useState } from 'react';

interface FacilitiesPropsI {
  setActiveTabIndex: React.Dispatch<React.SetStateAction<number>>;
  defaultValue?: VendorHotelRoomFacilityI[];
}

export default function Facilities({
  setActiveTabIndex,
  defaultValue = [],
}: FacilitiesPropsI) {
  const { roomId } = useAppContext();

  const { isLoading, roomPropertiesListData } = useGetRoomPropertiesList();
  const { addVendorHotelRoomFacilityAction } =
    usePostAddVendorHotelRoomFacility({ setActiveTabIndex });

  const [propertyIds, setPropertyIds] = useState<string[]>(
    defaultValue.map(({ roomPropertyId }) => roomPropertyId),
  );

  const removeId = (id: string) => {
    const x = [...propertyIds];
    const y = x.filter((propertyId) => propertyId !== id);
    setPropertyIds(y);
  };

  const submit =
    ({
      propertiesIds,
      vendorHotelRoomId,
    }: {
      propertiesIds: string[];
      vendorHotelRoomId: string;
    }) =>
    () => {
      addVendorHotelRoomFacilityAction({
        propertyIds: propertiesIds,
        vendorHotelRoomId,
      });
    };

  return (
    <div>
      <div className="mt-6 flex justify-between w-full border-b border-b-gray-200 pb-5">
        <div>
          <p className="text-lg font-medium text-gray-900">
            Room Facilities
          </p>
        </div>
        <div className="flex flex-wrap flex-row-reverse mt-4 gap-3">
          <Button
            color="primary"
            className="h-10 px-4"
            type="submit"
            onClick={submit({
              propertiesIds: propertyIds,
              vendorHotelRoomId: roomId,
            })}
            disabled={!propertyIds.length}
          >
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

      <div className="p-6 bg-white mt-6 border border-gray-200 rounded-lg shadow-sm">
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {roomPropertiesListData?.map(({ name, id }) => (
              <Checkbox
                key={id}
                label={name}
                onChecked={() => setPropertyIds((pre) => [...pre, id])}
                onUnChecked={() => removeId(id)}
                checked={propertyIds.includes(id)}
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
          onClick={submit({
            propertiesIds: propertyIds,
            vendorHotelRoomId: roomId,
          })}
          disabled={!propertyIds.length}
        >
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
  );
}
