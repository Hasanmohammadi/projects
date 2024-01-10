import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { postRegister } from "@/services/auth";
import { useMutation } from "@tanstack/react-query";

export default function usePostRegister({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const { mutate, isPending, data } = useMutation({
    mutationFn: postRegister,
    onSuccess: () => {
      if (onSuccess) onSuccess();
      toast.success("User create successfully");
    },
    onError(err: AxiosError<unknown, any>) {
      const error = err;
      toast.error(error.message);
    },
  });

  return {
    postRegisterAction: mutate,
    postRegisterLoading: isPending,
    paymentData: data,
  };
}
