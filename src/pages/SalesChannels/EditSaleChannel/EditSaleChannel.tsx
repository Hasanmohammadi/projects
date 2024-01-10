import { EditVendorLoading, Tabs } from 'Common';
import { useAppContext } from 'Context';
import { useGetSaleChannel } from 'Hooks/SalesChannels';
import { useState } from 'react';
import { Params, useParams } from 'react-router-dom';

import SaleChannelInformation from '../SaleChannelInformation';

export default function EditSaleChannel() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const { vendorIdSelected } = useAppContext();
  const { salesChannelId }: { salesChannelId?: Readonly<Params<string>> } =
    useParams();

  const { saleChannelData, isLoading } = useGetSaleChannel({
    salesChannelId: salesChannelId as Readonly<Params<string>>,
    vendorId: vendorIdSelected,
  });

  return (
    <div>
      <h1 className="text-gray-900 font-medium text-3xl">
        Edit Sale Channel
      </h1>

      {isLoading ? (
        <EditVendorLoading />
      ) : (
        <Tabs
          activeTab={activeTabIndex}
          setActiveTabIndex={setActiveTabIndex}
          className="mt-6"
          tabs={[
            {
              children: (
                <SaleChannelInformation
                  salesChannelId={salesChannelId}
                  editMode
                  defaultValues={{
                    name: saleChannelData?.name,
                    currencyId: saleChannelData?.currency.id,
                    marketId: saleChannelData?.market.id,
                    salesChannelPaymentTypeId:
                      saleChannelData?.paymentTypeId,
                  }}
                />
              ),
              name: 'Channel information',
            },
          ]}
        />
      )}
    </div>
  );
}
