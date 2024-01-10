import { GENERAL_URLS } from 'Constants/urls';
import { CountriesDataI } from 'Types/General';
import axios from 'axios';
import Cookies from 'js-cookie';

const getCountries = async () => {
  const response = await axios.get<CountriesDataI>(
    GENERAL_URLS.GET_COUNTRIES,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('userToken') as string}`,
      },
      params: {
        skip: 0,
        take: 1000,
        orderBy: 'Name',
        SortType: 'Asc',
      },
    },
  );

  return response.data.result;
};

export default getCountries;
