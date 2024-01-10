import { STAY_URLS } from 'Constants/urls';
import { NullResultI } from 'Types/Stay';
import { AddVendorDescriptionI } from 'Types/Stay/stay';
import axios from 'axios';
import Cookies from 'js-cookie';

const putEditStayDescription = async ({
  hotelDescriptionsDetailes,
  hotelId,
}: AddVendorDescriptionI) => {
  const response = await axios.put<NullResultI>(
    STAY_URLS.PUT_CHANGE_STAY_DESCRIPTION,
    {
      hotelDescriptionsDetailes: hotelDescriptionsDetailes as {
        shortDescription: string;
        longDescription: string;
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

export default putEditStayDescription;
