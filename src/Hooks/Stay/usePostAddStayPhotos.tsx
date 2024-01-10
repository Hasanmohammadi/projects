import { postAddStayPhotos } from 'Services/Stay';
import { useMutation } from 'react-query';

export default function usePostAddStayPhotos({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const { mutate: addHotelPhotosAction, isLoading } = useMutation(
    postAddStayPhotos,
    {
      onSuccess: () => {
        onSuccess();
      },
    },
  );

  return { addHotelPhotosAction, isLoading };
}
