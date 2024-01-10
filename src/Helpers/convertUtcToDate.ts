const convertUtcToDate = (utc: string) => {
  const x = utc?.split('T')[0];
  const y = x?.split('-');
  return {
    year: Number(y?.[0]),
    month: Number(y?.[1]),
    day: Number(y?.[2]),
  };
};

export default convertUtcToDate;
