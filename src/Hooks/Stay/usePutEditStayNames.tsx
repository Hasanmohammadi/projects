import { putEditStayNames } from 'Services/Stay';
import { useMutation } from 'react-query';

interface EditStayNamesI {
  onSuccess?: () => void;
}
export default function usePutEditStayNames({
  onSuccess,
}: EditStayNamesI) {
  const { mutate: EditStayNamesAction, isLoading } = useMutation(
    putEditStayNames,
    {
      onSuccess: () => {
        if (onSuccess) onSuccess();
      },
    },
  );

  return { EditStayNamesAction, isLoading };
}
