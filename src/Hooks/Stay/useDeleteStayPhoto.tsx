import { deleteStayPhoto } from 'Services/Stay';
import { useMutation } from 'react-query';

interface DeleteStayPhotoPropsI {
  onSuccess?: () => void;
}

export default function useDeleteStayPhoto({
  onSuccess,
}: DeleteStayPhotoPropsI) {
  const { mutate: deleteStayPhotoAction, isLoading } = useMutation(
    deleteStayPhoto,
    {
      onSuccess: () => {
        if (onSuccess) onSuccess();
      },
    },
  );

  return { deleteStayPhotoAction, deletePhotoLoading: isLoading };
}
