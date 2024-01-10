import { postAddCancellationPolicy } from 'Services/Vendors/VendorHotelRooms';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

interface PostCancellationPolicyArgsI {
  setActiveTabIndex?: React.Dispatch<React.SetStateAction<number>>;
  onSuccess?: () => void;
}

export default function usePostAddCancellationPolicy({
  setActiveTabIndex,
  onSuccess,
}: PostCancellationPolicyArgsI) {
  const { mutate: addCancellationPolicyAction } = useMutation(
    postAddCancellationPolicy,
    {
      onSuccess: () => {
        toast.success('Policy successfully added');
        if (setActiveTabIndex) setActiveTabIndex((pre) => pre + 1);
        if (onSuccess) onSuccess();
      },
    },
  );

  return {
    addCancellationPolicyAction,
  };
}
