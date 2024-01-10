import { AUTHENTICATION_URLS } from "@/constants/urls";
import { axiosInstance } from "@/providers";
import { ApiResponseI } from "@/types/general";

export interface PostRegisterArgsI {
  userName: string;
  password: string;
}

const postRegister = async ({ password, userName }: PostRegisterArgsI) => {
  const response = await axiosInstance.post<ApiResponseI<Boolean>>(
    AUTHENTICATION_URLS.POST_REGISTER,
    {
      password,
      userName,
    }
  );

  return response?.data?.result;
};

export default postRegister;
