import { Tabs } from 'Common';
import { useState } from 'react';

import ChannelInformation from '../SaleChannelInformation';

export default function NewSaleChannel() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <div>
      <h1 className="text-gray-900 font-medium text-3xl">
        New Sale Channel
      </h1>
      <Tabs
        activeTab={activeTabIndex}
        setActiveTabIndex={setActiveTabIndex}
        className="mt-6"
        tabs={[
          {
            children: (
              <ChannelInformation
                defaultValues={{
                  name: '',
                  currencyId: '',
                  marketId: '',
                  salesChannelPaymentTypeId: '',
                }}
              />
            ),
            name: 'Channel information',
          },
        ]}
      />
    </div>
  );
}
