const convertLocationDistance = (
  locationDistanceList: {
    location: string;
    distance: string;
    unit?: 'KM' | 'M' | undefined;
  }[],
) =>
  locationDistanceList.map(({ distance, location, unit }) => ({
    distance: String(unit === 'KM' ? distance : +distance / 1000),
    location,
  }));

export default convertLocationDistance;
