import { Button, Checkbox, Search } from 'Common';
import { useAppContext } from 'Context';
import { useGetStaysList, usePostAddVendorStays } from 'Hooks/Stay';
import { StaysI } from 'Types/Stay/stay';
import { VendorInfoI } from 'Types/Vendors';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from 'react-query';
import { useNavigate } from 'react-router-dom';

interface AssignHotelsPropsI {
  setActiveTabIndex?: React.Dispatch<React.SetStateAction<number>>;
  vendorHotels?: { name: string; id: string }[];
  getVendorAction?: <TPageData>(
    options?:
      | (RefetchOptions & RefetchQueryFilters<TPageData>)
      | undefined,
  ) => Promise<QueryObserverResult<VendorInfoI, Error>>;
}

export default function AssignHotels({
  setActiveTabIndex,
  vendorHotels,
  getVendorAction,
}: AssignHotelsPropsI) {
  const [stayIds, setStayIds] = useState<string[]>([]);
  const [stays, setStays] = useState<StaysI[]>([]);

  const navigate = useNavigate();

  const { control, watch } = useForm({ defaultValues: { search: '' } });

  const { search } = watch();

  const { vendorManagementId } = useAppContext();

  const { staysListData, isLoading, getStayListAction } = useGetStaysList({
    pageSize: 30,
    stayName: search,
    enabled: false,
    isActive: true,
  });

  const { addVendorStaysAction } = usePostAddVendorStays({
    setActiveTabIndex,
    onSuccess: () => {
      if (getVendorAction) {
        getVendorAction().catch((err) => console.log(err));
      }
    },
  });

  const removeId = (id: string) => {
    const x = [...stayIds];
    const y = x.filter((propertyId) => propertyId !== id);
    setStayIds(y);
  };

  useEffect(() => {
    setStays(staysListData?.data);
  }, [staysListData]);

  useEffect(() => {
    if (vendorHotels) {
      setStayIds(vendorHotels?.map(({ id }) => id));
    }
  }, [vendorHotels]);

  useEffect(() => {
    getStayListAction().catch((err) => console.log(err));
  }, [search]);

  const onSubmit = () => {
    addVendorStaysAction({
      stayIds,
      vendorId: vendorManagementId,
      addMode: false,
    });
  };

  return (
    <div className="pb-7">
      <div className="mt-6 flex justify-between w-full border-b border-b-gray-200 pb-5">
        <div>
          <p className="text-lg font-medium text-gray-900">
            Assign Hotels
          </p>
        </div>
        <div className="flex flex-wrap flex-row-reverse mt-4 gap-3">
          <Button
            color="primary"
            className="h-10 px-4"
            type="submit"
            onClick={onSubmit}
          >
            <div className="flex flex-wrap gap-2">Save and Next</div>
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

      <Search
        control={control}
        name="search"
        placeholder="Search hotel by name"
        className="w-80 mt-6"
      />

      <div className="p-6 bg-white mt-6 border border-gray-200 rounded-lg shadow-sm">
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <div className="grid grid-cols-3 gap-4">
              {!search &&
                vendorHotels?.map(({ name, id }) => (
                  <>
                    <Checkbox
                      key={id}
                      label={name}
                      onChecked={() => {
                        if (!stayIds.includes(id)) {
                          setStayIds((pre) => [...pre, id]);
                        }
                      }}
                      onUnChecked={() => removeId(id)}
                      checked={stayIds.includes(id)}
                    />
                  </>
                ))}
            </div>
            <div className="grid grid-cols-3 gap-4">
              {!!search &&
                stays
                  ?.filter(({ active }) => active)
                  ?.map(({ name, id }) => (
                    <>
                      <Checkbox
                        key={id}
                        label={name}
                        onChecked={() => {
                          if (!stayIds.includes(id)) {
                            setStayIds((pre) => [...pre, id]);
                          }
                        }}
                        onUnChecked={() => removeId(id)}
                        checked={stayIds.includes(id)}
                      />
                    </>
                  ))}
            </div>
          </>
        )}
      </div>
      <div className="flex flex-wrap flex-row-reverse mt-6 pt-4 gap-3 border-t border-t-gray-200  ">
        <Button
          color="primary"
          className="h-10 px-4"
          type="submit"
          onClick={() => onSubmit()}
        >
          <div className="flex flex-wrap gap-2">Save and Next</div>
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
