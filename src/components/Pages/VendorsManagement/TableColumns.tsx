import { GridCellParams, GridColDef } from '@mui/x-data-grid/models';
import { Menu, Tag } from 'Common';
import { convertDateToTableFormat } from 'Helpers';
import { NullResultI, VendorI } from 'Types/Vendors';
import { Edit2, MoreVertical, RefreshCw } from 'react-feather';
import { UseMutateFunction } from 'react-query';
import { NavigateFunction, Params } from 'react-router-dom';

interface VendorsManagementColumnsArgsI {
  changeVendorStatusAction: UseMutateFunction<
    NullResultI,
    unknown,
    {
      id: string | Readonly<Params<string>>;
    },
    unknown
  >;
  setVendorManagementId: (vendorId: string) => void;
  navigate: NavigateFunction;
}

const VendorsManagementColumns = ({
  changeVendorStatusAction,
  setVendorManagementId,
  navigate,
}: VendorsManagementColumnsArgsI): GridColDef[] => [
  {
    field: 'name',
    headerName: 'Name',
    width: 300,
    disableColumnMenu: true,
  },
  {
    field: 'startDate',
    headerName: 'Start Date',
    width: 180,
    renderCell: (params: GridCellParams) => (
      <span>{convertDateToTableFormat(params?.value as string)}</span>
    ),
    disableColumnMenu: true,
  },
  {
    field: 'expireDate',
    headerName: 'Expire Date',
    width: 180,
    renderCell: (params: GridCellParams) => (
      <span>{convertDateToTableFormat(params?.value as string)}</span>
    ),
    disableColumnMenu: true,
  },
  {
    field: 'active',
    headerName: 'Status',
    width: 180,
    renderCell: ({ value }) => (
      <>
        {value ? (
          <Tag text="Active" color="success" />
        ) : (
          <Tag text="Deactivate" color="grey" />
        )}
      </>
    ),
    disableColumnMenu: true,
  },
  {
    field: ' ',
    headerName: ' ',
    width: 70,
    filterable: false,
    editable: false,
    hideSortIcons: true,
    disableColumnMenu: true,
    renderCell: ({ row }: { row: VendorI }) => (
      <Menu
        items={[
          {
            children: (
              <div className="flex flex-wrap gap-4 w-36">
                <Edit2 size={12} className="self-center" />
                <span className="text-gray-700 text-sm font-medium">
                  Edit
                </span>
              </div>
            ),
            onClick: () => {
              setVendorManagementId(row.id);
              navigate('edit-vendor');
            },
          },
          {
            children: (
              <div className="flex flex-wrap gap-4 w-36">
                <RefreshCw size={12} className="self-center" />
                <span className="text-gray-700 text-sm font-medium">
                  {row.active ? 'Deactivate' : 'Active'}
                </span>
              </div>
            ),
            onClick: () => changeVendorStatusAction({ id: row.id }),
          },
        ]}
      >
        <MoreVertical color="#98A2B3" className="cursor-pointer " />
      </Menu>
    ),
  },
];

export default VendorsManagementColumns;
