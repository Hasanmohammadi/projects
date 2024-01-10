import { putSalesChannel } from 'Services/SalesChannel';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

export default function usePutEditSalesChannel() {
  const navigate = useNavigate();

  const { mutate: editSalesChannelAction, isLoading } = useMutation(
    putSalesChannel,
    {
      onSuccess: () => {
        navigate('/sales-channel');
      },
    },
  );

  return { editSalesChannelAction, isLoading };
}
