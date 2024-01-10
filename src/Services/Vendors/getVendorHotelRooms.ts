import { VENDOR_URLS } from 'Constants/urls';
import { calculateSkip } from 'Helpers';
import { VendorHotelRoomsDataI } from 'Types/Vendors/vendors';
import axios from 'axios';
import Cookies from 'js-cookie';

interface GetVendorHotelRoomsArgsI {
  page: number;
  pageSize: number;
  orderBy: string;
  sortType: string;
  hotelId?: string;
  name?: string;
  filterHotelRoomTypeId?: string;
  vendorIdSelected?: string;
  searchAt?: 'roomName' | 'stayName';
}

const getVendorHotelRooms = async ({
  page,
  pageSize,
  orderBy,
  sortType,
  filterHotelRoomTypeId,
  vendorIdSelected,
  hotelId,
  searchAt,
  name,
}: GetVendorHotelRoomsArgsI) => {
  const response = await axios.get<VendorHotelRoomsDataI>(
    VENDOR_URLS.GET_VENDOR_HOTEL_ROOMS_URLS,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('userToken') as string}`,
      },
      params: {
        ...(searchAt === 'stayName' && { 'filters.stayName': name }),
        ...(searchAt === 'roomName' && { 'filters.roomName': name }),
        skip: calculateSkip({ page, pageSize }),
        take: pageSize,
        orderBy,
        sortType,
        vendorId: vendorIdSelected,
        'filters.vendorId': vendorIdSelected,
        ...(filterHotelRoomTypeId && {
          vendorHotelRoomBaseTypeId: filterHotelRoomTypeId,
        }),
        ...(hotelId &&
          hotelId?.length > 23 && { 'filters.stayId': hotelId }),
      },
    },
  );
  return response.data.result;
};

export default getVendorHotelRooms;
