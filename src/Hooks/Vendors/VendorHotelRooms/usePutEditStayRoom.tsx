import { putEditStayRoom } from 'Services/Vendors/VendorHotelRooms';
import { useMutation } from 'react-query';

interface PostAddVendorArgsI {
  setActiveTabIndex?: React.Dispatch<React.SetStateAction<number>>;
  onSuccess?: () => void;
}

export default function usePutEditStayRoom({
  setActiveTabIndex,
  onSuccess,
}: PostAddVendorArgsI) {
  const { mutate: EditStayRoomAction, isLoading } = useMutation(
    putEditStayRoom,
    {
      onSuccess: () => {
        if (setActiveTabIndex) setActiveTabIndex(1);
        if (onSuccess) onSuccess();
      },
    },
  );

  return { EditStayRoomAction, isLoading };
}
