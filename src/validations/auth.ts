import * as yup from "yup";

export const signInSchema = yup.object().shape({
  email: yup
    .string()
    .email("ایمیل را به درستی وارد کنید")
    .required("ایمیل را وارد کنید"),
  password: yup
    .string()
    .required("لطفا رمز عبور را وارد کنید ")
    .min(8, "حداقل باید شامل 8 کاراکتر باشد")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])/,
      "رمز عبور باید حداقل یک حرف بزرگ و یک حرف کوچک داشته باشد"
    )
    .matches(
      /[,.\/*$%#@!]/,
      "رمز عبور باید حداقل دارای یک نماد مانند ,.@!/*$%# باشد"
    ),
});
