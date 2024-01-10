import { Button } from 'Common';
import { useNavigate } from 'react-router-dom';

import { AddRoomNames } from './Components';
import AddRoomDescription from './Components/AddRoomDescription/AddRoomDescription';

export interface AddRoomNameI {
  vendorHotelRoomNames: { name: string; languageId: string }[];
}

export interface DescriptionPropsI {
  setActiveTabIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function Descriptions({
  setActiveTabIndex,
}: DescriptionPropsI) {
  const navigate = useNavigate();
  return (
    <div>
      <div className="mt-6 flex justify-between w-full border-b border-b-gray-200 pb-5">
        <div>
          <p className="text-lg font-medium text-gray-900">Descriptions</p>
        </div>
        <div className="flex flex-wrap flex-row-reverse mt-4 gap-3">
          <Button
            color="primary"
            className="h-10 px-4"
            type="submit"
            onClick={() => navigate('/rooms')}
          >
            <div className="flex flex-wrap gap-2">Done</div>
          </Button>
          <Button
            color="ghost"
            className="h-10 px-4"
            onClick={() => setActiveTabIndex((pre) => pre - 1)}
          >
            <div className="flex flex-wrap gap-2">Back</div>
          </Button>
        </div>
      </div>

      <AddRoomNames />
      <AddRoomDescription />

      <div className="flex flex-wrap flex-row-reverse mt-6 pt-4 gap-3 border-t border-t-gray-200">
        <Button
          color="primary"
          className="h-10 px-4"
          type="submit"
          onClick={() => navigate('/rooms')}
        >
          <div className="flex flex-wrap gap-2">Done</div>
        </Button>
        <Button
          color="ghost"
          className="h-10 px-4"
          onClick={() => setActiveTabIndex((pre) => pre - 1)}
        >
          <div className="flex flex-wrap gap-2">Back</div>
        </Button>
      </div>
    </div>
  );
}
