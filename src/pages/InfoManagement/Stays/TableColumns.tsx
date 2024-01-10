import { GridColDef } from '@mui/x-data-grid/models';
import { Menu, Tag } from 'Common';
import { VendorI } from 'Types/Vendors';
import { Edit2, MoreVertical } from 'react-feather';
import { NavigateFunction } from 'react-router-dom';

interface StaysColumnArgsI {
  setHotelId: (hotelId: string) => void;
  changeStatus: (stayId: string) => void;
  navigate: NavigateFunction;
}

const StaysColumn = ({
  setHotelId,
  navigate,
}: StaysColumnArgsI): GridColDef[] => [
  {
    field: 'hotelNote',
    headerName: 'Name',
    width: 350,
    disableColumnMenu: true,
  },
  {
    field: 'stayTypeName',
    headerName: 'Stay type',
    width: 200,
    disableColumnMenu: true,
  },
  {
    field: 'active',
    headerName: 'State',
    width: 200,
    renderCell: ({ value }) => (
      <>
        {value ? (
          <Tag text="Active" color="success" />
        ) : (
          <Tag text="Pending" color="grey" />
        )}
      </>
    ),
    disableColumnMenu: true,
  },
  {
    field: 'phone',
    headerName: 'Phone',
    width: 200,
    disableColumnMenu: true,
  },
  {
    field: ' ',
    headerName: ' ',
    width: 60,
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
              setHotelId(row.id);
              navigate(`edit-stay/${row.id}`);
            },
          },
        ]}
      >
        <MoreVertical color="#98A2B3" className="cursor-pointer " />
      </Menu>
    ),
  },
];

export default StaysColumn;
