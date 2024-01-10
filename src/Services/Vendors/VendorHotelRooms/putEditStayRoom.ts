import { VENDOR_HOTEL_ROOMS_URLS } from 'Constants/urls';
import { EditStayRoomI, NullResultI } from 'Types/Vendors';
import axios from 'axios';
import Cookies from 'js-cookie';

const putEditStayRoom = async ({
  roomInfo,
}: {
  roomInfo: EditStayRoomI;
}) => {
  const response = await axios.put<NullResultI>(
    VENDOR_HOTEL_ROOMS_URLS.PUT_EDIT_STAY_ROOM,
    {
      ...roomInfo,
    },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('userToken') as string}`,
      },
    },
  );

  return response.data;
};

export default putEditStayRoom;
