import { NewVendor } from 'Components/Pages';
import EditVendor from 'Components/Pages/VendorsManagement/EditVendor/EditVendor';
import {
  CheckStay,
  EditSaleChannel,
  Login,
  ManageStays,
  NewStay,
  Policy,
  Rooms,
  Stays,
} from 'Pages';
import ForgotPassword from 'Pages/Auth/ForgotPassword';
import Availability from 'Pages/Availability';
import BookingRoom from 'Pages/Booking/BookingRoom';
import AddRoom from 'Pages/InfoManagement/Rooms/AddRoom/AddRoom';
import { Price } from 'Pages/Price';
import SalesChannels, { NewSaleChannel } from 'Pages/SalesChannels';
import VendorsManagement from 'Pages/vendorsManagement';
import { createBrowserRouter } from 'react-router-dom';

import App from '../App';

export default createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'manage-stays',
        element: <ManageStays />,
      },
      {
        path: 'manage-stays/check-stay/:stay',
        element: <CheckStay />,
      },
      {
        path: 'stays',
        element: <Stays />,
      },
      {
        path: 'stays/add/:stay',
        element: <NewStay />,
      },
      {
        path: 'stays/edit-stay/:stay',
        element: <NewStay />,
      },
      {
        path: 'rooms',
        element: <Rooms />,
      },
      {
        path: 'rooms/edit-room/:room',
        element: <AddRoom />,
      },
      {
        path: 'rooms/add-room',
        element: <AddRoom />,
      },
      {
        path: 'sales-channel',
        element: <SalesChannels />,
      },
      {
        path: 'sales-channel/edit-sale-channel/:salesChannelId',
        element: <EditSaleChannel />,
      },
      {
        path: 'sales-channel/new-sale-channel',
        element: <NewSaleChannel />,
      },
      {
        path: 'availability',
        element: <Availability />,
      },
      {
        path: 'price',
        element: <Price />,
      },
      {
        path: 'vendors-management',
        element: <VendorsManagement />,
      },
      {
        path: '/vendors-management/new-vendor',
        element: <NewVendor />,
      },
      {
        path: '/vendors-management/edit-vendor',
        element: <EditVendor />,
      },
      {
        path: '/booking',
        element: <BookingRoom />,
      },
      { path: '/policy', element: <Policy /> },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/forgot-password', element: <ForgotPassword /> },
]);
