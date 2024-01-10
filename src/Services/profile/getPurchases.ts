import { PROFILE_URLS } from "@/constants/urls";
import { axiosInstance } from "@/providers";
import { ApiResponseI } from "@/types/general";
import { PurchasesResultI } from "@/types/profile";

import Cookies from "js-cookie";

const getPurchases = async () => {
  const response = await axiosInstance.get<ApiResponseI<PurchasesResultI[]>>(
    PROFILE_URLS.GET_PURCHASES,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("userTokenSafarestan")}`,
      },
    }
  );

  return response?.data?.result;
};

export default getPurchases;
