import getMonthIndex from './getMonthIndex';

const convertTableFormatToUtc = (tableDateFormat: string) => {
  const [month, day, year] = tableDateFormat.replace(',', '').split(' ');

  return new Date(
    Date.UTC(+year, getMonthIndex(month), +day),
  ).toISOString();
};

export default convertTableFormatToUtc;
