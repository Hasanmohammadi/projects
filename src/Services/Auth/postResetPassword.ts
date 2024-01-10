import { AUTH_URLS } from 'Constants/urls';
import { LoginDataI } from 'Types/Auth';
import axios from 'axios';

interface PostResetPasswordArgsI {
  email: string;
}

const postResetPassword = async ({ email }: PostResetPasswordArgsI) => {
  const response = await axios.post<LoginDataI>(
    AUTH_URLS.POST_RESET_PASSWORD,
    {
      email,
    },
  );

  return response.data;
};

export default postResetPassword;
