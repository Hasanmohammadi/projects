import { postAddVendorSalesChannel } from 'Services/SalesChannel';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

export default function usePostAddVendorSalesChannel() {
  const navigate = useNavigate();

  const { mutate: addVendorSalesChannelAction, isLoading } = useMutation(
    postAddVendorSalesChannel,
    {
      onSuccess: () => {
        setTimeout(() => navigate('/vendors-management'), 500);
      },
    },
  );

  return { addVendorSalesChannelAction, isLoading };
}
