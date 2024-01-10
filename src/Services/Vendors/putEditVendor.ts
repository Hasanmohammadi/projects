import { VendorFormInputsI } from 'Components/Pages/VendorsManagement/NewVendor';
import { VENDOR_URLS } from 'Constants/urls';
import { convertDateToUtc } from 'Helpers';
import { NullResultI } from 'Types/Vendors/';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Params } from 'react-router-dom';

const putEditVendor = async ({
  vendorData: { startAndExpireDate, ...restVendorData },
  id,
}: {
  vendorData: VendorFormInputsI;
  id: string | Readonly<Params<string>>;
}) => {
  const response = await axios.put<NullResultI>(
    VENDOR_URLS.PUT_EDIT_VENDOR,
    {
      ...restVendorData,
      startDate: convertDateToUtc(startAndExpireDate?.from),
      expirationDate: convertDateToUtc(startAndExpireDate?.to),
      isActive: !!restVendorData.isActive,
      vendorId: id,
      contacts: restVendorData.contacts.map(
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

export default putEditVendor;
