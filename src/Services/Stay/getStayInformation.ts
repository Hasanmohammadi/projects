import { STAY_URLS } from 'Constants/urls';
import { ApiResponseI, StayInformationResultI } from 'Types/Stay';
import axios from 'axios';
import Cookies from 'js-cookie';

interface HotelPropertyListI {
  hotelId: string;
  VendorId: string;
}

const getStayInformation = async ({
  hotelId,
  VendorId,
}: HotelPropertyListI) => {
  const response = await axios.get<ApiResponseI<StayInformationResultI>>(
    STAY_URLS.GET_STAY_INFORMATION,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('userToken') as string}`,
      },
      params: {
        id: hotelId,
        ...(VendorId && { VendorId }),
      },
    },
  );

  return response.data.result;
};

export default getStayInformation;
