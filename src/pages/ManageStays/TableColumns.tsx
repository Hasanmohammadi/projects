import { GridColDef } from '@mui/x-data-grid/models';
import { Button, Tag } from 'Common';
import { VendorI } from 'Types/Vendors';
import { Link } from 'react-router-dom';

interface StaysColumnArgsI {
  setHotelId: (hotelId: string) => void;
}

const StaysColumn = ({ setHotelId }: StaysColumnArgsI): GridColDef[] => [
  {
    field: 'name',
    headerName: 'Name',
    width: 300,
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
    width: 110,
    filterable: false,
    editable: false,
    hideSortIcons: true,
    disableColumnMenu: true,
    renderCell: ({ row }: { row: VendorI }) => (
      <Link to={`check-stay/${row.id}`}>
        <Button onClick={() => setHotelId(row.id)}>Check</Button>
      </Link>
    ),
  },
];

export default StaysColumn;
