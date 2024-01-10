"use client";
import {
  LoginResultI,
  TokenDetailI,
  UserI,
  UserInfoContextI,
} from "@/types/auth";
import { createContext, useContext, useMemo, useState } from "react";

const UserInfoContext = createContext<UserInfoContextI>({
  tokenDetail: {
    token: "",
    refreshToken: "",
    expireDateTime: "",
  },
  setTokenDetail: (tokenDetail: TokenDetailI) => {},
  user: {
    id: "",
    userName: "",
    forceChangePassword: false,
  },
  setUser: (user: UserI) => {},
});

export default function UserInfoContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [tokenDetail, setTokenDetail] = useState<TokenDetailI>({
    token: "",
    refreshToken: "",
    expireDateTime: "",
  });

  const [user, setUser] = useState<UserI>({
    id: "",
    userName: "",
    forceChangePassword: false,
  });

  const value: UserInfoContextI = useMemo(
    () => ({
      tokenDetail,
      setTokenDetail,
      user,
      setUser,
    }),
    [tokenDetail, user]
  );

  return (
    <UserInfoContext.Provider value={value}>
      {children}
    </UserInfoContext.Provider>
  );
}

export const useUserInfoContext = () => useContext(UserInfoContext);
