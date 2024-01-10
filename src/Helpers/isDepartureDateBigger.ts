interface IsDepartureDateBiggerAgs {
  departureDate: string;
  returnDate: string;
}
const isDepartureDateBigger = ({
  departureDate,
  returnDate,
}: IsDepartureDateBiggerAgs): boolean => {
  const departureD = new Date(departureDate);
  const returnD = new Date(returnDate);

  if (isNaN(departureD.getTime()) || isNaN(returnD.getTime())) {
    throw new Error(
      'Invalid date format. Please provide dates in the format "YYYY/MM/DD".'
    );
  }

  if (departureD > returnD) {
    return true;
  }
  return false;
};

export default isDepartureDateBigger;
