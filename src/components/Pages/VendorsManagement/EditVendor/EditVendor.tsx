import { EditVendorLoading, Tabs } from 'Common';
import { useAppContext } from 'Context';
import {
  convertUtcToDate,
  separateCountryCode,
  separatePhoneNumber,
} from 'Helpers';
import { useGetVendor, usePutEditVendor } from 'Hooks/Vendors';
import { VendorContactsApiI } from 'Types/Vendors';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AssignHotels from '../AssignHotels';
import AssignSalesChannels from '../AssignSalesChannels';
import { VendorContactsI } from '../NewVendor';
import VendorInformation from '../NewVendor/components/VendorInformation';

const convertContactsData = (
  apiContacts: VendorContactsApiI[],
): VendorContactsI[] =>
  apiContacts.map(({ name, value }: VendorContactsApiI) => ({
    countryCode: separateCountryCode(value),
    name,
    phone: separatePhoneNumber(value),
  }));

export default function EditVendor() {
  const { vendorManagementId } = useAppContext();
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const { editVendorAction } = usePutEditVendor();
  const { vendorData, isLoading, getVendorAction } = useGetVendor({
    id: vendorManagementId,
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (vendorManagementId.length < 23) {
      navigate('/vendors-management');
    }
  }, []);

  return (
    <div>
      <h1 className="text-gray-900 font-medium text-3xl">Edit Vendor</h1>
      {isLoading ? (
        <EditVendorLoading />
      ) : (
        <Tabs
          activeTab={activeTabIndex}
          setActiveTabIndex={setActiveTabIndex}
          className="mt-6"
          tabs={[
            {
              name: 'Vendor Information',
              children: (
                <VendorInformation
                  vendorId={vendorManagementId}
                  editVendorAction={editVendorAction}
                  inputsDefaultValue={{
                    address: vendorData?.address as string,
                    city: {
                      id: vendorData?.cityId as string,
                      label: vendorData?.cityName as string,
                    },
                    countryId: vendorData?.countryId as string,
                    displayName: vendorData?.displayName as string,
                    currencyId: vendorData?.currencyId as string,
                    website: vendorData?.webSite as string,
                    email: vendorData?.email as string,
                    isActive: vendorData?.isActive ? '1' : '0',
                    name: vendorData?.name as string,
                    contacts: convertContactsData(
                      vendorData?.contacts as VendorContactsApiI[],
                    ),
                    startAndExpireDate: {
                      from: convertUtcToDate(
                        vendorData?.startDate as string,
                      ),
                      to: convertUtcToDate(
                        vendorData?.expirationDate as string,
                      ),
                    },
                  }}
                />
              ),
            },
            {
              name: 'Assign Hotels',
              children: (
                <AssignHotels
                  vendorHotels={vendorData?.vendorHotels}
                  setActiveTabIndex={setActiveTabIndex}
                  getVendorAction={getVendorAction}
                />
              ),
            },
            {
              name: 'Sales Channels',
              children: (
                <AssignSalesChannels
                  vendorSalesChannel={
                    vendorData?.vendorHotelRoomSalesChannels
                  }
                />
              ),
            },
          ]}
        />
      )}
    </div>
  );
}
