export interface SalesChannelListResultI {
  data: SalesChannelI[];
  totalRowCount: number;
}

export interface CurrencyInfoI {
  code: string;
  description: string;
  id: string;
  name: string;
  symbol: string;
}
export interface SalesChannelI {
  id: string;
  currency: CurrencyInfoI;
  isActive: boolean;
  createdBySystem: boolean;
  marketId: boolean;
  marketName: boolean;
  name: string;
  paymentTypeId: string;
}

export interface SalesChannelListDataI {
  result: SalesChannelListResultI;
  hasError: boolean;
  message: string;
}

export interface PaymentTypeI {
  id: string;
  name: string;
}

export interface PaymentTypeListI {
  data: PaymentTypeI[];
  totalRowCount: number;
}

export interface SalesChannelResultI {
  marketIds: string[];
  userId: string;
  name: string;
  active: true;
  languageId: string;
  currency: {
    name: string;
    id: string;
  };
  market: {
    name: string;
    id: string;
  };
  paymentTypeId: string;
  paymentTypeName: string;
}

export interface NullResultI {
  result: null;
  hasError: boolean;
  message: string;
}

export interface ApiResponseI<T> {
  result: T;
  hasError: boolean;
  message: string;
}
