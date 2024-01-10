import moment from "jalali-moment";

function convertGregorianToJalali(gregorianDate: string): string {
  return moment(gregorianDate, "YYYY/MM/DD").locale("fa").format("YYYY/MM/DD");
}

export default convertGregorianToJalali;
