import { Button, Search, Table } from 'Common';
import { useAppContext } from 'Context';
import { useGetVendorSalesChannels } from 'Hooks/SalesChannels';
import usePutChangeSalesChannelStatus from 'Hooks/SalesChannels/usePutChangeSalesChannelStatus';
import { useEffect, useState } from 'react';
import { Plus } from 'react-feather';
import { useForm } from 'react-hook-form';
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { toast } from 'react-toastify';

import SalesChannelsColumns from './TableColumns';

interface SalesChannelsI {
  searchRangeDate: {
    from: string;
    to: string;
  };
  salesChannelsName: string;
}

export default function SalesChannels() {
  const { vendorIdSelected } = useAppContext();

  const location = useLocation();
  const [changeStatusModal, setChangeStatusModal] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const { control, watch } = useForm<SalesChannelsI>({
    defaultValues: {
      salesChannelsName: '',
    },
  });

  const { salesChannelsName } = watch();

  useEffect(() => {
    if (!location.search) {
      navigate('/sales-channel?page=1', { replace: true });
    }
  }, [location.search, navigate]);

  const {
    vendorSalesChannelListData,
    pageSize,
    isLoading,
    getVendorSalesChannelListAction,
  } = useGetVendorSalesChannels({
    enabled: vendorIdSelected.length > 23,
    salesChannelName: searchParams.get('search') as string,
  });

  const { changeSalesChannelStatusAction } =
    usePutChangeSalesChannelStatus({
      getVendorSalesChannelListAction,
      setChangeStatusModal,
    });

  const onSearch = async () => {
    await getVendorSalesChannelListAction();

    if (!salesChannelsName) {
      searchParams.delete('search');
      setSearchParams(searchParams);
    } else {
      setSearchParams({
        page: '1',
        search: salesChannelsName,
      });
    }
  };

  useEffect(() => {
    if (vendorIdSelected?.length < 23 && !toast.isActive('chooseVendor')) {
      toast.warning('Please choose your vendor', {
        position: 'top-center',
        style: {
          width: 'max-content',
        },
        toastId: 'chooseVendor',
      });
    }
  }, [vendorIdSelected?.length]);

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-gray-900 font-medium text-3xl">
          Sales Channels
        </h1>
        <Link to="new-sale-channel">
          <Button
            color="primary"
            className="h-10"
            disabled={vendorIdSelected?.length < 23}
          >
            <>
              <Plus size={30} className="pr-3" />
              New Sale Channel
            </>
          </Button>
        </Link>
      </div>
      <div className="mt-8 w-full">
        <Search
          className="w-80"
          placeholder="Search"
          name="salesChannelsName"
          control={control}
          onEnter={onSearch}
        />
      </div>
      <Table
        columns={SalesChannelsColumns({
          changeSalesChannelStatusAction,
          changeStatusModal,
          setChangeStatusModal,
        })}
        loading={isLoading}
        pageSize={pageSize}
        rows={vendorSalesChannelListData?.data}
        total={vendorSalesChannelListData?.totalRowCount}
        className="mt-6"
        name="Sale Channel"
        emptyStateBtnLink="/sales-channel/new-sale-channel"
      />
    </>
  );
}
