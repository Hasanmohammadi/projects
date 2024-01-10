import { STAY_URLS } from 'Constants/urls';
import { EditStayPolicyI, NullResultI } from 'Types/Stay';
import axios from 'axios';
import Cookies from 'js-cookie';

const putEditStayPolicy = async ({
  childPolicies,
  hotelId,
  noShowMin,
  noshowHour,
  onlyAdultAccepted,
  onlyManNotAccepted,
  stayPolicyId,
  vendorId,
  vendorStayPolicyId,
}: EditStayPolicyI) => {
  const response = await axios.put<NullResultI>(
    STAY_URLS.PUT_EDIT_STAY_POLICY,
    {
      childPolicies,
      hotelId,
      noShowMin,
      noshowHour,
      onlyAdultAccepted,
      onlyManNotAccepted,
      stayPolicyId,
      vendorId,
      vendorStayPolicyId,
    },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('userToken') as string}`,
      },
    },
  );

  return response.data;
};

export default putEditStayPolicy;
