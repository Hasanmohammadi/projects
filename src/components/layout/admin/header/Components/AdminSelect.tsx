import { MenuItem } from '@mui/material';
import { Select } from 'Common';
import { useAppContext } from 'Context';
import { useGetVendors } from 'Hooks/Vendors';
import { useEffect } from 'react';
import { User } from 'react-feather';
import { useForm } from 'react-hook-form';

interface UserRoleI {
  role: string;
}

export default function AdminSelect() {
  const { setVendorIdSelected, setHotelId, setRoomId } = useAppContext();
  const { vendorsData, isLoading } = useGetVendors();
  const { control, watch } = useForm<UserRoleI>({
    defaultValues: {
      role: '',
    },
  });

  const { role } = watch();

  useEffect(() => {
    setVendorIdSelected(role);
    setHotelId('');
    setRoomId('');
  }, [role]);

  return (
    <>
      <Select
        className="h-11 w-80"
        name="role"
        control={control}
        loading={isLoading}
      >
        <MenuItem value="" disabled>
          <div className="flex">
            <User color="#949bac" />
            <p className="ml-2 self-end text-gray-400">Select Vendor</p>
          </div>
        </MenuItem>
        {vendorsData?.data
          .filter(({ active }) => active)
          .map(({ id, name }) => (
            <MenuItem key={id} value={id}>
              {name}
            </MenuItem>
          ))}
      </Select>
    </>
  );
}
