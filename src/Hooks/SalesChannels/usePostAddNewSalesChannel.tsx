import { postAddNewSalesChannel } from 'Services/SalesChannel';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

export default function usePostAddNewSalesChannel() {
  const navigate = useNavigate();

  const { mutate: addNewSalesChannelAction, isLoading } = useMutation(
    postAddNewSalesChannel,
    {
      onSuccess: () => {
        navigate('/sales-channel');
      },
    },
  );

  return { addNewSalesChannelAction, isLoading };
}
