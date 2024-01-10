import { PROFILE_URLS } from "../../constants/urls";

import { axiosInstance } from "@/providers";
import { UserInfoI } from "@/types/profile";
import { ApiResponseI } from "../../types/general";

import Cookies from "js-cookie";

const getPersonalInformation = async () => {
  const response = await axiosInstance.get<ApiResponseI<UserInfoI>>(
    PROFILE_URLS.GET_PROFILE_INFORMATION,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("userTokenSafarestan")}`,
      },
    }
  );

  return response?.data?.result;
};

export default getPersonalInformation;
