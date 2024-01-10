import { useGetPurchases } from "@/hooks/profile";
import { Eye } from "react-feather";

export default function MyTrips() {
  const { getPurchasesData } = useGetPurchases();

  return (
    <>
      <div>
        <p className="font-semibold text-lg">سفر های من </p>
        <div className="py-5 px-4 flex justify-between border-t border-t-gray-200 mt-5">
          {getPurchasesData?.length ? (
            <div className="rounded-lg w-full border-2 border-gray-200">
              <div className="rounded-tl-lg rounded-tr-lg bg-gray-200 flex justify-between p-4">
                <p className="text-gray-400 w-1/6 text-center">شماره سفارش</p>
                <p className="text-gray-400 w-1/6 text-center">نوع سفارش</p>
                <p className="text-gray-400 w-1/6 text-center">تاریخ و ساعت</p>
                <p className="text-gray-400 w-1/6 text-center">مبلغ (ریال)</p>
                <p className="text-gray-400 w-1/6 text-center ml-6">وضعیت</p>
                <p className=""> </p>
              </div>
              <div className="flex justify-between p-4">
                <p className="text-gray-400 w-1/6 text-center">۲۳۲۴۵۳</p>
                <p className="text-gray-400 w-1/6 text-center">هتل</p>
                <p className="text-gray-400 w-1/6 text-center">
                  ۱۳۹۷/۰۳/۲۵ ۲۲:۲۳
                </p>
                <p className="text-gray-400 w-1/6 text-center">۱۲،۹۵۰،۰۰۰ </p>
                <p className="text-green-600 w-1/6 text-center">تایید شده</p>
                <p>
                  <Eye color="#FFC107" className="cursor-pointer" size={20} />
                </p>
              </div>
              <div className="flex justify-between p-4 border-t-2 border-t-gray-200">
                <p className="text-gray-400 w-1/6 text-center">۶۵۹۳۵۴</p>
                <p className="text-gray-400 w-1/6 text-center">پرواز خارجی</p>
                <p className="text-gray-400 w-1/6 text-center">
                  ۱۳۹۶/۱۲/۲۹ ۱۵:۴۴
                </p>
                <p className="text-gray-400 w-1/6 text-center">۳۲۳،۵۶۴،۰۰۰</p>
                <p className="text-red-600 w-1/6 text-center">استرداد شده</p>
                <p>
                  <Eye color="#FFC107" className="cursor-pointer" size={20} />
                </p>
              </div>
            </div>
          ) : (
            <div>
              <p>سفری برای نمایش وجود ندارد !</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
