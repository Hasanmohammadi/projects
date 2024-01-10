import { patchChangeRoomStatus } from 'Services/Vendors/VendorHotelRooms';
import { useMutation } from 'react-query';

interface EditVendorHotelRoomNameI {
  onSuccess?: () => void;
}

export default function usePatchChangeRoomStatus({
  onSuccess,
}: EditVendorHotelRoomNameI) {
  const { mutate: EditChangeRoomStatusAction, isLoading } = useMutation(
    patchChangeRoomStatus,
    {
      onSuccess: () => {
        if (onSuccess) onSuccess();
      },
    },
  );

  return { EditChangeRoomStatusAction, isLoading };
}
