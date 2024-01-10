import { patchChangeStayStatus } from 'Services/Stay';
import { useMutation } from 'react-query';

interface PostAddBaseHotelI {
  onSuccess?: () => void;
}

export default function usePatchChangeStayStatus({
  onSuccess,
}: PostAddBaseHotelI) {
  const { mutate: changeStayStatusAction, isLoading } = useMutation(
    patchChangeStayStatus,
    {
      onSuccess: () => {
        if (onSuccess) onSuccess();
      },
    },
  );

  return { changeStayStatusAction, changeStatusLoading: isLoading };
}
