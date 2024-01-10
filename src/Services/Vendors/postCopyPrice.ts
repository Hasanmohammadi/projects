import { VENDOR_URLS } from 'Constants/urls';
import { NullResultI } from 'Types/Vendors';
import axios from 'axios';
import Cookies from 'js-cookie';

export interface PostCopyPriceI {
  from: string;
  to: string;
  stayId: string;
  newSalesChannelId: string;
  salesChannelId: string;
  newRoomId: string;
  roomId: string;
  copyType: number | string;
  value: number | string;
  priceEntry: 'markDown' | 'markup' | '';
}

const postCopyPrice = async ({ price }: { price: PostCopyPriceI }) => {
  const { priceEntry, ...rest } = price;

  const response = await axios.post<NullResultI>(
    VENDOR_URLS.POST_COPY_PRICE,
    {
      ...rest,
    },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('userToken') as string}`,
      },
    },
  );

  return response.data;
};

export default postCopyPrice;
