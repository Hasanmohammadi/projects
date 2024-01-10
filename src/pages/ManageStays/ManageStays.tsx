import ButtonGroup from '@mui/material/ButtonGroup';
import { Button, Search, Table } from 'Common';
import { useAppContext } from 'Context';
import { useGetStayTypeList, useGetStaysList } from 'Hooks/Stay';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

import StaysColumn from './TableColumns';

interface StayInputsI {
  hotelName: string;
}

export default function ManageStays() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterTypeId, setFilterTypeId] = useState('');
  const { stayTypeList } = useGetStayTypeList();
  const { setHotelId } = useAppContext();
  const navigate = useNavigate();

  const { staysListData, isLoading, getStayListAction } = useGetStaysList({
    pageSize: 6,
    stayName: searchParams.get('search') as string,
    filterTypeId,
    isActive: false,
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
      navigate('/manage-stays?page=1&filter=all', { replace: true });
    }
  }, [location.search, navigate]);

  useEffect(() => {
    const type = stayTypeList?.data?.find(
      ({ name }) => name === searchParams.get('filter'),
    );

    setFilterTypeId(type?.id as string);
  }, [searchParams.get('filter')]);

  const onSearch = async () => {
    await getStayListAction();

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

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-gray-900 font-medium text-3xl">
          Manage Stays
        </h1>
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
          All Stays
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
          rows={staysListData?.data}
          columns={StaysColumn({ setHotelId })}
          total={staysListData?.totalRowCount}
          pageSize={6}
          loading={isLoading}
          name="Deactivate stays"
          emptyStateBtnLink="#"
          hasEmptyStateBtn={false}
        />
      </div>
    </>
  );
}
