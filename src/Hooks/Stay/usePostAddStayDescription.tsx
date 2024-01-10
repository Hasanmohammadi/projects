import { postAddHotelDescription } from 'Services/Stay';
import { useMutation } from 'react-query';

interface PostAddStayDescriptionI {
  onSuccess?: () => void;
}

export default function usePostAddStayDescription({
  onSuccess,
}: PostAddStayDescriptionI) {
  const { mutate: addStayDescriptionAction, isLoading } = useMutation(
    postAddHotelDescription,
    {
      onSuccess: () => {
        if (onSuccess) onSuccess();
      },
    },
  );

  return { addStayDescriptionAction, isLoading };
}
