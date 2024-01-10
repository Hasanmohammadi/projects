import { MARKET_URLS } from 'Constants/urls';
import { CurrencyListDataI } from 'Types/Market';
import axios from 'axios';
import Cookies from 'js-cookie';

const getCurrencyList = async () => {
  const response = await axios.get<CurrencyListDataI>(
    MARKET_URLS.GET_CURRENCY_LIST,
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

export default getCurrencyList;
