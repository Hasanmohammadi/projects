import {
  concatAvailabilityArrays,
  convertDateToTableFormat,
} from 'Helpers';
import { DatesI, RoomsInfoI } from 'Pages/Availability/AvailabilityTable';
import { AvailabilityI } from 'Types/Vendors';
import { useEffect, useState } from 'react';
import { FieldArrayWithId } from 'react-hook-form';

const useMakeNewAvailability = ({
  fields,
  availabilities,
  dates,
}: {
  fields: FieldArrayWithId<RoomsInfoI, 'dateRange', 'id'>[];
  availabilities: AvailabilityI[];
  dates: DatesI[];
}) => {
  const [availabilityRoom, setAvailabilityRooms] =
    useState<AvailabilityI[]>();
  const [finalFields, setFinalFields] = useState<AvailabilityI[]>();

  useEffect(() => {
    const x = availabilities.map((value) => ({
      ...value,
      date: convertDateToTableFormat(value.date),
    }));

    setAvailabilityRooms(x);
  }, [dates]);

  useEffect(() => {
    const y = concatAvailabilityArrays({
      availabilities: availabilityRoom as AvailabilityI[],
      fields,
    });
    setFinalFields(y);
  }, [availabilityRoom]);

  return {
    finalFields,
  };
};

export default useMakeNewAvailability;
