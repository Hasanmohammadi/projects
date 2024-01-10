import postAddVendorHotelRoomDescription from 'Services/Vendors/VendorHotelRooms/postAddVendorHotelRoomDescription';
import { useMutation } from 'react-query';

interface AddRoomsDescription {
  onSuccess?: () => void;
}

export default function usePostAddVendorHotelRoomsDescription({
  onSuccess,
}: AddRoomsDescription) {
  const {
    mutate: addVendorHotelRoomDescriptionAction,
    isLoading: addVendorHotelRoomDescriptionLoading,
  } = useMutation(postAddVendorHotelRoomDescription, {
    onSuccess: () => {
      if (onSuccess) onSuccess();
    },
  });

  return {
    addVendorHotelRoomDescriptionAction,
    addVendorHotelRoomDescriptionLoading,
  };
}
