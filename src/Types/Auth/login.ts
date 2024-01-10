export interface LoginResultI {
  name: string;
  token: string;
  refreshToken: string;
  email: string;
  roles: RoleI[];
  expiration: string;
  vendorId: string;
  id: string;
}

export interface RoleI {
  roleId: string;
  roleName: string;
}

export interface LoginDataI {
  result: LoginResultI;
  hasError: boolean;
  message: string;
}
