import transactionSuccess from "@/assets/images/transaction-success.png";
import transactionFail from "@/assets/images/transaction-fail.png";
import Image from "next/image";
import Link from "next/link";

interface TransactionPropsI {
  isSuccess: boolean;
}
export default function Transaction({ isSuccess = true }: TransactionPropsI) {
  return (
    <div className="w-full py-16 bg-gray-100 text-center">
      {isSuccess ? (
        <>
          <Image
            src={transactionSuccess}
            alt="transaction-success"
            width="300"
            height="300"
            className="m-auto"
          />
          <p className="text-green-600 font-normal text-lg mt-4">
            فرآیند خرید تکمیل گردید
          </p>
          <p className="text-gray-400 font-normal text-lg my-4">
            بلیط به ایمیل شما ارسال شد
          </p>
          <button
            type="submit"
            className="bg-primary rounded-full w-56 py-2 flex justify-center text-white font-bold text-lg m-auto my-8"
          >
            مشاهده بلیط
          </button>
        </>
      ) : (
        <>
          <Image
            src={transactionFail}
            alt="transaction-fail"
            width="300"
            height="300"
            className="m-auto"
          />
          <p className="text-red-600 font-normal text-lg mt-4">
            فرآیند خرید شما تکمیل نگردید
          </p>
          <p className="text-gray-400 font-normal text-lg my-4">
            برای پیگیری خرید خود با پشتیبانی تماس بگیرید و یا
            <Link
              href="/#"
              className="text-primary border-b border-b-primary mx-2"
            >
              اینجا
            </Link>
            را کلیک کنید
          </p>
        </>
      )}
    </div>
  );
}
