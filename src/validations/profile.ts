import * as yup from "yup";

export const userInformationSchema = yup.object().shape({
  birthDate: yup.string().required("تاریخ تولد را وارد کنید"),
  emailAddress: yup
    .string()
    .email("ایمیل خود را به درستی وارد کنید !")
    .required("لطفا ایمیل خود را وارد کنید !"),
  firstName: yup.string().required("لطفا نام خود را وارد کنید !"),
  lastName: yup.string().required("لطفا نام خانوادگی خود را وارد کنید !"),
  nationality: yup.string().required("لطفا کشور خود را وارد کنید !"),
  mobileNo: yup.string().required("لطفا شماره همراه خود را وارد کنید !"),
  gender: yup.number().required("لطفا جنسیت خود را وارد کنید !"),
});

export const userSecuritySchema = yup.object().shape({
  oldPassword: yup
    .string()
    .required("لطفا رمز عبور قدیمی را وارد کنید !")
    .min(8, "حداقل باید شامل 8 کاراکتر باشد")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])/,
      "رمز عبور باید حداقل یک حرف بزرگ و یک حرف کوچک داشته باشد"
    )
    .matches(
      /[,.\/*$%#@!]/,
      "رمز عبور باید حداقل دارای یک نماد مانند ,.@!/*$%# باشد"
    ),
  newPassword: yup
    .string()
    .required("لطفا رمز عبور جدید را وارد کنید !")
    .min(8, "حداقل باید شامل 8 کاراکتر باشد")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])/,
      "رمز عبور باید حداقل یک حرف بزرگ و یک حرف کوچک داشته باشد"
    )
    .matches(
      /[,.\/*$%#@!]/,
      "رمز عبور باید حداقل دارای یک نماد مانند ,.@!/*$%# باشد"
    ),
  confirmPassword: yup
    .string()
    .required("لطفا رمز عبور جدید را وارد کنید !")
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
