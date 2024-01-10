import IrsaLogo from 'Assets/image/Logo.png';
import { ListItemsI } from 'Common/List';
import { useAppContext } from 'Context';
import { LoginResultI } from 'Types/Auth';
import { RoleI } from 'Types/Auth/login';
import 'flag-icons/css/flag-icons.min.css';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import {
  Bell,
  Calendar,
  CheckSquare,
  DollarSign,
  Flag,
  Home,
  Info,
  Shield,
  Users,
} from 'react-feather';
import { Outlet, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import { List } from './Common';
import { AdminSelect, Header, Sidebar } from './Components/layout/admin';
import Container from './Components/layout/admin/container/Container';
import ProfileInfo from './Components/layout/admin/sidebar/components/ProfileInfo';

const ListItems = ({ isAdmin }: { isAdmin: boolean }): ListItemsI[] => [
  ...(isAdmin
    ? [
        {
          id: '1',
          icon: <Users />,
          text: 'Vendors Management',
          href: '/vendors-management',
        },
      ]
    : []),

  {
    id: '2',
    icon: <Info />,
    text: 'Info Management',
    href: '/info-management',
    subList: [
      {
        id: '2-1',
        text: 'Stays',
        href: '/stays',
      },
      {
        id: '2-2',
        text: 'Rooms',
        href: '/rooms',
      },
    ],
  },
  {
    id: '3',
    icon: <Flag />,
    text: 'Sales Channels',
    href: '/sales-channel',
  },
  {
    id: '4',
    icon: <CheckSquare />,
    text: 'Availability',
    href: '/availability',
  },
  {
    id: '5',
    icon: <DollarSign />,
    text: 'Price',
    href: '/price',
  },
  {
    id: '5',
    icon: <Calendar />,
    text: 'Booking',
    href: '/booking',
  },
  ...(isAdmin
    ? [
        {
          id: '6',
          icon: <Home />,
          text: 'Manage Stays',
          href: '/manage-stays',
        },
      ]
    : []),
  {
    id: '7',
    icon: <Shield />,
    text: 'Policy',
    href: '/Policy',
  },
];

function App() {
  const navigate = useNavigate();
  const { setVendorIdSelected } = useAppContext();

  const userInfo: LoginResultI = JSON.parse(
    localStorage.getItem('userInfo') as string,
  ) as LoginResultI;

  const [isAdmin] = useState(
    userInfo?.roles.some((role: RoleI) => role?.roleName === 'Admin'),
  );

  useEffect(() => {
    if (!isAdmin) {
      setVendorIdSelected(userInfo?.vendorId);
    }
  }, [isAdmin]);

  useEffect(() => {
    if (!Cookies.get('userToken')) {
      navigate('./login');
    }
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem('userInfo');
    Cookies.remove('userToken');
    navigate('./login');
  };

  return (
    <div className="flex flex-row">
      <div className="w-1/5 z-20 relative">
        <Sidebar className="px-4 py-6 flex flex-col justify-between fixed w-[inherit]">
          <div>
            <img
              src={IrsaLogo}
              alt="logo"
              className="m-auto mb-6"
              width={104}
              height={80}
            />
            <List ListItems={ListItems({ isAdmin })} />
          </div>
          <ProfileInfo
            name={userInfo?.name}
            email={userInfo?.email}
            onLogOutClick={logout}
          />
        </Sidebar>
      </div>
      <div className="w-4/5">
        <div className="h-16">
          <Header className="flex justify-between">
            {isAdmin && <AdminSelect />}
            {!isAdmin && <p>{userInfo?.name}</p>}
            <Bell
              color="#475467"
              className="self-center cursor-pointer invisible"
            />
          </Header>
        </div>
        <Container>
          <Outlet />
        </Container>
      </div>
    </div>
  );
}

export default App;
