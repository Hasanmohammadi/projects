import { getPersonalInformation } from "@/services/profile";
import { UserInfoI } from "@/types/profile";
import { useQuery } from "@tanstack/react-query";

export default function useGetProfileInformation() {
  const { data, isLoading, refetch } = useQuery<UserInfoI>({
    queryKey: ["profileInformation"],
    queryFn: getPersonalInformation,
  });

  return {
    getProfileInfoData: data as UserInfoI,
    profileInfoLoading: isLoading,
    profileInfoAction: refetch,
  };
}
