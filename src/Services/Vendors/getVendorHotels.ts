import { VENDOR_URLS } from 'Constants/urls';
import { calculateSkip } from 'Helpers';
import { ApiResponseI } from 'Types/Vendors';
import { VendorHotelsDataI } from 'Types/Vendors/vendors';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Params } from 'react-router-dom';

const getVendorHotels = async ({
  vendorId,
  pageSize,
  hotelName,
  page,
  stayTypeId,
  active,
}: {
  page: number;
  vendorId: string | Readonly<Params<string>>;
  pageSize: number;
  hotelName: string;
  stayTypeId: string;
  active: boolean;
}) => {
  const response = await axios.get<ApiResponseI<VendorHotelsDataI>>(
    VENDOR_URLS.GET_VENDOR_HOTELS,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('userToken') as string}`,
      },
      params: {
        skip: calculateSkip({ page, pageSize }),
        vendorId,
        take: pageSize,
        OrderBy: 'id',
        HotelNote: hotelName,
        stayTypeId,
        active,
        ...(active !== undefined && { active }),
      },
    },
  );

  return response?.data?.result;
};

export default getVendorHotels;
