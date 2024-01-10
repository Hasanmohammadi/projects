import { postAddHotelRoomAvailability } from 'Services/Vendors/VendorHotelRooms';
import { useMutation } from 'react-query';

export default function usePostAddHotelRoomAvailability({
  onSuccessResponse,
}: {
  onSuccessResponse?: () => void;
}) {
  const { mutate: postAddHotelRoomAvailabilityAction, isLoading } =
    useMutation(postAddHotelRoomAvailability, {
      onSuccess: () => {
        if (onSuccessResponse) onSuccessResponse();
      },
    });

  return {
    postAddHotelRoomAvailabilityAction,
    isLoading,
  };
}
