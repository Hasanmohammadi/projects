import {
  LocationIcon,
  MailIcon,
  PhoneIcon,
  SafarestanLogo,
} from "@/assets/svg";
import Link from "next/link";

const safarestanBulletPoints = [
  { id: 1, text: "درباره ما", value: "about-us" },
  { id: 2, text: "قوانین و مقررات", value: "rules" },
  { id: 3, text: "خبرنامه و وبلاگ", value: "weblog" },
  { id: 4, text: "فرصت های شغلی", value: "jobs-opportunities" },
];

const oprationBulletPoints = [
  { id: 1, text: "هواپیما", value: "airplane" },
  { id: 2, text: "هتل", value: "hotel" },
  { id: 3, text: "بیمه", value: "insurance" },
  { id: 4, text: "راهنمای خرید", value: "purchase-guide" },
  { id: 5, text: "راهنمای استرداد", value: "refund-guide" },
  { id: 6, text: "سوالات متداول", value: "faq" },
];

export default function Footer() {
  return (
    <div
      className="w-full text-black lg:px-40 px-4 lg:py-20 py-10 lg:flex lg:justify-between gap-16"
      style={{
        background:
          "linear-gradient(44deg, rgba(6, 15, 58, 0.94) 0%, rgba(19, 50, 98, 0.97) 104.12%)",
      }}
    >
      <div className="lg:w-1/4 text-center">
        <SafarestanLogo className="m-auto" />
        <p className="mt-4 text-white font-light text-xs">
          خرید بلیط هواپیما و رزرو هتل، مطمئن تر از همیشه
        </p>
      </div>
      <div className="lg:flex lg:w-3/4 gap-6">
        <div className="lg:w-1/3">
          <div className="w-full flex justify-between gap-12 items-center mt-10 lg:mt-0 ">
            <p className="font-light text-xs text-primary">سفرستان</p>
            <hr className="w-full border-t-2 border-t-gray-700" />
          </div>
          <div>
            {safarestanBulletPoints.map(({ id, text, value }) => (
              <div key={id} className="mt-5 flex gap-6 items-center">
                <div className="rounded-full bg-primary w-2 h-2 my-2"> </div>
                <Link
                  href={`/${value}`}
                  className="font-light text-xs text-white hover:text-primary"
                >
                  {text}
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:w-1/3">
          <div className="w-full flex justify-between gap-12 items-center mt-10 lg:mt-0">
            <p className="font-light text-xs text-primary">خدمات</p>
            <hr className="w-full border-t-2 border-t-gray-700" />
          </div>
          <div>
            {oprationBulletPoints.map(({ id, text, value }) => (
              <div key={id} className="mt-5 flex gap-6 items-center">
                <div className="rounded-full bg-primary w-2 h-2 my-2"> </div>
                <Link
                  href={`/${value}`}
                  className="font-light text-xs text-white hover:text-primary"
                >
                  {text}
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:w-1/3">
          <div className="w-full flex justify-between gap-12 items-center mt-10 lg:mt-0">
            <p className="font-light text-xs text-primary w-32">اطلاعات تماس</p>
            <hr className="w-full border-t-2 border-t-gray-700" />
          </div>
          <div className="mt-6">
            <div className="flex gap-3 my-5">
              <LocationIcon color="#FFC107" size={44} />
              <div>
                <p className="text-white text-xs font-light self-center mt-1">
                  تهران بلوار میرداماد، نرسیده به میدان مادر، جنب بانک صادرات
                  پلاک ۱۰۲ طبقه ۳ واحد ۸
                </p>
                <span className="text-white text-xs font-light">
                  کد پستی :۱۵۴۷۹۳۴۱۳۵
                </span>
              </div>
            </div>
            <div className="flex gap-3 items-center my-5">
              <PhoneIcon color="#FFC107" size={20} />
              <p
                className="text-white text-xs font-light self-center mt-1"
                style={{ direction: "ltr" }}
              >
                021 - 22922235 | 021 - 96621777
              </p>
            </div>
            <div className="flex gap-3 items-center my-5">
              <MailIcon color="#FFC107" size={22} />
              <p className="text-white text-xs font-light self-center mt-1">
                info@safarestan.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
