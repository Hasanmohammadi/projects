import { STAY_URLS } from 'Constants/urls';
import { AddHotelDetailInfoI, NullResultI } from 'Types/Stay';
import axios from 'axios';
import Cookies from 'js-cookie';

const putEditHotelDetail = async ({
  HotelDetailInfo,
}: {
  HotelDetailInfo: AddHotelDetailInfoI;
}) => {
  const response = await axios.put<NullResultI>(
    STAY_URLS.PUT_EDIT_HOTEL_DETAIL,
    {
      ...HotelDetailInfo,
    },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('userToken') as string}`,
      },
    },
  );

  return response.data;
};

export default putEditHotelDetail;
