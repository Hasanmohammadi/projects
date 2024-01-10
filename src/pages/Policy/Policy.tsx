import { Tabs } from 'Common';
import { useAppContext } from 'Context';
import { convertApiRoomData } from 'Helpers/room';
import { convertApiStayData } from 'Helpers/stay';
import { useGetStayInformation } from 'Hooks/Stay';
import { useGetVendorHotelRoom } from 'Hooks/Vendors/VendorHotelRooms';
import { StayInformationResultI } from 'Types/Stay';
import { VendorHotelRoomResultI } from 'Types/Vendors';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import RoomPolicy from './RoomPolicy';
import StayPolicy from './StayPolicy';

export default function Policy() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const { roomId, hotelId, setHotelId, vendorIdSelected } =
    useAppContext();

  const { vendorHotelRoomData, isLoading, getStayRoomDataAction } =
    useGetVendorHotelRoom({
      roomId,
    });

  const { stayInformationData, isLoading: stayLoading } =
    useGetStayInformation({
      hotelId,
      VendorId: vendorIdSelected,
    });

  useEffect(() => {
    if (vendorIdSelected?.length < 23 && !toast.isActive('chooseVendor')) {
      toast.warning('Please choose your vendor', {
        position: 'top-center',
        style: {
          width: 'max-content',
        },
        toastId: 'chooseVendor',
      });
    }
  }, [vendorIdSelected?.length]);

  useEffect(() => () => setHotelId(''), [setHotelId]);

  return (
    <>
      <h1 className="text-gray-900 font-medium text-3xl">Policy</h1>
      <Tabs
        activeTab={activeTabIndex}
        setActiveTabIndex={setActiveTabIndex}
        className="mt-6"
        tabs={[
          {
            name: 'Stay policy',
            children: (
              <>
                <StayPolicy
                  defaultValue={
                    convertApiStayData(
                      stayInformationData as StayInformationResultI,
                    ).policy
                  }
                  loading={stayLoading}
                  editMode={!!stayInformationData?.policy}
                />
              </>
            ),
          },
          {
            name: 'Room policy',
            children: (
              <>
                <RoomPolicy
                  defaultValues={
                    convertApiRoomData(
                      vendorHotelRoomData as VendorHotelRoomResultI,
                    ).roomPolicy
                  }
                  loading={isLoading}
                  getStayRoomDataAction={getStayRoomDataAction}
                />
              </>
            ),
          },
        ]}
      />
    </>
  );
}
