import { Button } from 'Common';
import AuthCard from 'Components/Pages/Auth/Components/AuthCard';
import usePostResetPassword from 'Hooks/Auth/usePostResetPassword';
import { useState } from 'react';
import { CheckSquare } from 'react-feather';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import LoginStyledContainer from './ForgotPassword.style';

interface LoginInputs {
  email: string;
  password: string;
}

export default function ForgotPassword() {
  const [page, setPage] = useState<'forgotPass' | 'success'>('forgotPass');
  const { isLoading, resetPasswordAction } = usePostResetPassword({
    setPage,
  });
  const { control, handleSubmit } = useForm<LoginInputs>({
    defaultValues: { email: '', password: '' },
  });

  const onSubmit: SubmitHandler<LoginInputs> = (data) =>
    resetPasswordAction(data);

  return (
    <LoginStyledContainer>
      {page === 'forgotPass' && (
        <AuthCard
          title="Forgot Password"
          subTitle="Enter the email address you used when you joined and we’ll send you link to reset your password."
          control={control}
          inputsLabel={{ first: 'Email', second: '' }}
          inputsName={{ first: 'email', second: 'password' }}
          orangeText="Sign in"
          inputsPlaceholder={{
            first: 'Enter your email',
            second: 'Enter your pasword',
          }}
          btnText="Send Reset Link"
          type="forgotPassword"
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
      )}
      {page === 'success' && (
        <div className="h-[650px] pt-40 pb-16 px-16 bg-gray-50 rounded-3xl w-[535px] m-auto flex flex-col items-center shadow-[rgba(0, 0, 0, 0.24] shadow-xl">
          <CheckSquare size={80} color="#039855" />
          <h1 className="text-3xl font-semibold text-gray-900 mt-10">
            Password Reset Email Sent
          </h1>
          <p className="text-base font-normal text-gray-500 mt-3 text-center">
            We have just sent an email to your registered email address
            with a link to reset your password. Please check your inbox
            (and your spam folder) to find the email.
          </p>
          <div className="w-full flex flex-row-reverse mt-20">
            <Link
              to="/login"
              className="text-2xl w-2/3 font-semibold text-primary m-auto"
            >
              <Button className="w-full">Login</Button>
            </Link>
          </div>
        </div>
      )}
    </LoginStyledContainer>
  );
}
