import { deleteStay } from 'Services/Stay';
import { useMutation } from 'react-query';

interface DeleteStayPropsI {
  onSuccess?: () => void;
}

export default function useDeleteStay({ onSuccess }: DeleteStayPropsI) {
  const { mutate: deleteStayAction, isLoading } = useMutation(deleteStay, {
    onSuccess: () => {
      if (onSuccess) onSuccess();
    },
  });

  return { deleteStayAction, deleteStayLoading: isLoading };
}
