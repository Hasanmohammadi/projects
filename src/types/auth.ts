export interface LoginResultI {
  user: UserI;
  tokenDetail: TokenDetailI;
}
export interface TokenDetailI {
  token: string;
  refreshToken: string;
  expireDateTime: string;
}
export interface UserI {
  id: string;
  userName: string;
  forceChangePassword: boolean;
}

export interface LoginI {
  email: string;
  password: string;
}

export interface UserInfoContextI {
  user: UserI;
  tokenDetail: TokenDetailI;
  setUser: (user: UserI) => void;
  setTokenDetail: (tokenDetail: TokenDetailI) => void;
}
