import { VENDORS_URLS } from 'Constants/urls';
import { calculateSkip } from 'Helpers';
import { VendorsTableDataI } from 'Types/Vendors';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Params } from 'react-router-dom';

const getVendors = async ({
  page,
  pageSize,
  vendorName,
  vendorId,
}: {
  page: number;
  pageSize: number;
  vendorName?: string;
  vendorId?: string | Readonly<Params<string>>;
}) => {
  const response = await axios.get<VendorsTableDataI>(
    VENDORS_URLS.GET_VENDORS,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('userToken') as string}`,
      },
      params: {
        skip: calculateSkip({ page, pageSize }),
        take: pageSize,
        orderBy: 'CreationDate',
        sortType: 'Desc',
        'Filters.Name': vendorName,
        'Filters.Id': vendorId,
      },
    },
  );

  return response.data.result;
};

export default getVendors;
