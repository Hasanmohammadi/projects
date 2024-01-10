import Cookies from "js-cookie";
import { PROFILE_URLS } from "../../constants/urls";
import { axiosInstance } from "@/providers";

export interface PostCardInformationArgsI {
  cardNumber: string;
  cardHolderName: string;
  cardExpireYear: number;
  cardExpireMonth: number;
}

const postCardInformation = async ({
  cardExpireMonth,
  cardExpireYear,
  cardHolderName,
  cardNumber,
}: PostCardInformationArgsI) => {
  const response = await axiosInstance.post<boolean>(
    PROFILE_URLS.POST_CARD_INFORMATION,
    {
      cardExpireMonth,
      cardExpireYear,
      cardHolderName,
      cardNumber,
    },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("userTokenSafarestan")}`,
      },
    }
  );
  return response?.data;
};

export default postCardInformation;
