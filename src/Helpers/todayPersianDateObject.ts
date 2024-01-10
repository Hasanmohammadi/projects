const todayPersianDateObject = () => {
  const [year, month, day] = new Date()
    .toLocaleDateString('fa-IR')
    .split('/');
  return {
    year,
    month: +month < 10 ? `.${month}` : month,
    day: +day < 10 ? `.${day}` : day,
  };
};

export default todayPersianDateObject;
