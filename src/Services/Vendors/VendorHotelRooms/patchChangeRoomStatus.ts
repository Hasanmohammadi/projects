import { VENDOR_HOTEL_ROOMS_URLS } from 'Constants/urls';
import { NullResultI } from 'Types/Vendors';
import axios from 'axios';
import Cookies from 'js-cookie';

const patchChangeRoomStatus = async ({ roomId }: { roomId: string }) => {
  const response = await axios.patch<NullResultI>(
    VENDOR_HOTEL_ROOMS_URLS.PUT_CHANGE_STATUS_STAY_ROOM,
    {
      roomId,
    },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('userToken') as string}`,
      },
    },
  );

  return response.data;
};

export default patchChangeRoomStatus;
