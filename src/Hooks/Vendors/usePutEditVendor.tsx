import { putEditVendor } from 'Services/Vendors';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

export default function usePutEditVendor() {
  const navigate = useNavigate();

  const { mutate: editVendorAction, isLoading } = useMutation(
    putEditVendor,
    {
      onSuccess: () => {
        navigate(-1);
      },
    },
  );

  return { editVendorAction, isLoading };
}
