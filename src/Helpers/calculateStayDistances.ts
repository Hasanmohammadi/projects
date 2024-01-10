import { LocationDistanceListI } from 'Types/Stay';

interface DistanceI {
  distance: string;
  location: string;
  unit: 'KM' | 'M';
}

function calculateStayDistances(args: LocationDistanceListI): DistanceI[] {
  const locations: DistanceI[] = [];
  if (args !== undefined) {
    Object?.keys(args)?.forEach((key) => {
      const distance = args?.[key];
      locations.push({
        distance: String(
          distance.includes('.') ? +distance * 1000 : distance,
        ),
        location: key,
        unit: distance.includes('.') ? 'M' : 'KM',
      });
    });
  }

  return locations;
}

export default calculateStayDistances;
