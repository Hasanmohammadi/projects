import { postAddStayName } from 'Services/Stay';
import { useMutation } from 'react-query';

interface PostAddStayNameI {
  onSuccess?: () => void;
}

export default function usePostAddStayName({
  onSuccess,
}: PostAddStayNameI) {
  const { mutate: addStayNameAction, isLoading } = useMutation(
    postAddStayName,
    {
      onSuccess: () => {
        if (onSuccess) onSuccess();
      },
    },
  );

  return { addStayNameAction, isLoading };
}
