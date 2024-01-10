import { StayPolicyFormI } from 'Pages/InfoManagement/Stays/StayPolicy';
import { PostAddStayPolicyI } from 'Services/Stay/postAddStayPolicy';

const convertStayPolicyToApiData = ({
  data,
  vendorId,
}: {
  data: StayPolicyFormI;
  vendorId: string;
}): PostAddStayPolicyI => ({
  vendorId,
  hotelId: data.hotelId,
  noshowHour: data.noshowHour,
  noShowMin: data.noShowMin,
  onlyAdultAccepted: !!data.onlyAdultAccepted,
  onlyManNotAccepted: !!data.onlyManNotAccepted,
  childPolicies: [
    { ...data.child1Policy, bedRequired: !!data.child1Policy.bedRequired },
    { ...data.child2Policy, bedRequired: !!data.child2Policy.bedRequired },
    { ...data.infantPolicy, bedRequired: !!data.infantPolicy.bedRequired },
  ],
});

export default convertStayPolicyToApiData;
