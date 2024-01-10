import { getProduct } from "@/services/purchase";
import { ProductResultI } from "@/types/payment";
import { useQuery } from "@tanstack/react-query";

interface UseGetProductI {
  invoiceCode: string;
}

export default function useGetProduct({ invoiceCode }: UseGetProductI) {
  const { data, isLoading, refetch } = useQuery<ProductResultI>({
    queryKey: ["getProduct"],
    queryFn: () =>
      getProduct({
        invoiceCode,
      }),
  });

  return {
    getProductData: data as ProductResultI,
    productLoading: isLoading,
    getProductAction: refetch,
  };
}
