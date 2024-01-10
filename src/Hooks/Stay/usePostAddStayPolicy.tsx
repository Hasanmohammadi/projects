import { postAddStayPolicy } from 'Services/Stay';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

interface PostAddStayPolicyI {
  setActiveTabIndex?: React.Dispatch<React.SetStateAction<number>>;
  onSuccess?: () => void;
}

export default function usePostAddStayPolicy({
  setActiveTabIndex,
  onSuccess,
}: PostAddStayPolicyI) {
  const { mutate: addHotelPolicyAction, isLoading } = useMutation(
    postAddStayPolicy,
    {
      onSuccess: () => {
        toast.success('Policy successfully added');
        if (setActiveTabIndex) setActiveTabIndex((pre) => pre + 1);
        if (onSuccess) onSuccess();
      },
    },
  );

  return { addHotelPolicyAction, isLoading };
}
