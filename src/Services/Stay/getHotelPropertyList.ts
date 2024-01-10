import { STAY_URLS } from 'Constants/urls';
import { ApiResponseI, StayPropertyResult } from 'Types/Stay';
import axios from 'axios';
import Cookies from 'js-cookie';

const getHotelPropertyList = async () => {
  const response = await axios.get<ApiResponseI<StayPropertyResult>>(
    STAY_URLS.GET_HOTEL_PROPERTY_LIST,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('userToken') as string}`,
      },
      params: {
        skip: 0,
        take: 1000,
        orderBy: 'id',
        SortType: 'Asc',
      },
    },
  );

  return response.data.result;
};

export default getHotelPropertyList;
