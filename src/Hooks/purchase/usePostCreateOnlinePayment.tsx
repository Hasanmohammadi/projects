import { postCreateOnlinePayment } from "@/services/purchase";
import { CreateOnlinePaymentResultI } from "@/types/payment";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface UsePostCreateOnlinePaymentI {
  onSuccess?: (data: CreateOnlinePaymentResultI) => void;
}

export default function usePostCreateOnlinePayment({
  onSuccess,
}: UsePostCreateOnlinePaymentI) {
  const { mutate, isPending, data } = useMutation({
    mutationFn: postCreateOnlinePayment,
    onSuccess: (data) => {
      if (onSuccess) onSuccess(data);
    },
    onError(err) {
      const error = err as AxiosError;
      toast.error(error.message);
    },
  });

  return {
    postCreateOnlinePaymentAction: mutate,
    postCreateOnlinePaymentLoading: isPending,
    postCreateOnlinePaymentData: data,
  };
}
