import { putEditStayDescription } from 'Services/Stay';
import { useMutation } from 'react-query';

interface EditStayDescriptionI {
  onSuccess?: () => void;
}
export default function usePutEditStayDescription({
  onSuccess,
}: EditStayDescriptionI) {
  const { mutate: EditStayDescriptionAction, isLoading } = useMutation(
    putEditStayDescription,
    {
      onSuccess: () => {
        if (onSuccess) onSuccess();
      },
    },
  );

  return { EditStayDescriptionAction, isLoading };
}
