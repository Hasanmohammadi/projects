import { useAppContext } from 'Context';
import { postAddVendorHotelRoom } from 'Services/Vendors/VendorHotelRooms';
import { useMutation } from 'react-query';

interface PostAddVendorArgsI {
  setActiveTabIndex?: React.Dispatch<React.SetStateAction<number>>;
  onSuccess?: () => void;
}

export default function usePostAddVendorHotelRoom({
  setActiveTabIndex,
  onSuccess,
}: PostAddVendorArgsI) {
  const { setRoomId } = useAppContext();
  const { mutate: addVendorHotelRoom, isLoading } = useMutation(
    postAddVendorHotelRoom,
    {
      onSuccess: (data) => {
        if (setActiveTabIndex) setActiveTabIndex(1);
        setRoomId(data.result.roomId);
        if (onSuccess) onSuccess();
      },
    },
  );

  return { addVendorHotelRoom, isLoading };
}
