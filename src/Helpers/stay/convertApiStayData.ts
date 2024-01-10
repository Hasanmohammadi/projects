import calculateStayDistances from 'Helpers/calculateStayDistances';
import {
  LocationDistanceListI,
  StayInformationResultI,
  StayPolicyI,
} from 'Types/Stay';

const convertApiStayData = (
  stayInformationData: StayInformationResultI | undefined,
) => {
  const {
    note,
    email,
    officialName,
    number,
    hotelId,
    website,
    fax,
    postalCode,
    hotelAddrerss,
    generalDescription,
    locationDistance,
    hotelPhotos,
    hotelProperties,
    policy,
  } = stayInformationData ?? {};

  const {
    addressDetail,
    cityId,
    cityName,
    countryId,
    latitude,
    longitude,
  } = hotelAddrerss ?? {};

  return {
    stayInfo: {
      name: note || '',
      email: email || '',
      officialName: officialName || '',
      primaryMobilePhone: number || '',
      stayId: hotelId || '',
      website: website || '',
      fax: fax || '',
      postalCode: postalCode || '',
      description: generalDescription || '',
      stayLocation: {
        hotelId: hotelId || '',
        addressDetail: addressDetail || '',
        latitude: latitude || '',
        longitude: longitude || '',
        countryId: countryId || '',
        city: {
          id: cityId || '',
          label: cityName || '',
        },
      },
      locationDistanceList: calculateStayDistances(
        locationDistance as LocationDistanceListI,
      ),
    },
    facilities: hotelProperties,
    policy: policy as StayPolicyI,
    hotelPhotos,
  };
};

export default convertApiStayData;
