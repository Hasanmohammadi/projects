import Cookies from "js-cookie";

import { axiosInstance } from "@/providers";
import { CreateOnlinePaymentResultI } from "@/types/payment";
import { ApiResponseI } from "@/types/general";
import { PAYMENT_URL } from "@/constants/urls";

export interface PostCreateOnlinePaymentArgsI {
  invoiceCode: string;
  callBackUrl: string;
  agencyBankId: number;
}

const postCreateOnlinePayment = async ({
  agencyBankId,
  invoiceCode,
  callBackUrl,
}: PostCreateOnlinePaymentArgsI) => {
  const response = await axiosInstance.post<
    ApiResponseI<CreateOnlinePaymentResultI>
  >(
    PAYMENT_URL.POST_CREATE_ONLINE_PAYMENT,
    {
      agencyBankId,
      invoiceCode,
      callBackUrl,
    },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("userTokenSafarestan")}`,
      },
    }
  );
  return response?.data.result;
};

export default postCreateOnlinePayment;
