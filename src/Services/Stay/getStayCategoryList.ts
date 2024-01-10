import { STAY_URLS } from 'Constants/urls';
import { ApiResponseI, StayCategoryResult } from 'Types/Stay';
import axios from 'axios';
import Cookies from 'js-cookie';

const getStayCategoryList = async () => {
  const response = await axios.get<ApiResponseI<StayCategoryResult>>(
    STAY_URLS.GET_HOTEL_PROPERTY_CATEGORY,
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

export default getStayCategoryList;
