import { postAddVendorStays } from 'Services/Stay';
import { useMutation } from 'react-query';

interface PostAddVendorStaysArgsI {
  setActiveTabIndex?: React.Dispatch<React.SetStateAction<number>>;
  onSuccess?: () => void;
}

export default function usePostAddVendorStays({
  setActiveTabIndex,
  onSuccess,
}: PostAddVendorStaysArgsI) {
  const { mutate: addVendorStaysAction, isLoading } = useMutation(
    postAddVendorStays,
    {
      onSuccess: () => {
        if (setActiveTabIndex) setActiveTabIndex((pre) => pre + 1);
        if (onSuccess) onSuccess();
      },
    },
  );

  return { addVendorStaysAction, isLoading };
}
