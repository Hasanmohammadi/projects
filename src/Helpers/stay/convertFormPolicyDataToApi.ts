import { StayPolicyFormI } from 'Pages/InfoManagement/Stays/StayPolicy';
import { EditStayPolicyI } from 'Types/Stay';

const convertFormPolicyDataToApi = ({
  data,
  stayPolicyId,
  vendorId,
  vendorStayPolicyId,
}: {
  data: StayPolicyFormI;
  stayPolicyId: string;
  vendorId: string;
  vendorStayPolicyId: string;
}): EditStayPolicyI => {
  const {
    child1Policy,
    child2Policy,
    hotelId,
    infantPolicy,
    noShowMin,
    noshowHour,
    onlyAdultAccepted,
    onlyManNotAccepted,
  } = data ?? {};
  return {
    hotelId,
    noshowHour,
    noShowMin,
    onlyAdultAccepted: !!onlyAdultAccepted,
    onlyManNotAccepted: !!onlyManNotAccepted,
    childPolicies: [
      { ...child1Policy, bedRequired: !!child1Policy.bedRequired },
      { ...child2Policy, bedRequired: !!child2Policy.bedRequired },
      { ...infantPolicy, bedRequired: !!infantPolicy.bedRequired },
    ],
    stayPolicyId,
    vendorId,
    vendorStayPolicyId,
  };
};

export default convertFormPolicyDataToApi;
