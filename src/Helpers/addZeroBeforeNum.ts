const addZeroBeforeNum = (number: "string" | number) => {
  if (+number < 10) return `0${number}`;
  return number;
};

export default addZeroBeforeNum;
