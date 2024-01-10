import logo from 'Assets/image/Logo.png';
import { Button, Input } from 'Common';
import clsx from 'clsx';
import {
  Control,
  FieldValues,
  Path,
  SubmitHandler,
  UseFormHandleSubmit,
} from 'react-hook-form';
import { Link } from 'react-router-dom';

export interface AuthCardPropsI<T extends FieldValues> {
  title?: string;
  subTitle?: string;
  control?: Control<T>;
  inputsName?: {
    first: Path<T>;
    second: Path<T>;
  };
  inputsLabel?: {
    first: string;
    second: string;
  };
  inputsPlaceholder?: {
    first: string;
    second: string;
  };
  inputsErrors?: {
    first: string;
    second: string;
  };
  orangeText?: string;
  btnText?: string;
  type: 'login' | 'forgotPassword';
  handleSubmit: UseFormHandleSubmit<T>;
  onSubmit: SubmitHandler<T>;
  isLoading?: boolean;
}

export default function AuthCard<T extends FieldValues>({
  subTitle,
  title,
  control,
  inputsName,
  inputsLabel,
  inputsPlaceholder,
  orangeText,
  btnText,
  type,
  handleSubmit,
  onSubmit,
  inputsErrors,
  isLoading,
}: AuthCardPropsI<T>) {
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="h-[650px] pb-16 px-16 bg-gray-50 rounded-3xl w-[535px] m-auto flex flex-col items-center shadow-[rgba(0, 0, 0, 0.24] shadow-xl"
    >
      <img
        src={logo}
        alt="safarmarket logo"
        className="m-auto mb-4 h-32"
      />
      <h1 className="text-gray-900 text-3xl font-semibold m-auto">
        {title}
      </h1>
      <p className="text-center text-gray-500 text-base font-normal mt-3 m-auto mb-8">
        {subTitle}
      </p>
      <div className=" flex flex-col gap-6 w-[360px]">
        <Input
          name={inputsName?.first as Path<T>}
          placeholder={inputsPlaceholder?.first}
          control={control as Control<T>}
          label={inputsLabel?.first}
          className="m-auto p-0 w-full"
          errorMessage={inputsErrors?.first}
        />
        <Input
          name={inputsName?.second as Path<T>}
          placeholder={inputsPlaceholder?.second}
          control={control as Control<T>}
          label={inputsLabel?.second}
          className={clsx('m-auto mt-4 p-0 w-full ', {
            invisible: type === 'forgotPassword',
          })}
          errorMessage={inputsErrors?.second}
          type="password"
        />
        <div className="w-full flex flex-row-reverse mt-2">
          <Link
            to={type === 'login' ? '/forgot-password' : '/login'}
            className="text-sm font-semibold text-primary "
          >
            {orangeText}
          </Link>
        </div>
        <Button
          className="w-full py-3 flex flex-col-reverse"
          type="submit"
          loading={isLoading}
        >
          {btnText as string}
        </Button>
      </div>
    </form>
  );
}
