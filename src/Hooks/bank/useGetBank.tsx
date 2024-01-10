import { useQuery } from "@tanstack/react-query";
import { getBank } from "../../services/basicInformation";
import { BankResultI } from "../../types/basicInformation";

export default function useGetBank() {
  const { data, isLoading, refetch } = useQuery<BankResultI[]>({
    queryKey: ["getBanks"],
    queryFn: getBank,
  });

  return {
    getBankData: data as BankResultI[],
    bankLoading: isLoading,
    getBankAction: refetch,
  };
}
