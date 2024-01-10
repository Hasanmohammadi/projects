export const separateCountryCode = (value: string) => {
  const values = value?.split('-');
  return values?.[0];
};
export const separatePhoneNumber = (value: string) => {
  const values = value?.split('-');
  return values?.[1];
};
