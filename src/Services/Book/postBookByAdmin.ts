import { BOOK_URLS } from 'Constants/urls';
import { ApiResponseI } from 'Types/Stay';
import axios from 'axios';
import Cookies from 'js-cookie';

export interface PostBookByAdminArgsI {
  roomId: string;
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  extraCount: number;
  extraAges: number[];
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  guests: Guest[];
}

export interface Guest {
  firstName: string;
  lastName: string;
}

const postBookByAdmin = async (bookInfo: PostBookByAdminArgsI) => {
  const response = await axios.post<ApiResponseI<string>>(
    BOOK_URLS.POST_BOOK_BY_ADMIN,
    {
      ...bookInfo,
    },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('userToken') as string}`,
      },
    },
  );

  return response.data;
};

export default postBookByAdmin;
