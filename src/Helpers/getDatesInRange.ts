function getDatesInRange({
  startDate,
  endDate,
}: {
  startDate: Date;
  endDate: Date;
}) {
  const date = new Date(startDate.getTime());

  const dates: { year: number; month: string; day: string }[] = [];

  while (date <= endDate) {
    const x = new Date(date);

    dates.push({
      year: x.getUTCFullYear(),
      month: x.toLocaleString('default', { month: 'short' }),
      day: x.toLocaleString('default', { day: 'numeric' }),
    });

    date.setDate(date.getDate() + 1);
  }

  return dates;
}

export default getDatesInRange;
