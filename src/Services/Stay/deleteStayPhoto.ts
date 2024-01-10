import { STAY_URLS } from 'Constants/urls';
import { NullResultI } from 'Types/Stay';
import axios from 'axios';
import Cookies from 'js-cookie';

interface DeleteStayPhotoArgsI {
  stayId: string;
  photoId: string;
}

const deleteStayPhoto = async ({
  stayId,
  photoId,
}: DeleteStayPhotoArgsI) => {
  const response = await axios.delete<NullResultI>(
    STAY_URLS.DELETE_STAY_PHOTO,
    {
      data: {
        stayId,
        photoId,
      },
      headers: {
        Authorization: `Bearer ${Cookies.get('userToken') as string}`,
      },
    },
  );

  return response.data;
};

export default deleteStayPhoto;
