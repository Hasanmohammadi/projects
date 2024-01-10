import { SafarestanLogo } from "@/assets/svg";
import Image from "next/image";
import Link from "next/link";
export default function Ticket({ params }: { params: { id: string } }) {
  return (
    <div className="bg-gray-200 py-6 ">
      <div className="w-4/5 m-auto rounded-lg">
        <div className="flex justify-end gap-4 bg-gray-200 ">
          <button
            type="submit"
            className="bg-primary rounded-full w-40 py-2 flex justify-center text-white font-bold text-lg my-8"
          >
            پرینت بلیط
          </button>
          <button
            type="submit"
            className="bg-primary rounded-full w-40 py-2 flex justify-center text-white font-bold text-lg my-8"
          >
            دانلود بلیط
          </button>
        </div>
        <div className="rounded-lg ">
          <div className="bg-gray-300 flex justify-between rounded-tl-lg rounded-tr-lg px-8 py-3">
            <p className="w-2/6 text-start">شماره مرجع | PNR</p>
            <p className="w-2/6 text-center">شماره بلیط | E-Ticket</p>
            <p className="w-2/6 text-end">Passanger Surname / Name</p>
          </div>
          <div className="bg-white flex justify-between px-8 py-3 ">
            <p className="w-2/6 text-start">HZK9G</p>
            <p className="w-2/6 text-center">2372452574941</p>
            <p className="w-2/6 text-end">name & last name</p>
          </div>
        </div>
        <div className="bg-gray-300 flex justify-between px-8 py-3">
          <p className="w-1/4 text-start">نام ایر لاین</p>
          <p className="w-1/4 text-center">شماره پرواز</p>
          <p className="w-1/4 text-center">مبدا</p>
          <p className="w-1/4 text-end ml-7">مقصد</p>
        </div>
        <div className="bg-white flex justify-between px-8 py-3">
          <div className="w-1/4 text-start">
            <p>کاسپین</p>
            <p className="font-medium text-sm text-gray-400 mt-3">
              کلاس کابین | Cabin Class
            </p>
            <p className="font-normal text-base text-gray-400 mt-2">
              Economy (Y) | اکونومی
            </p>
          </div>
          <div className="w-1/4 text-center">
            <p>IR 431</p>
            <p className="font-medium text-sm text-gray-400 mt-3">
              مقدار بار مجاز | Flight Number
            </p>
            <p className="font-normal text-base text-gray-400 mt-2">
              ۲۰ کیلوگرم | 20Kg
            </p>
          </div>
          <div className="w-1/4 text-center">
            <p>مشهد (MHD)</p>
            <p className="font-medium text-lg text-gray-400 mt-2">09:40</p>
            <p className="font-normal text-sm text-gray-400 mt-2">
              ۲۵ شهریور ۱۳۹۷
            </p>
          </div>
          <div className="w-1/4 flex justify-end">
            <div className="w-fit text-center">
              <p>تهران (TEH)</p>
              <p className="font-medium text-lg text-gray-400 mt-2">09:40</p>
              <p className="font-normal text-sm text-gray-400 mt-2">
                ۲۵ شهریور ۱۳۹۷
              </p>
            </div>
          </div>
        </div>
        <div className="border-t-2 border-dashed border-gray-300 pt-10 bg-white flex gap-10 px-8 pb-16">
          <div className="border-2 border-gray-200 w-1/2">
            <div className="flex">
              <div className="border-l-2 border-dashed border-l-gray-300 w-1/3 flex justify-center">
                <div className="py-5">
                  <p className="font-light text-xs text-gray-400 ">
                    نحوه پرداخت
                  </p>
                  <p className="mt-2">پرداخت آنلاین</p>
                </div>
              </div>
              <div className="w-2/3 flex justify-center">
                <div className="py-5">
                  <p className="font-light text-xs text-gray-400 ">
                    تاریخ خرید
                  </p>
                  <p className="mt-2">سه شنبه - ۲۰ شهریور ۱۳۹۷ - ۱۱:۴۳</p>
                </div>
              </div>
            </div>
            <div className="border-t-2 border-dashed border-gray-300 pt-5 bg-white">
              <div className="flex justify-between py-3 px-4">
                <p>مبلغ پایه بلیط </p>
                <p> ۱۵۴،۲۵۰،۰۰۰ ریال</p>
              </div>
              <div className="flex justify-between py-3 px-4">
                <p>مالیات و عوارض فرودگاهی</p>
                <p>۵،۲۵۰،۰۰۰ ریال</p>
              </div>
              <div className="flex justify-between py-3 px-4">
                <p>تخفیف آنلاین </p>
                <p>۵،۲۵۰،۰۰۰ ریال</p>
              </div>
              <div className="flex justify-between py-5 px-4 bg-gray-100 border-t border-t-gray-200  mt-3">
                <p className="font-semibold">مبلغ قابل پرداخت </p>
                <p className="font-semibold">۱۴۵،۰۰۰،۰۰۰ ریال</p>
              </div>
            </div>
          </div>
          <div className="w-1/2">
            <p className="text-gray-500">
              در صورت استرداد بلیط، با توجه به موارد زیر، شما جریمه شده و از
              مبلغ بازگشتی به شما کاسته میشود.
            </p>
            <div>
              <div className="flex justify-between px-4 rounded-tl-lg rounded-tr-lg bg-gray-100 mt-8">
                <p className="font-medium text-sm text-gray-400 py-3">
                  شرایط هنگام استرداد
                </p>
                <p className="font-medium text-sm text-gray-400 py-3">
                  میزان جریمه
                </p>
              </div>
              <div className="flex justify-between px-4 border-b border-b-gray-200">
                <p className="font-medium text-sm py-4">
                  (از زمان صدور) تا ۱۲ ظهر ۳ روز قبل از پرواز
                </p>
                <p className="font-medium text-sm py-4">۵%</p>
              </div>
              <div className="flex justify-between px-4 border-b border-b-gray-200">
                <p className="font-medium text-sm py-4">
                  تا ۱۲ ظهر ۱ روز قبل از پرواز
                </p>
                <p className="font-medium text-sm py-4">۱۵%</p>
              </div>
              <div className="flex justify-between px-4 border-b border-b-gray-200">
                <p className="font-medium text-sm py-4">
                  از ۳ ساعت تا ۳۰ دقیقه قبل از پرواز
                </p>
                <p className="font-medium text-sm py-4">۳۰%</p>
              </div>
              <div className="flex justify-between px-4 border-b border-b-gray-200">
                <p className="font-medium text-sm py-4">
                  از ۳۰ دقیقه قبل از پرواز به بعد
                </p>
                <p className="font-medium text-sm py-4">۵۰%</p>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t-2 border-t-gray-200 border-dashed pt-16 pb-20 bg-white">
          <div className="px-8">
            <p className="text-gray-400">لطفا به موارد زیر دقت فرمایید</p>
            <p className="text-gray-500 mt-10">
              ۱. استرداد بلیطهای خریداری شده تنها از طریق همین سایت و به صورت
              آنلاین امکانپذیر است.
            </p>
            <p className="text-gray-500 my-4">
              ۲. همراه داشتن کارت شناسایی معتبر (کارت ملی) جهت پذیرش مسافران
              الزامی است.
            </p>
            <p className="text-gray-500 my-4">
              ۳. پروازهای داخلی زاگرس و کیش ایر از ترمینال ۱ فرودگاه مهرآباد
              تهران، پروازهای ایران ایر، آتا، ایران ایر تور، معراج، قشم ایر و
              نفت از ترمینال ۲ فرودگاه مهرآباد تهران و پروازهای کاسپین، آسمان،
              تابان، اترک، ماهان، ساها و سپهران از ترمینال ۴ فرودگاه مهرآباد
              تهران انجام میپذیرد.
            </p>
            <p className="text-gray-500 my-4">
              ۴. مسافران می بایست حداقل یک ساعت قبل از پرواز در فرودگاه حضور
              داشته باشند.
            </p>
            <p className="text-gray-500 my-4">
              ۵. مسئولیت هرگونه تاخیر در پرواز یا کنسلی پرواز کاملا بر عهده
              ایرلاین مربوطه میباشد.
            </p>
            <p className="text-gray-500 my-4">
              ۶. هر گونه تغییر دربرنامه پروازه ازطریق پیامک یا پست الکترونیکی
              ثبت شد هدر مشخصات مسافراعلام خواهد شد؛ بنابراین صحت اطلاعات وارد
              شده بر عهده مسافر است.
            </p>
            <p className="text-gray-500 my-4">
              ۷. لطفا توجه داشته باشید که در صورت بروز هرگونه مشکل در فرودگاه و
              یا درخواست کنسلی پرواز، حتما بلیط پرینت شده را به امضا و مهر مسئول
              مربوطه در کانتر فرودگاه برسانید و جهت استرداد وجه به سفرستان تحویل
              دهید.
            </p>
            <p className="text-gray-500 my-4">
              ۸. ارایه گواهی پزشکی مربوطه برای پذیرش خانمهای باردار و نوزادان
              (کمتر از ۱۰ روز) و بیماران الزامی است.
            </p>
          </div>
        </div>
        <div className="flex px-8 pb-10 bg-white">
          <div className="border-l border-l-gray-300 px-10 w-1/3">
            <SafarestanLogo />
          </div>
          <div className="border-l border-l-gray-300 px-10 w-1/3 self-center">
            <p className="text-xs font-light text-gray-400">
              تهران بلوار میرداماد، نرسیده به میدان مادر، جنب بانک صادرات پلاک
              ۱۰۲ طبقه ۳ واحد ۸ | کد پستی :۱۵۴۷۹۳۴۱۳۵
            </p>
          </div>
          <div className=" px-10 w-1/3 self-center">
            <p className="text-xs font-light text-gray-400">
              تماس با پشتیبانی: 96621777 021
            </p>
            <Link href="info@safarestan.com" className="text-blue-300">
              info@safarestan.com
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
