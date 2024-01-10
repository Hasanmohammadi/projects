import { EditVendorLoading, Tabs } from 'Common';
import { useAppContext } from 'Context';
import { convertApiRoomData } from 'Helpers/room';
import { useGetVendorHotelRoom } from 'Hooks/Vendors/VendorHotelRooms';
import { VendorHotelRoomResultI } from 'Types/Vendors';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Descriptions from './Descriptions';
import Facilities from './Facilities';
import RoomInformation from './RoomInformation';

function AddRoom() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [maxTabIndex, setMaxTabIndex] = useState(0);
  const { vendorIdSelected, roomId, setRoomId } = useAppContext();
  const [finalData, setFinalData] =
    useState<VendorHotelRoomResultI | null>();
  const navigate = useNavigate();

  const { vendorHotelRoomData, isLoading } = useGetVendorHotelRoom({
    roomId,
  });

  useEffect(() => {
    if (!isLoading) {
      setFinalData(vendorHotelRoomData);
    }
  }, [isLoading]);

  useEffect(() => {
    if (vendorIdSelected.length < 23) {
      navigate('/rooms');
    }

    return () => {
      setRoomId('');
    };
  }, []);

  useEffect(() => {
    if (maxTabIndex < activeTabIndex) {
      setMaxTabIndex(activeTabIndex);
    }
  }, [activeTabIndex]);

  return (
    <div>
      {finalData === undefined ? (
        <EditVendorLoading />
      ) : (
        <>
          <h1 className="text-gray-900 font-medium text-3xl">Room</h1>
          <Tabs
            activeTab={activeTabIndex}
            setActiveTabIndex={setActiveTabIndex}
            className="mt-6"
            tabs={[
              {
                children: (
                  <RoomInformation
                    isEdit={!!roomId}
                    // getStayRoomDataAction={getStayRoomDataAction}
                    setActiveTabIndex={setActiveTabIndex}
                    defaultValues={
                      convertApiRoomData(
                        vendorHotelRoomData as VendorHotelRoomResultI,
                      ).roomInfo
                    }
                  />
                ),
                name: 'Room information',
              },

              {
                children: (
                  <Facilities
                    setActiveTabIndex={setActiveTabIndex}
                    defaultValue={
                      convertApiRoomData(
                        vendorHotelRoomData as VendorHotelRoomResultI,
                      ).vendorHotelRoomFacility
                    }
                  />
                ),
                name: 'Facilities',
                disabled: roomId ? false : maxTabIndex < 2,
              },
              {
                children: (
                  <Descriptions setActiveTabIndex={setActiveTabIndex} />
                ),
                name: 'Descriptions',
                disabled: roomId ? false : maxTabIndex < 3,
              },
            ]}
          />
        </>
      )}
    </div>
  );
}

export default AddRoom;
