import { useAppContext } from 'Context';
import { postAddBaseHotel } from 'Services/Stay';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

interface PostAddBaseHotelI {
  onSuccess?: ({ stayId }: { stayId: string }) => void;
}
export default function usePostAddBaseHotel({
  onSuccess,
}: PostAddBaseHotelI) {
  const { setHotelId } = useAppContext();
  const navigate = useNavigate();

  const { mutate: addBaseHotelAction, isLoading } = useMutation(
    postAddBaseHotel,
    {
      onSuccess: (data) => {
        setHotelId(data.result.stayId);
        navigate(`add/${data.result.stayTypeName}`);
        if (onSuccess) onSuccess({ stayId: data.result.stayId });
      },
    },
  );

  return { addBaseHotelAction, isLoading };
}
