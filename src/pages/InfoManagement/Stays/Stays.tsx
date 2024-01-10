import ButtonGroup from '@mui/material/ButtonGroup';
import { Button, Modal, Search, Table } from 'Common';
import { useAppContext } from 'Context';
import {
  useGetStayTypeList,
  usePostAddBaseHotel,
  usePostAddVendorStays,
} from 'Hooks/Stay';
import usePatchChangeStayStatus from 'Hooks/Stay/usePatchChangeStayStatus';
import { useGetVendorHotels } from 'Hooks/Vendors';
import { VendorHotelsI } from 'Types/Vendors/vendors';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Plus } from 'react-feather';
import { useForm } from 'react-hook-form';
import {
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { toast } from 'react-toastify';

import { NewStayModal } from './NewStay';
import StaysColumn from './TableColumns';

interface StayInputsI {
  hotelName: string;
}

export default function Stays() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterTypeId, setFilterTypeId] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { stayTypeList } = useGetStayTypeList();
  const { vendorIdSelected, setHotelId } = useAppContext();
  const navigate = useNavigate();

  const {
    vendorsHotelsData,
    getVendorsHotelsAction,
    pageSize,
    getVendorHotelLoading,
  } = useGetVendorHotels({
    pageSize: 6,
    hotelName: searchParams.get('search') as string,
    filterTypeId,
  });
  const { changeStayStatusAction } = usePatchChangeStayStatus({
    onSuccess: () => {
      getVendorsHotelsAction().catch((err) => console.log(err));
    },
  });

  const { addVendorStaysAction } = usePostAddVendorStays({});
  const { addBaseHotelAction } = usePostAddBaseHotel({
    onSuccess: ({ stayId }) =>
      addVendorStaysAction({
        stayIds: [stayId],
        vendorId: vendorIdSelected,
        addMode: true,
      }),
  });

  const { control, watch } = useForm<StayInputsI>({
    defaultValues: {
      hotelName: searchParams.get('search')
        ? (searchParams.get('search') as string)
        : '',
    },
  });

  const { hotelName } = watch();

  useEffect(() => {
    if (!location.search) {
      navigate('/stays?page=1&filter=all', { replace: true });
    }
  }, [location.search, navigate]);

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

  useEffect(() => {
    const type = stayTypeList?.data?.find(
      ({ name }) => name === searchParams.get('filter'),
    );

    setFilterTypeId(type?.id as string);
  }, [searchParams.get('filter')]);

  const onSearch = async () => {
    await getVendorsHotelsAction();

    if (!hotelName) {
      searchParams.delete('search');
      setSearchParams(searchParams);
    } else {
      setSearchParams({
        ...Object.fromEntries([...searchParams]),
        page: '1',
        search: hotelName,
      });
    }
  };

  const changeStatus = (stayId: string) => {
    changeStayStatusAction({ stayId });
  };

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-gray-900 font-medium text-3xl">Stays</h1>
        <Button
          color="primary"
          onClick={() => setModalIsOpen(true)}
          className="h-10"
          disabled={vendorIdSelected?.length < 23}
        >
          <>
            <Plus className="mr-2" />
            New Stay
          </>
        </Button>
      </div>
      <ButtonGroup
        variant="contained"
        className="mt-6"
        aria-label="outlined primary button group"
        style={{ boxShadow: 'none' }}
      >
        <Button
          key={0}
          color="ghost"
          className={clsx('first-btn-gp', {
            'btn-gp-active': searchParams.get('filter') === 'all',
          })}
          onClick={() => {
            setFilterTypeId('');
            setSearchParams({
              ...Object.fromEntries([...searchParams]),
              filter: 'all',
            });
          }}
        >
          All Rooms
        </Button>
        {stayTypeList?.data?.map(({ id, name }, index) => (
          <Button
            key={id}
            color="ghost"
            className={clsx('', {
              'btn-gp-active': searchParams.get('filter') === name,
              'last-btn-gp': stayTypeList?.data?.length - 1 === index,
              'btn-gp': !(stayTypeList?.data?.length - 1 === index),
            })}
            onClick={() => {
              setFilterTypeId(id);
              setSearchParams({
                ...Object.fromEntries([...searchParams]),
                filter: name,
              });
            }}
          >
            {name}
          </Button>
        ))}
      </ButtonGroup>
      <div className="mt-8 w-full">
        <Search
          className="w-80 h-11"
          placeholder="Search"
          name="hotelName"
          control={control}
          onEnter={onSearch}
        />
      </div>
      <div className="mt-6">
        <Table
          rows={vendorsHotelsData?.data as VendorHotelsI[]}
          columns={StaysColumn({ setHotelId, changeStatus, navigate })}
          total={vendorsHotelsData?.totalRowCount as number}
          pageSize={pageSize}
          loading={getVendorHotelLoading}
          name="Stays"
          emptyStateBtnLink=""
        />
      </div>
      <Modal open={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        <NewStayModal
          onContinue={(radioValue) => {
            addBaseHotelAction({ StayTypeId: radioValue.value });
          }}
          onCancel={() => setModalIsOpen(false)}
        />
      </Modal>
    </>
  );
}
