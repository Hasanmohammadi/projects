const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const getMonthIndex = (monthName: string) =>
  months.findIndex(
    (value) => value.toLocaleLowerCase() === monthName.toLocaleLowerCase(),
  );

export default getMonthIndex;
