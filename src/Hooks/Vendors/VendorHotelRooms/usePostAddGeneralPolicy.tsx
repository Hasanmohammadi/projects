import { postAddGeneralPolicy } from 'Services/Vendors/VendorHotelRooms';
import { useMutation } from 'react-query';

interface PostAddVendorArgsI {
  setActiveTabIndex?: React.Dispatch<React.SetStateAction<number>>;
}

export default function usePostAddGeneralPolicy({
  setActiveTabIndex,
}: PostAddVendorArgsI) {
  const { mutate: postAddGeneralPolicyAction } = useMutation(
    postAddGeneralPolicy,
    {
      onSuccess: () => {
        if (setActiveTabIndex) setActiveTabIndex((pre) => pre + 1);
      },
    },
  );

  return {
    postAddGeneralPolicyAction,
  };
}
