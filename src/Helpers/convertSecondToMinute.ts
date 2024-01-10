const convertSecondToMinute = (
  minutes: number,
  englishFormat = true,
): string => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  let formattedTime = '';

  if (hours > 0) {
    formattedTime += `${hours}${englishFormat ? 'h ' : ':'}`;
  }

  if (remainingMinutes > 0 || hours === 0) {
    formattedTime += `${remainingMinutes}${englishFormat ? 'm' : ''}`;
  }

  return formattedTime;
};

export default convertSecondToMinute;
