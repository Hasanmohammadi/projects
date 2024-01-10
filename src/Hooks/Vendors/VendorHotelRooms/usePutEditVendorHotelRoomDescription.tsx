import { putEditVendorHotelRoomDescription } from 'Services/Vendors/VendorHotelRooms';
import { useMutation } from 'react-query';

interface EditVendorHotelRoomDescriptionI {
  onSuccess?: () => void;
}
export default function usePutEditVendorHotelRoomDescription({
  onSuccess,
}: EditVendorHotelRoomDescriptionI) {
  const { mutate: EditVendorHotelRoomDescriptionAction, isLoading } =
    useMutation(putEditVendorHotelRoomDescription, {
      onSuccess: () => {
        if (onSuccess) onSuccess();
      },
    });

  return { EditVendorHotelRoomDescriptionAction, isLoading };
}
