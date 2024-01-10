const convertDateToTableFormat = (date: string) => {
  const d = new Date(date).toDateString().split(' ');
  return `${d[1]} ${d[2]}, ${d[3]}`;
};

export default convertDateToTableFormat;
