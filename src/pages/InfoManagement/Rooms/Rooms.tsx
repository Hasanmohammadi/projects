import ButtonGroup from '@mui/material/ButtonGroup';
import {
  Button,
  RadioButton,
  Search,
  TableLoading,
  TableTree,
} from 'Common';
import { useAppContext } from 'Context';
import { useGetHotelRoomBaseTypeList } from 'Hooks/Vendors/VendorHotelRooms';
import useGetVendorHotelRooms from 'Hooks/Vendors/useGetVendorHotelRooms';
import { HotelInformationI } from 'Types/Vendors';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { toast } from 'react-toastify';

interface VendorsManagementInputsI {
  searchRangeDate: {
    from: string;
    to: string;
  };
  vendorName: string;
}

export default function Stays() {
  const { vendorIdSelected } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterTypeId, setFilterTypeId] = useState('');
  const [searchAt, setSearchAt] = useState<'roomName' | 'stayName'>(
    'roomName',
  );
  console.log('🚀 ~ file: Rooms.tsx:40 ~ Stays ~ searchAt:', searchAt);

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
    vendorHotelRoomsData,
    isLoading,
    setPage,
    pageSize,
    page,
    getVendorHotelRoomsAction,
  } = useGetVendorHotelRooms({
    name: searchParams.get('search') as string,
    filterHotelRoomTypeId: filterTypeId,
    tableMode: true,
    searchAt,
  });

  const { hotelRoomBaseTypeListData } = useGetHotelRoomBaseTypeList();

  useEffect(() => {
    if (!location.search) {
      navigate('/rooms?page=1&filter=all', { replace: true });
    }
  }, []);

  useEffect(() => {
    if (vendorIdSelected.length < 23 && !toast.isActive('chooseVendor')) {
      toast.warning('Please choose your vendor', {
        position: 'top-center',
        style: {
          width: 'max-content',
        },
        toastId: 'chooseVendor',
      });
    }
  }, [vendorIdSelected.length]);

  useEffect(() => {
    const type = hotelRoomBaseTypeListData?.find(
      ({ name }) => name === searchParams.get('filter'),
    );

    setFilterTypeId(type?.id as string);
  }, [searchParams.get('filter')]);

  const onSearch = async () => {
    await getVendorHotelRoomsAction();

    if (!vendorName) {
      searchParams.delete('search');
      setSearchParams(searchParams);
    } else {
      setSearchParams({
        ...Object.fromEntries([...searchParams]),
        page: '1',
        search: vendorName,
      });
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-gray-900 font-medium text-3xl">Rooms</h1>
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
        {hotelRoomBaseTypeListData?.map(({ id, name }, index) => (
          <Button
            key={id}
            color="ghost"
            className={clsx('', {
              'btn-gp-active': searchParams.get('filter') === name,
              'last-btn-gp':
                hotelRoomBaseTypeListData.length - 1 === index,
              'btn-gp': !(hotelRoomBaseTypeListData.length - 1 === index),
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
      {isLoading && <TableLoading />}
      {!isLoading && !(vendorIdSelected.length < 23) && (
        <>
          <div className="mt-16 mb-8 w-full flex">
            <RadioButton
              defaultValue="roomName"
              direction="row"
              onChange={(_, value) =>
                setSearchAt(value as 'roomName' | 'stayName')
              }
              radios={[
                { radioText: 'Room', value: 'roomName' },
                { radioText: 'Stay', value: 'stayName' },
              ]}
            />
            <Search
              className="w-80 h-11"
              placeholder={
                searchAt === 'roomName'
                  ? 'Search with room name'
                  : 'Search with stays name'
              }
              name="vendorName"
              control={control}
              onEnter={onSearch}
            />
          </div>
          <div className="mt-6">
            <TableTree
              page={page}
              pageSize={pageSize}
              total={vendorHotelRoomsData?.totalRowCount as number}
              setPage={setPage}
              colNames={['Name', 'Stay type', 'State', 'vendor', '']}
              tableRows={vendorHotelRoomsData?.data as HotelInformationI[]}
            />
          </div>
        </>
      )}
    </>
  );
}
