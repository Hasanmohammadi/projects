interface ConvertDateToUtcI {
  day: number;
  month: number;
  year: number;
}

const convertDateToUtc = ({
  day,
  month,
  year,
}: ConvertDateToUtcI): Date | string => `${year}-${month}-${day}`;
export default convertDateToUtc;
