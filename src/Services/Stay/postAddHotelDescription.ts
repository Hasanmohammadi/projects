import { STAY_URLS } from 'Constants/urls';
import { NullResultI } from 'Types/Stay';
import axios from 'axios';
import Cookies from 'js-cookie';

interface PostAddHotelDescriptionI {
  hotelId: string;
  shortDescription: string;
  longDescription: string;
  languageId: string;
}

const postAddHotelDescription = async ({
  hotelId,
  languageId,
  longDescription,
  shortDescription,
}: PostAddHotelDescriptionI) => {
  const response = await axios.post<NullResultI>(
    STAY_URLS.POST_ADD_STAY_DESCRIPTION,
    {
      hotelId,
      languageId,
      longDescription,
      shortDescription,
    },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('userToken') as string}`,
      },
    },
  );

  return response.data;
};

export default postAddHotelDescription;
