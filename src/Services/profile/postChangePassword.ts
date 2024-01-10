import Cookies from "js-cookie";
import { PROFILE_URLS } from "../../constants/urls";
import { axiosInstance } from "@/providers";

export interface PostProfileSettingsArgsI {
  userId: string;
  newPassword: string;
  oldPassword: string;
}

const postChangePassword = async ({
  newPassword,
  userId,
  oldPassword,
}: PostProfileSettingsArgsI) => {
  const response = await axiosInstance.post<boolean>(
    PROFILE_URLS.POST_CHANGE_PASSWORD,
    {
      newPassword,
      userId,
      oldPassword,
    },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("userTokenSafarestan")}`,
      },
    }
  );
  return response;
};

export default postChangePassword;
