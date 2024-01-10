import { postAddVendorHotelRoomFacility } from 'Services/Vendors/VendorHotelRooms';
import { useMutation } from 'react-query';

interface PostAddVendorArgsI {
  setActiveTabIndex?: React.Dispatch<React.SetStateAction<number>>;
}

export default function usePostAddVendorHotelRoomFacility({
  setActiveTabIndex,
}: PostAddVendorArgsI) {
  const {
    mutate: addVendorHotelRoomFacilityAction,
    isLoading: addVendorHotelRoomFacilityLoading,
  } = useMutation(postAddVendorHotelRoomFacility, {
    onSuccess: () => {
      if (setActiveTabIndex) setActiveTabIndex((pre) => pre + 1);
    },
  });

  return {
    addVendorHotelRoomFacilityAction,
    addVendorHotelRoomFacilityLoading,
  };
}
