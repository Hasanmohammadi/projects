import { GENERAL_URLS } from 'Constants/urls';
import { CitiesDataI } from 'Types/General';
import axios from 'axios';
import Cookies from 'js-cookie';

const getCities = async ({
  cityName,
  countryId,
}: {
  countryId: string;
  cityName?: string;
}) => {
  const response = await axios.get<CitiesDataI>(GENERAL_URLS.GET_CITIES, {
    headers: {
      Authorization: `Bearer ${Cookies.get('userToken') as string}`,
    },
    params: {
      skip: 0,
      take: 1000,
      orderBy: 'Id',
      SortType: 'Asc',
      countryId,
      'filters.name': cityName as string,
    },
  });

  return response.data.result;
};

export default getCities;
