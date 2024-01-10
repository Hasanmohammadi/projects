import { SEARCH_URLS } from "@/constants/urls";
import { axiosInstance } from "@/providers";
import { AddToCartResultI, PassengersInfoI } from "@/types/flight";
import { ApiResponseI } from "@/types/general";
import Cookies from "js-cookie";

interface PostAddToCardArgsI {
  searchId: string;
  passengersInfo: PassengersInfoI;
  priceDetailIds: string[];
}

const postAddToCard = async ({
  passengersInfo,
  priceDetailIds,
  searchId,
}: PostAddToCardArgsI) => {
  const response = await axiosInstance.post<ApiResponseI<AddToCartResultI>>(
    SEARCH_URLS.POST_ADD_TO_CARD,
    {
      passengersInfo,
      priceDetailIds,
      searchId,
    },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("userTokenSafarestan")}`,
      },
    }
  );
  return response?.data?.result;
};

export default postAddToCard;
