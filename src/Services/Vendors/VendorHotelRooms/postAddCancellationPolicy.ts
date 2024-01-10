import { VENDOR_HOTEL_ROOMS_URLS } from 'Constants/urls';
import { NullResultI } from 'Types/Vendors';
import axios from 'axios';
import Cookies from 'js-cookie';

interface AddCancellationPolicyArgsI {
  vendorHotelRoomId: string;
  salesChannelId: string;
  title: string;
  fromDate: Date;
  toDate: Date;
  freeCancellationDay: number;
  cancellationPolicy1Day: number;
  cancellationPolicy1Percent: number;
  cancellationPolicy2Day: number;
  cancellationPolicy2Percent: number;
  noShowTimePercent: number;
}

const postAddCancellationPolicy = async (
  args: AddCancellationPolicyArgsI,
) => {
  const response = await axios.post<NullResultI>(
    VENDOR_HOTEL_ROOMS_URLS.POST_ADD_CANCELLATION_POLICY,
    args,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('userToken') as string}`,
      },
    },
  );

  return response.data;
};

export default postAddCancellationPolicy;
