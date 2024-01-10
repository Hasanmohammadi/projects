import { STAY_URLS } from 'Constants/urls';
import { AddVendorStayNamesI, NullResultI } from 'Types/Stay';
import axios from 'axios';
import Cookies from 'js-cookie';

const putEditStayNames = async ({
  editHotelNames,
  hotelId,
}: AddVendorStayNamesI) => {
  const response = await axios.put<NullResultI>(
    STAY_URLS.PUT_CHANGE_STAY_NAMES,
    {
      editHotelNames: editHotelNames as {
        name: string;
        languageId: string;
      }[],
      hotelId,
    },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('userToken') as string}`,
      },
    },
  );

  return response.data;
};

export default putEditStayNames;
