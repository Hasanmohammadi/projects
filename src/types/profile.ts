export interface UserInfoI {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  emailAddressVerified: boolean;
  mobileNo: string;
  mobileNoVerified: boolean;
  brithDate: Date;
  nationality: string;
  gender: number;
  language: string;
  currencyCode: string;
  cardNumber: string;
  cardHolderName: string;
  cardExpireYear: number;
  cardExpireMonth: number;
}

export interface PurchasesResultI {
  id: string;
  userId: string;
  productType: number;
  productId: string;
  invoiceCode: string;
  totalAmount: number;
  currenyCode: string;
  description: string;
  purchaseDateTime: string;
  productStatus: number;
  productStatusTitle: string;
  properties: string;
}
