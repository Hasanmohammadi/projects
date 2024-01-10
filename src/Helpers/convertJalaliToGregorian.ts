import moment from "jalali-moment";
import { convertPersianNumberToEnglish } from ".";

const convertJalaliToGregorian = (jalaliDateString: string) =>
  moment
    .from(convertPersianNumberToEnglish(jalaliDateString), "fa", "YYYY/MM/DD")
    .locale("en")
    .format("YYYY-MM-DD");

export default convertJalaliToGregorian;
