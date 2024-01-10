import { putEditHotelDetail } from 'Services/Stay';
import { useMutation } from 'react-query';

interface PostAddStayDetailArgsI {
  setActiveTabIndex: React.Dispatch<React.SetStateAction<number>>;
  onSuccess?: () => void;
}

export default function usePutEditHotelDetail({
  setActiveTabIndex,
  onSuccess,
}: PostAddStayDetailArgsI) {
  const { mutate: editHotelDetailAction, isLoading } = useMutation(
    putEditHotelDetail,
    {
      onSuccess: () => {
        if (setActiveTabIndex) setActiveTabIndex((pre) => pre + 1);
        if (onSuccess) onSuccess();
      },
    },
  );

  return { editHotelDetailAction, isLoading };
}
