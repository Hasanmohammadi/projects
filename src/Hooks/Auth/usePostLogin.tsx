import { postLogin } from "@/services/auth";
import { LoginResultI } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export default function usePostLogin({
  onSuccess,
}: {
  onSuccess?: (loginResult: LoginResultI) => void;
}) {
  const { mutate, isPending, data } = useMutation({
    mutationFn: postLogin,
    onSuccess: ({ tokenDetail, user }: LoginResultI) => {
      Cookies.set("userTokenSafarestan", tokenDetail.token);
      if (onSuccess) onSuccess({ tokenDetail, user });
      toast.success("Welcome");
    },
    onError(err: AxiosError<unknown, any>) {
      const error = err;
      toast.error(error.message);
    },
  });

  return {
    postLoginAction: mutate,
    postLoginLoading: isPending,
    paymentData: data,
  };
}
