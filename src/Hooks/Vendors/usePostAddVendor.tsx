import { useAppContext } from 'Context';
import { postAddVendor } from 'Services/Vendors';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

interface PostAddVendorArgsI {
  setActiveTabIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function usePostAddVendor({
  setActiveTabIndex,
}: PostAddVendorArgsI) {
  const { setVendorManagementId, setVendorIdSelected } = useAppContext();
  const { mutate: addVendorAction, isLoading } = useMutation(
    postAddVendor,
    {
      onSuccess: ({ result }) => {
        toast.success(result.password, {
          position: 'top-center',
        });
        setVendorManagementId(result.id);
        setVendorIdSelected(result.id);
        setActiveTabIndex(1);
      },
    },
  );

  return { addVendorAction, isLoading };
}
