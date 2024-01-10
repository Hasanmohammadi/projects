import { STAY_URLS } from 'Constants/urls';
import { NullResultI } from 'Types/Stay';
import axios from 'axios';
import Cookies from 'js-cookie';

const patchChangeStayStatus = async ({ stayId }: { stayId: string }) => {
  const response = await axios.patch<NullResultI>(
    STAY_URLS.PATCH_CHANGE_STAY_STATUS,
    {
      stayId,
    },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('userToken') as string}`,
      },
    },
  );

  return response.data;
};

export default patchChangeStayStatus;
