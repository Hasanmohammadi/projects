import { Button } from 'Common';

import AddStayDescription from './AddStayDescription';
import AddStayName from './AddStayName';

export interface AddStayNameI {
  stayNames: { name: string; languageId: string }[];
}

interface FacilitiesPropsI {
  setActiveTabIndex: React.Dispatch<React.SetStateAction<number>>;
  hotelId?: string;
}

export default function StayDescription({
  setActiveTabIndex,
  hotelId,
}: FacilitiesPropsI) {
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
            onClick={() => setActiveTabIndex((pre) => pre + 1)}
          >
            <div className="flex flex-wrap gap-2">Next</div>
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
      <AddStayName hotelId={hotelId as string} />
      <AddStayDescription hotelId={hotelId as string} />
      <div className="flex flex-wrap flex-row-reverse mt-6 pt-4 gap-3 border-t border-t-gray-200">
        <Button
          color="primary"
          className="h-10 px-4"
          type="submit"
          onClick={() => setActiveTabIndex((pre) => pre + 1)}
        >
          <div className="flex flex-wrap gap-2">Next</div>
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
