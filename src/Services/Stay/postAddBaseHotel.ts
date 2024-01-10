import { STAY_URLS } from 'Constants/urls';
import { AddBaseHotelI, ApiResponseI } from 'Types/Stay';
import axios from 'axios';
import Cookies from 'js-cookie';

const postAddBaseHotel = async ({
  StayTypeId,
}: {
  StayTypeId: string;
}) => {
  const response = await axios.post<ApiResponseI<AddBaseHotelI>>(
    STAY_URLS.POST_ADD_BASE_HOTEL,
    {
      StayTypeId,
    },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('userToken') as string}`,
      },
    },
  );

  return response.data;
};

export default postAddBaseHotel;
