import { VENDOR_HOTEL_ROOMS_URLS } from 'Constants/urls';
import { RoomInformationI } from 'Pages/InfoManagement/Rooms/AddRoom/RoomInformation';
import { AddVendorHotelRoomI } from 'Types/Vendors';
import axios from 'axios';
import Cookies from 'js-cookie';

const postAddVendorHotelRoom = async ({
  bedRoomCount,
  note,
  minSize,
  maxSize,
  standardCapacity,
  extraCapacity,
  roomNumbers,
  VendorHotelRoomBaseTypeId,
  VendorHotelRoomViewTypeId,
  longDescription,
  shortDescription,
  languageId,
  VendorHotelRoomPensionId,
  hotelId,
  roomName,
  vendorId,
}: RoomInformationI) => {
  const roomDescription = {
    ...(shortDescription && { shortDescription }),
    ...(longDescription && { longDescription }),
    ...(languageId && { languageId }),
  };

  const response = await axios.post<AddVendorHotelRoomI>(
    VENDOR_HOTEL_ROOMS_URLS.POST_ADD_VENDOR_HOTEL_ROOM,
    {
      bedRoomCount,
      note,
      ...(minSize && { minSize }),
      ...(maxSize && { maxSize }),
      standardCapacity,
      extraCapacity,
      ...(roomNumbers && { roomNumbers }),
      VendorHotelRoomPensionId,
      VendorHotelRoomBaseTypeId,
      VendorHotelRoomViewTypeId,
      roomDescription,
      hotelId,
      name: roomName,
      vendorId,
    },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('userToken') as string}`,
      },
    },
  );

  return response.data;
};

export default postAddVendorHotelRoom;
