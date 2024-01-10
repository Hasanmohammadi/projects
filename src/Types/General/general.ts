export interface CountryI {
  id: string;
  name: string;
  currencyId: string;
  flag: string;
  countryCode: string;
  proviences: [
    {
      name: string;
      id: string;
    },
  ];
}

export interface CountriesI {
  data: CountryI[];
  totalRowCount: number;
}

export interface CountriesDataI {
  result: CountriesI;
  hasError: boolean;
  message: string;
}

export interface CityI {
  cityName: string;
  cityId: string;
  latitude: string;
  longitude: string;
}

export interface CitiesI {
  countryId: string;
  countryName: string;
  cities: CityI[];
}

export interface CitiesDataI {
  result: CitiesI;
  hasError: boolean;
  message: string;
}
export interface LanguageI {
  id: string;
  name: string;
  languageCode: string;
}

export interface LanguagesDataI {
  result: LanguageI[];
  hasError: boolean;
  message: string;
}
