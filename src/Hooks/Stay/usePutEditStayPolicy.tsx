import { putEditStayPolicy } from 'Services/Stay';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

interface EditStayPolicyI {
  onSuccess?: () => void;
}

export default function usePutEditStayPolicy({
  onSuccess,
}: EditStayPolicyI) {
  const { mutate: EditStayPolicyAction, isLoading } = useMutation(
    putEditStayPolicy,
    {
      onSuccess: () => {
        toast.success('Policy successfully edited');
        if (onSuccess) onSuccess();
      },
    },
  );

  return { EditStayPolicyAction, isLoading };
}
