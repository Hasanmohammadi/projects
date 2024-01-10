const convertMinutesToHoursAndMinutes = (minutes: number): string => {
  if (isNaN(minutes) || minutes < 0) {
    throw new Error(
      "Invalid input. Please provide a non-negative number of minutes."
    );
  }

  const hours: number = Math.floor(minutes / 60);
  const remainingMinutes: number = minutes % 60;

  const formattedHours: string = hours.toString().padStart(2, "0");
  const formattedMinutes: string = remainingMinutes.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}`;
};

export default convertMinutesToHoursAndMinutes;
