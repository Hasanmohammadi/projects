import { postBookByAdmin } from 'Services/Book';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

interface PostAddVendorArgsI {
  onSuccess?: () => void;
}

export default function usePostBookByAdmin({
  onSuccess,
}: PostAddVendorArgsI) {
  const { mutate: bookByAdminAction, isLoading } = useMutation(
    postBookByAdmin,
    {
      onSuccess: ({ message }) => {
        toast.success(message);
        if (onSuccess) onSuccess();
      },
    },
  );

  return { bookByAdminAction, isLoading };
}
