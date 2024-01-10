import { putEditVendorHotelRoomName } from 'Services/Vendors/VendorHotelRooms';
import { useMutation } from 'react-query';

interface EditVendorHotelRoomNameI {
  onSuccess?: () => void;
}
export default function usePutEditVendorHotelRoomName({
  onSuccess,
}: EditVendorHotelRoomNameI) {
  const { mutate: EditVendorHotelRoomNameAction, isLoading } = useMutation(
    putEditVendorHotelRoomName,
    {
      onSuccess: () => {
        if (onSuccess) onSuccess();
      },
    },
  );

  return { EditVendorHotelRoomNameAction, isLoading };
}
