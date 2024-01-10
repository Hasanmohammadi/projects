import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, Menu, Tag } from 'Common';
import { useAppContext } from 'Context';
import { useGetVendorHotelRooms } from 'Hooks/Vendors';
import { usePatchChangeRoomStatus } from 'Hooks/Vendors/VendorHotelRooms';
import { HotelInformationI } from 'Types/Vendors';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  ChevronsDown,
  Edit2,
  MoreVertical,
  Plus,
  RefreshCw,
} from 'react-feather';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import TableTreeStyledContainer from './TableTree.style';

function Row(props: { row: HotelInformationI }) {
  const [searchParams] = useSearchParams();

  const { row } = props;
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { setRoomId, setHotelId } = useAppContext();

  const { getVendorHotelRoomsAction } = useGetVendorHotelRooms({});
  const { EditChangeRoomStatusAction } = usePatchChangeRoomStatus({
    onSuccess: () => {
      getVendorHotelRoomsAction().catch((err) => console.log(err));
    },
  });

  useEffect(() => {
    if (searchParams.get('search')) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [searchParams.get('search') as string]);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <>
          <TableCell
            onClick={() => setOpen(!open)}
            className="cursor-pointer first-col"
          >
            <div className="flex">
              <IconButton
                aria-label="expand row"
                size="small"
                className="w-9 h-9 self-center"
              >
                {open ? (
                  <ChevronUp color="#98A2B3" />
                ) : (
                  <ChevronDown color="#98A2B3" />
                )}
              </IconButton>
              <div className="ml-4">
                <p className="text-gray-900">{row?.hotelName}</p>
                <span className="text-gray-500">{row?.cityName}</span>
                <span className="text-gray-500">
                  {` / ${row?.countryName as string}`}
                </span>
              </div>
            </div>
          </TableCell>
          <TableCell
            onClick={() => setOpen(!open)}
            className="cursor-pointer"
          >
            {row.stayType}
          </TableCell>
          <TableCell
            onClick={() => setOpen(!open)}
            className="cursor-pointer"
          >
            {row.active ? (
              <Tag text="Active" color="success" />
            ) : (
              <Tag text="Deactivate" color="grey" />
            )}
          </TableCell>
          <TableCell
            onClick={() => setOpen(!open)}
            className="cursor-pointer"
          >
            {' '}
          </TableCell>
          <TableCell className="cursor-pointer">
            <div className="w-full flex flex-wrap gap-2 flex-row-reverse ">
              {row.active && (
                <Link
                  to="./add-room"
                  className="flex flex-wrap gap-2  cursor-pointer pr-6 w-max"
                  onClick={() => {
                    setHotelId(row.stayId);
                  }}
                >
                  <Plus color="#FB6514" size={20} />
                  <span className="text-primary text-sm font-medium ">
                    Add room
                  </span>
                </Link>
              )}
            </div>
          </TableCell>
        </>
      </TableRow>
      <TableRow>
        <TableCell className="sub-td-container" colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box>
              <Table size="small" aria-label="purchases">
                <TableBody>
                  {row.vendorRooms?.map(
                    ({
                      id,
                      active,
                      roomName,
                      vendorName,
                      vendorHotelRoomBaseTypeName,
                    }) => (
                      <TableRow key={id}>
                        <TableCell className="sub-td first-col">
                          <div className="flex">
                            <IconButton
                              aria-label="expand row"
                              size="small"
                              className="invisible"
                            >
                              <ChevronsDown color="#98A2B3" />
                            </IconButton>
                            <div className="ml-4">
                              <p className="text-gray-900 mt-2">
                                {roomName}
                              </p>
                              <span className="text-gray-500">
                                {vendorHotelRoomBaseTypeName}
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="sub-td">
                          {/* {stayType} */}
                        </TableCell>
                        <TableCell className="sub-td">
                          {active ? (
                            <Tag text="Active" color="success" />
                          ) : (
                            <Tag text="Deactivate" color="grey" />
                          )}
                        </TableCell>
                        <TableCell className="sub-td">
                          <span className="text-sm font-normal text-gray-500">
                            {vendorName}
                          </span>
                        </TableCell>
                        <TableCell className="sub-td more ">
                          <Menu
                            items={[
                              {
                                children: (
                                  <div
                                    className="flex flex-wrap gap-4 w-36"
                                    onClick={() => setRoomId(id)}
                                    role="presentation"
                                  >
                                    <Edit2
                                      size={12}
                                      className="self-center"
                                    />
                                    <span className="text-gray-700 text-sm font-medium">
                                      Edit
                                    </span>
                                  </div>
                                ),
                                onClick: () => {
                                  setRoomId(id);
                                  navigate(
                                    `edit-room/${roomName.replaceAll(
                                      '/',
                                      ' ',
                                    )}`,
                                  );
                                  setHotelId(row.stayId);
                                },
                              },
                              {
                                children: (
                                  <div className="flex flex-wrap gap-4 w-36">
                                    <RefreshCw
                                      size={12}
                                      className="self-center"
                                    />
                                    <span className="text-gray-700 text-sm font-medium">
                                      {active ? 'Deactivate' : 'Active'}
                                    </span>
                                  </div>
                                ),
                                onClick: () =>
                                  EditChangeRoomStatusAction({
                                    roomId: id,
                                  }),
                              },
                            ]}
                          >
                            <MoreVertical
                              color="#98A2B3"
                              className="cursor-pointer "
                            />
                          </Menu>
                        </TableCell>
                      </TableRow>
                    ),
                  )}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

interface CollapsibleTablePropsI {
  colNames: string[];
  tableRows: HotelInformationI[];
  pageSize: number;
  total: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function TableTree({
  colNames,
  tableRows,
  pageSize,
  setPage,
  total,
  page,
}: CollapsibleTablePropsI) {
  const [searchParams, setSearchParams] = useSearchParams();

  const totalPage = Math.ceil(total / pageSize);

  const onNextPage = () => {
    setSearchParams({
      ...Object.fromEntries([...searchParams]),
      page: String(page + 1),
    });
  };

  const onPreviousPage = () => {
    setSearchParams({
      ...Object.fromEntries([...searchParams]),
      page: String(page - 1),
    });
  };

  useEffect(() => {
    setPage(Number(searchParams.get('page')));
    if (Number(searchParams.get('page')) > totalPage) {
      setSearchParams({
        ...Object.fromEntries([...searchParams]),
        page: String(totalPage || totalPage + 1),
      });
    }
  }, [searchParams, totalPage]);

  return (
    <TableTreeStyledContainer>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              {colNames?.map((colName: string, index: number) => (
                <>
                  <TableCell className={clsx({ 'first-col': !index })}>
                    {colName}
                  </TableCell>
                </>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableRows?.map((row) => (
              <Row key={row.stayId} row={row} />
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-between w-full px-6 py-4">
          <div className="text-gray-700 text-sm font-medium self-center">
            <span className="px-0.5">Page</span>
            <span className="px-0.5">{page}</span>
            <span className="px-0.5">of</span>
            <span className="px-0.5">{totalPage}</span>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={onPreviousPage}
              color="ghost"
              className="px-4 py-2"
              disabled={page <= 1}
            >
              Previous
            </Button>
            <Button
              onClick={onNextPage}
              color="ghost"
              className="px-3 py-2"
              disabled={page === totalPage}
            >
              Next
            </Button>
          </div>
        </div>
      </TableContainer>
    </TableTreeStyledContainer>
  );
}
