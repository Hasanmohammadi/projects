import { PURCHASE_URLS } from "@/constants/urls";
import { axiosInstance } from "@/providers";
import { ApiResponseI } from "@/types/general";
import { ProductResultI } from "@/types/payment";
import Cookies from "js-cookie";

const getProduct = async ({ invoiceCode }: { invoiceCode: string }) => {
  const response = await axiosInstance.get<ApiResponseI<ProductResultI>>(
    PURCHASE_URLS.GET_PRODUCT(invoiceCode),
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("userTokenSafarestan")}`,
      },
    }
  );

  return response?.data?.result;
};

export default getProduct;
