import { postAddHotelProperty } from 'Services/Stay';
import { useMutation } from 'react-query';

interface PostAddHotelPropertyI {
  setActiveTabIndex: React.Dispatch<React.SetStateAction<number>>;
  onSuccess?: () => void;
}

export default function usePostAddHotelProperty({
  setActiveTabIndex,
  onSuccess,
}: PostAddHotelPropertyI) {
  const { mutate: addHotelPropertyAction, isLoading } = useMutation(
    postAddHotelProperty,
    {
      onSuccess: () => {
        if (setActiveTabIndex) setActiveTabIndex((pre) => pre + 1);
        if (onSuccess) onSuccess();
      },
    },
  );

  return { addHotelPropertyAction, isLoading };
}
