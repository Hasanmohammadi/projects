import { MARKET_URLS } from 'Constants/urls';
import { ApiResponseI, MarketListI } from 'Types/Market/Market';
import axios from 'axios';
import Cookies from 'js-cookie';

const getMarketList = async ({ vendorId }: { vendorId: string }) => {
  const response = await axios.get<ApiResponseI<MarketListI>>(
    MARKET_URLS.GET_MARKET_LIST,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('userToken') as string}`,
      },
      params: {
        skip: 0,
        take: 1000,
        orderBy: 'Id',
        SortType: 'ASC',
        vendorId,
      },
    },
  );

  return response.data.result;
};

export default getMarketList;
