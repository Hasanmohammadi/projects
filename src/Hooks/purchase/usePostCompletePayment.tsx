import { postCompletePayment } from "@/services/purchase";
import { CompletePaymentResultI } from "@/types/payment";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

interface usePostCompletePaymentI {
  onSuccess?: (data: CompletePaymentResultI) => void;
}

export default function usePostCompletePayment({
  onSuccess,
}: usePostCompletePaymentI) {
  const { mutate, isPending, data } = useMutation({
    mutationFn: postCompletePayment,
    onSuccess: (data) => {
      if (onSuccess) onSuccess(data);
    },
    onError(err) {
      const error = err as AxiosError;
      toast.error(error.message);
    },
  });

  return {
    postCompletePaymentAction: mutate,
    postCompletePaymentLoading: isPending,
    postCompletePaymentData: data,
  };
}
