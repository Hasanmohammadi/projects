import { getVendorHotelRoomPensions } from 'Services/Vendors/VendorHotelRooms';
import { HotelRoomPensionI } from 'Types/Vendors/vendors';
import { useQuery } from 'react-query';

export default function useGetVendorHotelRoomPensions() {
  const { data: hotelRoomBookingTheBasisData, isLoading } = useQuery<
    HotelRoomPensionI[],
    Error
  >('hotelRoomBookingTheBasis', getVendorHotelRoomPensions);

  return {
    hotelRoomBookingTheBasisData,
    isLoading,
  };
}
