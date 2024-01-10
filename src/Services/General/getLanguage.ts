import { GENERAL_URLS } from 'Constants/urls';
import { LanguagesDataI } from 'Types/General';
import axios from 'axios';
import Cookies from 'js-cookie';

const getLanguage = async () => {
  const response = await axios.get<LanguagesDataI>(
    GENERAL_URLS.GET_LANGUAGES,
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

export default getLanguage;
