import { yupResolver } from '@hookform/resolvers/yup';
import { MenuItem } from '@mui/material';
import { Button, Input, Select } from 'Common';
import { useAppContext } from 'Context';
import { newSaleChannelSchema } from 'FormValidation';
import { useGetCurrencyList } from 'Hooks/Market';
import useGetMarketList from 'Hooks/Market/useGetMarketList';
import {
  useGetSalesChannelPaymentTypeList,
  usePostAddNewSalesChannel,
  usePutEditSalesChannel,
} from 'Hooks/SalesChannels';
import { CurrencyI } from 'Types/Market';
import { MarketI } from 'Types/Market/Market';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Params, useNavigate } from 'react-router-dom';

interface SaleChannelInformationI {
  name: string;
  currencyId: string;
  marketId: string;
  salesChannelPaymentTypeId: string;
}

export interface SaleChannelInformationPropsI {
  defaultValues: SaleChannelInformationI;
  editMode?: boolean;
  salesChannelId?: Readonly<Params<string>>;
}

export default function SaleChannelInformation({
  defaultValues,
  editMode,
  salesChannelId,
}: SaleChannelInformationPropsI) {
  const navigate = useNavigate();
  const { vendorIdSelected } = useAppContext();
  const { editSalesChannelAction } = usePutEditSalesChannel();

  useEffect(() => {
    if (vendorIdSelected.length < 23) {
      navigate('/sales-channel');
    }
  }, [navigate, vendorIdSelected.length]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SaleChannelInformationI>({
    defaultValues,
    resolver: yupResolver(newSaleChannelSchema),
  });

  const { currencyListData } = useGetCurrencyList();
  const { marketListData } = useGetMarketList();
  const { addNewSalesChannelAction } = usePostAddNewSalesChannel();
  const { salesChannelPaymentTypeListData } =
    useGetSalesChannelPaymentTypeList();

  const onSubmit: SubmitHandler<SaleChannelInformationI> = (data) => {
    if (editMode) {
      editSalesChannelAction({
        currencyId: data.currencyId,
        marketId: data.marketId,
        paymentTypeId: data.salesChannelPaymentTypeId,
        name: data.name,
        vendorId: vendorIdSelected,
        salesChannelId: salesChannelId as Readonly<Params<string>>,
      });
    } else {
      addNewSalesChannelAction({ ...data, vendorId: vendorIdSelected });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-6 flex justify-between w-full">
        <div>
          <p className="text-lg font-medium text-gray-900">
            Sale Channel Information
          </p>
        </div>
      </div>
      <div className="py-6 mt-5 border-t border-t-gray-200 flex flex-wrap gap-8">
        <p className="font-medium text-sm text-gray-700 flex w-72">
          General information
        </p>
        <div className="w-[512px]">
          <Input
            control={control}
            name="name"
            placeholder="Enter Name"
            className="w-full min-w-[300px] h-11"
            label="Channel Name"
            errorMessage={errors.name?.message}
          />
          <div className="mt-11 w-full flex justify-between gap-6">
            <Select
              control={control}
              name="currencyId"
              label="Currency"
              className="w-full h-11"
              containerClassName="w-full"
              errorMessage={errors.currencyId?.message}
            >
              <MenuItem value="" disabled>
                <span className="text-sm text-gray-400">
                  Select Currency
                </span>
              </MenuItem>
              {currencyListData?.map(({ name, id }: CurrencyI) => (
                <MenuItem key={id} value={id}>
                  {name}
                </MenuItem>
              ))}
            </Select>
            <Select
              control={control}
              name="marketId"
              label="Market"
              className="w-full h-11"
              containerClassName="w-full"
              errorMessage={errors.marketId?.message}
            >
              <MenuItem value="" disabled>
                <span className="text-sm text-gray-400">
                  Select Market
                </span>
              </MenuItem>
              {marketListData?.map(({ marketName, marketId }: MarketI) => (
                <MenuItem key={marketId} value={marketId}>
                  {marketName}
                </MenuItem>
              ))}
            </Select>
          </div>
        </div>
        <div> </div>
      </div>
      <div className="pt-6 pb-4 mt-2 border-t border-t-gray-200 flex flex-wrap gap-8">
        <p className="font-medium text-sm text-gray-700 flex w-72">
          Policy
        </p>
        <Select
          control={control}
          name="salesChannelPaymentTypeId"
          label="Payment type"
          className="w-60 h-11"
          errorMessage={errors.salesChannelPaymentTypeId?.message}
        >
          <MenuItem value="" disabled>
            <span className="text-sm text-gray-400">
              Select Payment Type
            </span>
          </MenuItem>
          {salesChannelPaymentTypeListData?.data?.map(({ id, name }) => (
            <MenuItem key={id} value={id}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </div>
      <div className="flex flex-wrap flex-row-reverse mt-4 gap-3 border-t border-t-gray-200 pt-4">
        <Button color="primary" className="h-10 px-4" type="submit">
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
    </form>
  );
}
