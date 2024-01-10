import { STAY_URLS } from 'Constants/urls';
import { NullResultI } from 'Types/Stay';
import axios from 'axios';
import Cookies from 'js-cookie';

const postAddHotelProperty = async ({
  hotelId,
  hotelPropertyIds,
}: {
  hotelId: string;
  hotelPropertyIds: string[];
}) => {
  const response = await axios.post<NullResultI>(
    STAY_URLS.POST_ADD_STAY_PROPERTY,
    {
      hotelId,
      hotelPropertyIds,
    },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('userToken') as string}`,
      },
    },
  );

  return response.data;
};

export default postAddHotelProperty;
