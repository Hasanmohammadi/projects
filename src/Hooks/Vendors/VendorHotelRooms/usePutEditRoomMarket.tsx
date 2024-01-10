import { putEditRoomMarket } from 'Services/Vendors/VendorHotelRooms';
import { useMutation } from 'react-query';

interface EditVendorHotelRoomNameI {
  onSuccess?: () => void;
}
export default function usePutEditRoomMarket({
  onSuccess,
}: EditVendorHotelRoomNameI) {
  const { mutate: EditVendorHotelRoomMarketAction, isLoading } =
    useMutation(putEditRoomMarket, {
      onSuccess: () => {
        if (onSuccess) onSuccess();
      },
    });

  return { EditVendorHotelRoomMarketAction, isLoading };
}
