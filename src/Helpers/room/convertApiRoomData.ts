import convertUtcToDate from 'Helpers/convertUtcToDate';
import defaultDate from 'Helpers/defaultDate';
import { VendorHotelRoomResultI } from 'Types/Vendors';

const convertApiRoomData = (
  vendorHotelRoomData: VendorHotelRoomResultI | undefined,
) => {
  const {
    name,
    vendorHotelRoomBaseType,
    vendorHotelRoomDetail,
    vendorHotelRoomDescription,
    cancellationPolicyDTO,
    vendorHotelRoomFacility,
  } = vendorHotelRoomData ?? {};
  const policyInfo = cancellationPolicyDTO?.[0];

  const generalDescription = vendorHotelRoomDescription?.find(
    ({ shortDescription }) => shortDescription.includes('General: '),
  );

  return {
    roomInfo: {
      vendorHotelRoomDetailId: vendorHotelRoomDetail?.id || '',
      VendorHotelRoomBaseTypeId: vendorHotelRoomBaseType?.id || '',
      roomName: name || '',
      maxSize: vendorHotelRoomDetail?.maxSize || 0,
      minSize: vendorHotelRoomDetail?.minSize || 0,
      VendorHotelRoomViewTypeId:
        vendorHotelRoomDetail?.vendorHotelRoomViewTypeId || '',
      roomNumbers: vendorHotelRoomDetail?.roomNumbers || '',
      VendorHotelRoomPensionId:
        vendorHotelRoomDetail?.vendorHotelRoomBookingTheBasisId || '',
      longDescription: generalDescription?.longDescription || '',
      languageId: generalDescription?.languageId || '',
      shortDescription:
        generalDescription?.shortDescription.replace('General: ', '') ||
        '',
      note: vendorHotelRoomDetail?.note || '',
      bedRoomCount: vendorHotelRoomDetail?.bedRoomCount || '',
      standardCapacity: vendorHotelRoomDetail?.standardCapacity || 0,
      extraCapacity: vendorHotelRoomDetail?.extraCapacity || 0,
    },
    roomPolicy: {
      title: policyInfo?.title || '',
      cancellationPolicy1Day: policyInfo?.cancellationPolicy1Day || 0,
      cancellationPolicy2Day: policyInfo?.cancellationPolicy2Day || 0,
      cancellationPolicy1Percent:
        policyInfo?.cancellationPolicy1Percent || 0,
      cancellationPolicy2Percent:
        policyInfo?.cancellationPolicy2Percent || 0,
      noShowTimePercent: policyInfo?.noShowTimePercent || 0,
      salesChannelId: policyInfo?.salesChannelId || ' ',
      freeCancellationDay: policyInfo?.freeCancellationDay || 0,
      startAndExpireDate: policyInfo?.fromDate
        ? {
            from: convertUtcToDate(policyInfo?.fromDate),
            to: convertUtcToDate(policyInfo?.toDate),
          }
        : defaultDate(),
    },
    vendorHotelRoomFacility,
  };
};

export default convertApiRoomData;
