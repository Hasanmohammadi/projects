import { postResetPassword } from 'Services/Auth';
import { useMutation } from 'react-query';

interface UsePostResetPasswordArgsI {
  setPage: React.Dispatch<React.SetStateAction<'forgotPass' | 'success'>>;
}

export default function usePostResetPassword({
  setPage,
}: UsePostResetPasswordArgsI) {
  const { mutate: resetPasswordAction, isLoading } = useMutation(
    postResetPassword,
    {
      onSuccess: () => {
        setPage('success');
      },
    },
  );

  return { resetPasswordAction, isLoading };
}
