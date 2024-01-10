import { STAY_URLS } from 'Constants/urls';
import { ApiResponseI, StayTypeListI } from 'Types/Stay';
import axios from 'axios';
import Cookies from 'js-cookie';

const getStayType = async () => {
  const response = await axios.get<ApiResponseI<StayTypeListI>>(
    STAY_URLS.GET_STAY_TYPE,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('userToken') as string}`,
      },
      params: {
        skip: 0,
        take: 1000,
        orderBy: 'Id',
        SortType: 'Asc',
      },
    },
  );

  return response.data.result;
};

export default getStayType;
