import { getPurchases } from "@/services/profile";
import { PurchasesResultI } from "@/types/profile";
import { useQuery } from "@tanstack/react-query";

export default function useGetPurchases() {
  const { data, isLoading, refetch } = useQuery<PurchasesResultI[]>({
    queryKey: ["purchases"],
    queryFn: getPurchases,
  });

  return {
    getPurchasesData: data as PurchasesResultI[],
    getPurchasesLoading: isLoading,
    getPurchasesAction: refetch,
  };
}
