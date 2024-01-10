import { PAYMENT_URL } from "@/constants/urls";
import { axiosInstance } from "@/providers";
import { ApiResponseI } from "@/types/general";
import { CompletePaymentResultI } from "@/types/payment";
import Cookies from "js-cookie";

export interface postCompletePaymentArgsI {
  paymentCode: string;
  invoiceCode: string;
}

const postCompletePayment = async ({
  invoiceCode,
  paymentCode,
}: postCompletePaymentArgsI) => {
  const response = await axiosInstance.post<
    ApiResponseI<CompletePaymentResultI>
  >(
    PAYMENT_URL.POST_COMPLETE_PAYMENT,
    {
      paymentCode,
      invoiceCode,
    },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("userTokenSafarestan")}`,
      },
    }
  );
  return response?.data.result;
};

export default postCompletePayment;
