import { Button } from 'Common';
import { Draggable, Map, ZoomControl } from 'pigeon-maps';
import { MapPin } from 'react-feather';

export default function LocationModal({
  anchor,
  setAnchor,
  onApply,
}: {
  anchor: [number, number];
  setAnchor: React.Dispatch<React.SetStateAction<[number, number]>>;
  onApply: () => void;
}) {
  return (
    <div className="w-[60vw]">
      <Map
        height={500}
        defaultCenter={anchor}
        defaultZoom={13}
        onClick={(data) => setAnchor(data.latLng)}
      >
        <ZoomControl />
        <Draggable offset={[30, 58]} anchor={anchor} onDragEnd={setAnchor}>
          <MapPin size={60} color="#ffff" fill="#ec4a0a" />
        </Draggable>
      </Map>
      <div className="flex justify-end mt-6">
        <Button onClick={onApply}>Apply</Button>
      </div>
    </div>
  );
}
