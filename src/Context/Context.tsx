/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useContext, useMemo, useState } from 'react';

const Context = createContext({
  vendorIdSelected: '',
  vendorManagementId: '',
  setVendorIdSelected: (vendorId: string) => {},
  setVendorManagementId: (vendorId: string) => {},
  roomId: '',
  setRoomId: (roomId: string) => {},
  hotelId: '',
  setHotelId: (hotelId: string) => {},
});

interface ContextContainerPropsI {
  children: React.ReactElement;
}

export default function ContextContainer({
  children,
}: ContextContainerPropsI) {
  const [vendorIdSelected, setVendorIdSelected] = useState('');
  const [vendorManagementId, setVendorManagementId] = useState('');
  const [roomId, setRoomId] = useState('');
  const [hotelId, setHotelId] = useState('');
  const value = useMemo(
    () => ({
      vendorIdSelected,
      setVendorIdSelected,
      roomId,
      setRoomId,
      hotelId,
      setHotelId,
      vendorManagementId,
      setVendorManagementId,
    }),
    [hotelId, roomId, vendorIdSelected, vendorManagementId],
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export const useAppContext = () => useContext(Context);
