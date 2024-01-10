import { Avatar } from '@mui/material';
import { LogOut } from 'react-feather';

interface ProfileInfoPropsI {
  name?: string;
  email?: string;
  image?: string;
  onLogOutClick?: () => void;
  imageAlt?: string;
}

export default function ProfileInfo({
  email,
  image,
  imageAlt,
  name,
  onLogOutClick,
}: ProfileInfoPropsI) {
  return (
    <div className="px-4">
      <div className="border-t pt-6 border-gray-200 w-full flex justify-between">
        <div className="flex">
          <Avatar className="self-center" alt={imageAlt} src={image} />
          <div className="ml-3 w-[1px]">
            <p className="text-gray-700 text-sm font-medium">{name}</p>
            <span className="text-gray-500 text-sm font-normal">
              {email}
            </span>
          </div>
        </div>
        <LogOut
          onClick={onLogOutClick}
          className="text-gray-500 self-center cursor-pointer"
        />
      </div>
    </div>
  );
}
