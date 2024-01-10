import { STAY_URLS } from 'Constants/urls';
import { ApiResponseI } from 'Types/Stay';
import { StayPhotoCategoriesI } from 'Types/Stay/stay';
import axios from 'axios';
import Cookies from 'js-cookie';

const getStayPhotoCategoryList = async () => {
  const response = await axios.get<ApiResponseI<StayPhotoCategoriesI[]>>(
    STAY_URLS.GET_HOTEL_PHOTO_CATEGORY_LIST,
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

export default getStayPhotoCategoryList;
