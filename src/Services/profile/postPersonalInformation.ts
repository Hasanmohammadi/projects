import { PROFILE_URLS } from "@/constants/urls";
import { axiosInstance } from "@/providers";
import Cookies from "js-cookie";

export interface PostPersonalInformationArgsI {
  firstName: string;
  lastName: string;
  emailAddress: string;
  emailAddressVerified: boolean;
  mobileNo: string;
  mobileNoVerified: boolean;
  brithDate: string;
  nationality: string;
  gender: number;
}

const postPersonalInformation = async ({
  brithDate,
  emailAddress,
  emailAddressVerified,
  firstName,
  gender,
  lastName,
  mobileNo,
  mobileNoVerified,
  nationality,
}: PostPersonalInformationArgsI) => {
  const response = await axiosInstance.post<boolean>(
    PROFILE_URLS.POST_PERSONAL_INFORMATION,
    {
      brithDate,
      emailAddress,
      emailAddressVerified,
      firstName,
      gender,
      lastName,
      mobileNo,
      mobileNoVerified,
      nationality,
    },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("userTokenSafarestan")}`,
      },
    }
  );
  return response;
};

export default postPersonalInformation;
