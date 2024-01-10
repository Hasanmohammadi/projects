import { AUTH_URLS } from 'Constants/urls';
import { LoginDataI } from 'Types/Auth';
import axios from 'axios';

interface PostLoginArgsI {
  languageId: string;
  username: string;
  password: string;
}

const postLogin = async ({ password, username }: PostLoginArgsI) => {
  const response = await axios.post<LoginDataI>(AUTH_URLS.POST_LOGIN, {
    languageId: '00000000-0000-0000-0000-000000000000',
    username,
    password,
  });

  return response.data;
};

export default postLogin;
