import { postCopyPrice } from 'Services/Vendors';
import { useMutation } from 'react-query';

interface PostAddVendorArgsI {
  onSuccess?: () => void;
}

export default function usePostCopyPrice({
  onSuccess,
}: PostAddVendorArgsI) {
  const { mutate: copyPriceAction, isLoading } = useMutation(
    postCopyPrice,
    {
      onSuccess: () => {
        if (onSuccess) onSuccess();
      },
    },
  );

  return { copyPriceAction, isLoading };
}
