const todayDateObject = () => {
  const today = new Date();

  return {
    year: today.getFullYear(),
    month: +String(today.getMonth() + 1).padStart(2, '0'),
    day: +String(today.getDate()).padStart(2, '0'),
  };
};

export default todayDateObject;
