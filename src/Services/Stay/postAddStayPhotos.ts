import { STAY_URLS } from 'Constants/urls';
import { NullResultI } from 'Types/Stay';
import axios from 'axios';
import Cookies from 'js-cookie';

const postAddStayPhotos = async (formData: FormData) => {
  const response = await axios.post<NullResultI>(
    STAY_URLS.POST_ADD_STAY_PHOTOS,
    {
      hotelId: formData.get('hotelId'),
      categoryId: formData.get('categoryId'),
      name: formData.get('name'),
      photoLinks: formData.get('photoLinks'),
      photoFiles: formData.get('photoFiles'),
    },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('userToken') as string}`,
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return response.data;
};

export default postAddStayPhotos;
