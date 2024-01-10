import { STAY_URLS } from 'Constants/urls';
import { calculateSkip } from 'Helpers';
import { ApiResponseI, StaysListResultI } from 'Types/Stay';
import axios from 'axios';
import Cookies from 'js-cookie';

const getStaysList = async ({
  vendorId,
  isActive,
  page,
  pageSize,
  stayName,
  filterTypeId,
}: {
  vendorId?: string;
  stayName?: string;
  filterTypeId?: string;
  isActive?: boolean;
  pageSize: number;
  page: number;
}) => {
  const response = await axios.get<ApiResponseI<StaysListResultI>>(
    STAY_URLS.GET_STAYS_LIST,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('userToken') as string}`,
      },
      params: {
        skip: calculateSkip({ page, pageSize }),
        take: pageSize,
        orderBy: 'id',
        SortType: 'Asc',
        stayName,
        ...(vendorId && { vendorId }),
        ...(isActive !== undefined && { 'filters.active': isActive }),
        ...(filterTypeId && { 'filters.stayTypeId': filterTypeId }),
      },
    },
  );

  return response.data.result;
};

export default getStaysList;
