import { STAY_URLS } from 'Constants/urls';
import { NullResultI } from 'Types/Stay';
import axios from 'axios';
import Cookies from 'js-cookie';

interface PostAddStayNameI {
  hotelId: string;
  hotelNames: [
    {
      name: string;
      languageId: string;
    },
  ];
}
const postAddStayName = async ({
  hotelId,
  hotelNames,
}: PostAddStayNameI) => {
  const response = await axios.post<NullResultI>(
    STAY_URLS.POST_ADD_STAY_NAME,
    {
      hotelId,
      hotelNames,
    },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('userToken') as string}`,
      },
    },
  );

  return response.data;
};

export default postAddStayName;
