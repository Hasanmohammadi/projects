import * as yup from "yup";

export const adultInformationSchema = yup.object().shape({
  firstName: yup.string().required("نام را وارد کنید"),
  lastName: yup.string().required("نام خانوادگی را وارد کنید"),
  nationality: yup
    .object()
    .shape({
      id: yup.string(),
      label: yup.string(),
      isCity: yup.boolean(),
    })
    .required("ملیت را وارد کنید"),
  nationalId: yup.string().required("کد ملی را وارد کنید"),
  birthDate: yup.string().required("تاریخ تولد را وارد کنید"),
  passportNumber: yup.string().required("شماره پاسپورت را وارد کنید"),
  passportExpiryDate: yup.string().required("تاریخ انقضا پاسپورت را وارد کنید"),
  gender: yup.number().required("نام را وارد کنید"),
});

export const passengerInformationSchema = yup.object().shape({
  contactInformation: yup.object().shape({
    mobileNumber: yup.string().required("شماره موبایل را وارد کنید"),
    emailAddress: yup
      .string()
      .email("ایمیل را به درستی وارد کنید")
      .required("ایمیل را وارد کنید"),
  }),
  adults: yup.array().of(adultInformationSchema),
  children: yup.array().of(adultInformationSchema),
});
