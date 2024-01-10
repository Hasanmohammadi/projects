import { postAddHotelDetail } from 'Services/Stay';
import { useMutation } from 'react-query';

interface PostAddStayDetailArgsI {
  setActiveTabIndex: React.Dispatch<React.SetStateAction<number>>;
  onSuccess?: () => void;
}

export default function usePostAddHotelDetail({
  setActiveTabIndex,
  onSuccess,
}: PostAddStayDetailArgsI) {
  const { mutate: addHotelDetailAction, isLoading } = useMutation(
    postAddHotelDetail,
    {
      onSuccess: () => {
        if (setActiveTabIndex) setActiveTabIndex((pre) => pre + 1);
        if (onSuccess) onSuccess();
      },
    },
  );

  return { addHotelDetailAction, isLoading };
}
