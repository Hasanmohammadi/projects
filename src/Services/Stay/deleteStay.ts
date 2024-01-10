import { STAY_URLS } from 'Constants/urls';
import { NullResultI } from 'Types/Stay';
import axios from 'axios';
import Cookies from 'js-cookie';

const deleteStay = async ({ stayId }: { stayId: string }) => {
  const response = await axios.delete<NullResultI>(STAY_URLS.DELETE_STAY, {
    data: {
      stayId,
    },
    headers: {
      Authorization: `Bearer ${Cookies.get('userToken') as string}`,
    },
  });

  return response.data;
};

export default deleteStay;
