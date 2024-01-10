import { STAY_URLS } from 'Constants/urls';
import { NullResultI } from 'Types/Stay';
import axios from 'axios';
import Cookies from 'js-cookie';

export interface ChildPolicyI {
  fromAge: number;
  toAge: number;
  passengerType: number;
  bedRequired: boolean;
}

export interface PostAddStayPolicyI {
  hotelId: string;
  vendorId: string;
  noshowHour: number;
  noShowMin: number;
  onlyAdultAccepted: boolean;
  onlyManNotAccepted: boolean;
  childPolicies: ChildPolicyI[];
}

const postAddStayPolicy = async ({
  childPolicies,
  hotelId,
  noShowMin,
  noshowHour,
  onlyAdultAccepted,
  onlyManNotAccepted,
  vendorId,
}: PostAddStayPolicyI) => {
  const response = await axios.post<NullResultI>(
    STAY_URLS.POST_ADD_STAY_POLICY,
    {
      childPolicies,
      hotelId,
      noShowMin,
      noshowHour,
      onlyAdultAccepted,
      onlyManNotAccepted,
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

export default postAddStayPolicy;
