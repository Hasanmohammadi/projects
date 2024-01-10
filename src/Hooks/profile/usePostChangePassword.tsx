import { postChangePassword } from "@/services/profile";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface UsePostChangePasswordI {
  onSuccess?: () => void;
}

export default function usePostChangePassword({
  onSuccess,
}: UsePostChangePasswordI) {
  const { mutate, isPending } = useMutation({
    mutationFn: postChangePassword,
    onSuccess: () => {
      toast.success("Your successfully has changed");
      if (onSuccess) onSuccess();
    },
    onError(err) {
      const error = err as AxiosError;
      toast.error(error.message);
    },
  });

  return {
    postChangePasswordAction: mutate,
    postChangePasswordLoading: isPending,
  };
}
