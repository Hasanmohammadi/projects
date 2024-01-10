import { StayPolicyI } from 'Types/Stay';

interface CreateStayPolicyDefaultValueArgs {
  dataDefaultValue: StayPolicyI | undefined;
  hotelId: string;
}

const createStayPolicyDefaultValue = ({
  dataDefaultValue,
  hotelId,
}: CreateStayPolicyDefaultValueArgs) => ({
  hotelId,
  noshowHour:
    dataDefaultValue?.cancellationPolicy.cancellationHour || +'00',
  noShowMin:
    dataDefaultValue?.cancellationPolicy.cancellationMinute || +'00',
  onlyAdultAccepted: dataDefaultValue?.cancellationPolicy.adultOnly
    ? 1
    : 0,
  onlyManNotAccepted: dataDefaultValue?.cancellationPolicy.couplesOnly
    ? 1
    : 0,
  infantPolicy: {
    fromAge: (dataDefaultValue?.infant?.from as number) || 0,
    toAge: (dataDefaultValue?.infant?.to as number) || 0,
    passengerType: 4,
    bedRequired: dataDefaultValue?.infant?.bedRequired ? 1 : 0,
  },
  child1Policy: {
    fromAge: (dataDefaultValue?.child1?.from as number) || 0,
    toAge: (dataDefaultValue?.child1?.to as number) || 0,
    passengerType: 1,
    bedRequired: dataDefaultValue?.child1?.bedRequired ? 1 : 0,
  },
  child2Policy: {
    fromAge: (dataDefaultValue?.child2?.from as number) || 0,
    toAge: (dataDefaultValue?.child2?.to as number) || 0,
    passengerType: 2,
    bedRequired: dataDefaultValue?.child2?.bedRequired ? 1 : 0,
  },
});

export default createStayPolicyDefaultValue;
