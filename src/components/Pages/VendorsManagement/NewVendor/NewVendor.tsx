import { Tabs } from 'Common';
import { defaultDate } from 'Helpers';
import usePostAddVendor from 'Hooks/Vendors/usePostAddVendor';
import { useState } from 'react';

import AssignHotels from '../AssignHotels';
import AssignSalesChannels from '../AssignSalesChannels';
import VendorInformation from './components/VendorInformation';

export interface VendorContactsI {
  name: string;
  countryCode: string;
  phone: string;
}

export interface VendorFormInputsI {
  name: string;
  displayName: string;
  website: string;
  email: string;
  isActive: '0' | '1';
  startAndExpireDate: {
    from: { day: number; month: number; year: number };
    to: { day: number; month: number; year: number };
  };
  contacts: VendorContactsI[];
  currencyId: string;
  countryId: string;
  city: { id: string; label: string };
  address: string;
}

const inputsDefaultValue: VendorFormInputsI = {
  name: '',
  displayName: '',
  email: '',
  isActive: '1',
  startAndExpireDate: defaultDate(),
  contacts: [{ name: '', countryCode: '+98', phone: '' }],
  website: '',
  currencyId: 'f6cedecb-5ce3-4898-be38-dbca45954fa5',
  countryId: '2b58d912-571a-4817-b086-9d2b825fdc26',
  city: { id: '', label: '' },
  address: '',
};

export default function NewVendor() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const { addVendorAction, isLoading } = usePostAddVendor({
    setActiveTabIndex,
  });

  return (
    <div>
      <h1 className="text-gray-900 font-medium text-3xl">New Vendor</h1>
      <Tabs
        activeTab={activeTabIndex}
        setActiveTabIndex={setActiveTabIndex}
        className="mt-6"
        tabs={[
          {
            name: 'Vendor Information',
            children: (
              <VendorInformation
                vendorAction={addVendorAction}
                inputsDefaultValue={inputsDefaultValue}
                loading={isLoading}
              />
            ),
          },

          {
            name: 'Assign Hotels',
            children: (
              <AssignHotels setActiveTabIndex={setActiveTabIndex} />
            ),
            disabled: activeTabIndex < 1,
          },
          {
            name: 'Sales Channels',
            children: <AssignSalesChannels />,
            disabled: activeTabIndex < 2,
          },
        ]}
      />
    </div>
  );
}
