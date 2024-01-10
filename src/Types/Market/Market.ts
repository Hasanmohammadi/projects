export interface CurrencyI {
  id: string;
  name: string;
  description: string;
}

export interface CurrencyListI {
  data: CurrencyI[];
  totalRowCount: number;
}

export interface CurrencyListDataI {
  result: CurrencyListI;
  hasError: boolean;
  message: string;
}

export interface MarketI {
  marketName: string;
  commission: number;
  countryIndependentSpecialPrice: boolean;
  marketId: string;
  priceTypeId: string;
  currencyId: string;
  childPolicyId: null;
}
export interface MarketListI {
  data: MarketI[];
  totalRowCount: number;
}

export interface ApiResponseI<T> {
  result: T;
  hasError: boolean;
  message: string;
}
