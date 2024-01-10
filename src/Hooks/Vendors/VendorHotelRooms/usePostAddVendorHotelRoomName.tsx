import postAddVendorHotelRoomName from 'Services/Vendors/VendorHotelRooms/postAddVendorHotelRoomName';
import { useMutation } from 'react-query';

interface PostAddVendorArgsI {
  onSuccess?: () => void;
}

export default function usePostAddVendorHotelRoomName({
  onSuccess,
}: PostAddVendorArgsI) {
  const {
    mutate: addVendorHotelRoomNameAction,
    isLoading: addVendorHotelRoomNameLoading,
  } = useMutation(postAddVendorHotelRoomName, {
    onSuccess: () => {
      if (onSuccess) onSuccess();
    },
  });

  return {
    addVendorHotelRoomNameAction,
    addVendorHotelRoomNameLoading,
  };
}
