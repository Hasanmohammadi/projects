import Cookies from "js-cookie";
import { BankResultI } from "@/types/basicInformation";
import { axiosInstance } from "@/providers";
import { BASIC_INFORMATION } from "@/constants/urls";
import { ApiResponseI } from "@/types/general";

const getBank = async () => {
  const response = await axiosInstance.get<ApiResponseI<BankResultI[]>>(
    BASIC_INFORMATION.GET_BANK,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("userTokenSafarestan")}`,
      },
    }
  );

  return response?.data?.result;
};

export default getBank;
