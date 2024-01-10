import { VendorFormInputsI } from 'Components/Pages/VendorsManagement/NewVendor';
import { VENDOR_URLS } from 'Constants/urls';
import { convertDateToUtc } from 'Helpers';
import { ApiResponseI } from 'Types/Stay';
import { AddNewVendorResultI } from 'Types/Vendors/vendors';
import axios from 'axios';
import Cookies from 'js-cookie';

const postAddVendor = async (VendorData: VendorFormInputsI) => {
  const { startAndExpireDate: x, ...restVendorData } = VendorData;

  const response = await axios.post<ApiResponseI<AddNewVendorResultI>>(
    VENDOR_URLS.POST_ADD_VENDOR,
    {
      ...restVendorData,
      startDate: convertDateToUtc(VendorData?.startAndExpireDate?.from),
      expirationDate: convertDateToUtc(VendorData?.startAndExpireDate?.to),
      isActive: !!+VendorData.isActive,
      contacts: VendorData?.contacts.map(
        ({ countryCode, name, phone }) => ({
          name,
          value: `${countryCode}-${phone}`,
        }),
      ),
      cityId: restVendorData.city.id,
    },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('userToken') as string}`,
      },
    },
  );

  return response.data;
};

export default postAddVendor;
