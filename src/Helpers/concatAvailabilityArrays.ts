import { RoomsInfoI } from 'Pages/Availability/AvailabilityTable';
import { AvailabilityI } from 'Types/Vendors';
import { FieldArrayWithId } from 'react-hook-form';

const concatAvailabilityArrays = ({
  fields,
  availabilities,
}: {
  fields: FieldArrayWithId<RoomsInfoI, 'dateRange', 'id'>[];
  availabilities: AvailabilityI[];
}) =>
  fields.map((item1) => {
    const item2 = availabilities?.find(
      (item) => item?.date === item1?.date,
    );

    if (item2) {
      return item2;
    }
    return item1;
  });

export default concatAvailabilityArrays;
