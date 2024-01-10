import { AddHotelDetailInfoInputsI } from 'Pages/InfoManagement/Stays/StayInformation';
import { AddHotelDetailInfoI } from 'Types/Stay';

const convertStayInfoToApiData = ({
  stayInfo,
  anchor,
  hotelId,
  hotelDetailId,
}: {
  stayInfo: AddHotelDetailInfoInputsI;
  anchor: { lat: string; long: string };
  hotelId: string;
  hotelDetailId?: string;
}): AddHotelDetailInfoI => {
  const arr = stayInfo.locationDistanceList;
  const obj: { [key: string]: string } = {};
  arr.forEach((item) => {
    obj[item.location] = item.distance;
  });

  return {
    name: stayInfo.name,
    description: stayInfo.description,
    stayId: hotelId,
    primaryMobilePhone: stayInfo.primaryMobilePhone,
    fax: stayInfo.fax,
    email: stayInfo.email,
    website: stayInfo.website,
    postalCode: stayInfo.postalCode,
    locationDistanceList: obj,
    officialName: stayInfo.officialName,
    hotelDetailId,
    stayLocation: {
      hotelId,
      addressDetail: stayInfo.stayLocation.addressDetail,
      latitude: anchor.lat,
      longitude: anchor.long,
      cityId: stayInfo.stayLocation?.city.id,
      cityName: stayInfo.stayLocation?.city.label,
      countryId: stayInfo.stayLocation?.countryId,
    },
  };
};

export default convertStayInfoToApiData;
