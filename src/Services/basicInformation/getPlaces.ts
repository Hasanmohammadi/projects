import { BASIC_INFORMATION } from "@/constants/urls";
import { axiosInstance } from "@/providers";
import { PlacesI } from "@/types/basicInformation";
import { ApiResponseI } from "@/types/general";

interface PostAirportListI {
  name: string;
  count: number;
}

const getPlaces = async ({ name, count }: PostAirportListI) => {
  const response = await axiosInstance.get<ApiResponseI<PlacesI[]>>(
    BASIC_INFORMATION.GET_PLACES(name || "a"),
    {
      params: {
        count,
      },
      headers: {
        InstanceId: "C50EEE38-DE25-40CA-A05F-8186ACDEDD9D",
      },
    }
  );

  return response?.data?.result;
};

export default getPlaces;
