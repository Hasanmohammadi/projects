import { GridColDef } from '@mui/x-data-grid/models';
import { Switch } from 'Common';
import { SalesChannelI } from 'Types/SalesChannels';
import { NullResultI } from 'Types/Vendors';
import { Edit2 } from 'react-feather';
import { UseMutateFunction } from 'react-query';
import { Link, Params } from 'react-router-dom';

interface SalesChannelsColumnsArgsI {
  changeSalesChannelStatusAction: UseMutateFunction<
    NullResultI,
    unknown,
    {
      salesChannelId: string | Readonly<Params<string>>;
    },
    unknown
  >;
  setChangeStatusModal: React.Dispatch<React.SetStateAction<boolean>>;
  changeStatusModal: boolean;
}

const SalesChannelsColumns = ({
  changeSalesChannelStatusAction,
  changeStatusModal,
  setChangeStatusModal,
}: SalesChannelsColumnsArgsI): GridColDef[] => [
  {
    field: 'name',
    headerName: 'Sales Channels',
    width: 320,
    disableColumnMenu: true,
  },
  {
    field: 'marketName',
    headerName: 'Market',
    width: 260,
    disableColumnMenu: true,
  },
  {
    field: 'currencyName',
    headerName: 'Currency',
    width: 260,
    disableColumnMenu: true,
    renderCell: ({ row }: { row: SalesChannelI }) => (
      <>{row.currency.name}</>
    ),
  },
  {
    field: ' ',
    headerName: ' ',
    width: 170,
    filterable: false,
    editable: false,
    hideSortIcons: true,
    disableColumnMenu: true,
    renderCell: ({ row }: { row: SalesChannelI }) => (
      <div className="flex gap-4 justify-end w-full items-center">
        <Link to={`edit-sale-channel/${row.id}`}>
          <Edit2 size={20} className="cursor-pointer" />
        </Link>
        <Switch
          checked={row?.isActive}
          confirmModalTitle="Are you sure ?"
          hasConfirm
          onConfirm={() =>
            changeSalesChannelStatusAction({ salesChannelId: row.id })
          }
          disabled={row.createdBySystem}
        />
      </div>
    ),
  },
];

export default SalesChannelsColumns;
