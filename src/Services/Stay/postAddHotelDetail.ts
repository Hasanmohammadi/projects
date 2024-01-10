import { STAY_URLS } from 'Constants/urls';
import { AddHotelDetailInfoI, NullResultI } from 'Types/Stay';
import axios from 'axios';
import Cookies from 'js-cookie';

const postAddHotelDetail = async ({
  HotelDetailInfo,
}: {
  HotelDetailInfo: AddHotelDetailInfoI;
}) => {
  const response = await axios.post<NullResultI>(
    STAY_URLS.POST_ADD_HOTEL_DETAIL,
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

export default postAddHotelDetail;
