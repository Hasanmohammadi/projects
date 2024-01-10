import { Button, Checkbox, Search } from 'Common';
import { useAppContext } from 'Context';
import { useGetSalesChannelsList } from 'Hooks/SalesChannels';
import usePostAddVendorSalesChannel from 'Hooks/SalesChannels/usePostAddVendorSalesChannel';
import { SalesChannelI } from 'Types/SalesChannels';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

interface FacilitiesPropsI {
  vendorSalesChannel?: { name: string; id: string }[];
}

export default function AssignSalesChannels({
  vendorSalesChannel,
}: FacilitiesPropsI) {
  const [salesChannelIds, setSalesChannelIds] = useState<string[]>([]);
  const [salesChannel, setSalesChannel] = useState<SalesChannelI[]>([]);

  const navigate = useNavigate();

  const { vendorManagementId } = useAppContext();

  const { salesChannelListData, isLoading } = useGetSalesChannelsList({
    pageDataSize: 1000,
  });

  const removeId = (id: string) => {
    const x = [...salesChannelIds];
    const y = x.filter((propertyId) => propertyId !== id);
    setSalesChannelIds(y);
  };

  const { control, watch } = useForm({ defaultValues: { search: '' } });

  const { search } = watch();

  const { addVendorSalesChannelAction } = usePostAddVendorSalesChannel();

  useEffect(() => {
    setSalesChannel(salesChannelListData?.data);
  }, [salesChannelListData?.data]);

  useEffect(() => {
    if (vendorSalesChannel) {
      setSalesChannelIds(vendorSalesChannel?.map(({ id }) => id));
    }
  }, [vendorSalesChannel]);

  useEffect(() => {
    if (salesChannelListData?.data && salesChannelListData?.data[0]) {
      const x = [...salesChannelListData?.data];
      const y = x.filter(({ name }) =>
        name?.toLocaleUpperCase().includes(search?.toLocaleUpperCase()),
      );
      setSalesChannel(y);
    }
  }, [search]);

  const onSubmit = () => {
    addVendorSalesChannelAction({
      salesChannelIds,
      vendorId: vendorManagementId,
    });
  };

  return (
    <div className="pb-7">
      <div className="mt-6 flex justify-between w-full border-b border-b-gray-200 pb-5">
        <div>
          <p className="text-lg font-medium text-gray-900">
            Assign Sales Channels
          </p>
        </div>
        <div className="flex flex-wrap flex-row-reverse mt-4 gap-3">
          <Button
            color="primary"
            className="h-10 px-4"
            type="submit"
            onClick={onSubmit}
          >
            <div className="flex flex-wrap gap-2">Save</div>
          </Button>
          <Button
            color="ghost"
            className="h-10 px-4"
            onClick={() => navigate(-1)}
          >
            <div className="flex flex-wrap gap-2">Cancel</div>
          </Button>
        </div>
      </div>

      <Search control={control} name="search" className="w-80 mt-6" />

      <div className="p-6 bg-white mt-6 border border-gray-200 rounded-lg shadow-sm">
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {salesChannel?.map(({ name, id, createdBySystem }) => (
              <>
                <Checkbox
                  disable={createdBySystem}
                  key={id}
                  label={name}
                  onChecked={() => {
                    if (!salesChannelIds.includes(id)) {
                      setSalesChannelIds((pre) => [...pre, id]);
                    }
                  }}
                  onUnChecked={() => removeId(id)}
                  checked={
                    createdBySystem ? true : salesChannelIds.includes(id)
                  }
                />
              </>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-wrap flex-row-reverse mt-6 pt-4 gap-3 border-t border-t-gray-200  ">
        <Button
          color="primary"
          className="h-10 px-4"
          type="submit"
          onClick={() => onSubmit()}
        >
          <div className="flex flex-wrap gap-2">Save</div>
        </Button>
        <Button
          color="ghost"
          className="h-10 px-4"
          onClick={() => navigate(-1)}
        >
          <div className="flex flex-wrap gap-2">Cancel</div>
        </Button>
      </div>
    </div>
  );
}
