import { Button, Search, Table } from 'Common';
import { useAppContext } from 'Context';
import { useGetVendorsTable } from 'Hooks/Vendors';
import usePutChangeVendorStatus from 'Hooks/Vendors/usePutChangeVendorStatus';
import { VendorI } from 'Types/Vendors';
import { useEffect } from 'react';
import { Plus } from 'react-feather';
import { useForm } from 'react-hook-form';
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

import VendorsManagementColumns from './TableColumns';

interface VendorsManagementInputsI {
  searchRangeDate: {
    from: string;
    to: string;
  };
  vendorName: string;
}

export default function VendorsManagement() {
  const { setVendorManagementId } = useAppContext();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { changeVendorStatusAction } = usePutChangeVendorStatus();
  const navigate = useNavigate();

  const { control, watch } = useForm<VendorsManagementInputsI>({
    defaultValues: {
      searchRangeDate: {
        from: '',
        to: '',
      },
      vendorName: searchParams.get('search')
        ? (searchParams.get('search') as string)
        : '',
    },
  });

  const { vendorName } = watch();

  const {
    vendorsTableData,
    pageSize,
    error,
    getVendorsTableAction,
    isLoading,
  } = useGetVendorsTable({
    vendorName: searchParams.get('search') as string,
  });

  useEffect(() => {
    if (!location.search) {
      navigate('/vendors-management?page=1', { replace: true });
    }
  }, []);

  const onSearch = async () => {
    await getVendorsTableAction();

    if (!vendorName) {
      searchParams.delete('search');
      setSearchParams(searchParams);
    } else {
      setSearchParams({
        page: '1',
        search: vendorName,
      });
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-gray-900 font-medium text-3xl">
          Vendors Management
        </h1>
        <Link to="new-vendor">
          <Button color="primary" className="py-3 px-4 h-10">
            <div className="flex flex-wrap gap-2">
              <Plus size={20} className="self-center" />
              New Vendor
            </div>
          </Button>
        </Link>
      </div>
      <div className="mt-8 w-full">
        <Search
          className="w-80"
          placeholder="Search"
          name="vendorName"
          control={control}
          onEnter={onSearch}
        />
      </div>

      <div className="mt-6">
        {error ? (
          <div className="w-full flex m-auto text-red-700">
            {error?.message}
          </div>
        ) : (
          <Table
            rows={vendorsTableData?.data as VendorI[]}
            columns={VendorsManagementColumns({
              changeVendorStatusAction,
              setVendorManagementId,
              navigate,
            })}
            total={vendorsTableData?.totalRowCount as number}
            pageSize={pageSize}
            loading={isLoading}
            name="Vendor"
            emptyStateBtnLink="/vendors-management/new-vendor"
          />
        )}
      </div>
    </>
  );
}
