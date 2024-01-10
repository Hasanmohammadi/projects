import {
  AirplaneColorizeIcon,
  SearchColorizeIcon,
  WalletColorizeIcon,
} from "@/assets/svg";
import AccessibilityIcon from "@/assets/svg/AccessibilityIcon";

export default function FlightInformation() {
  return (
    <div className="w-full lg:flex grid grid-cols-2 px-3 lg:justify-evenly my-8">
      <div className="lg:w-48 text-center">
        <div className="w-full flex justify-center">
          <WalletColorizeIcon />
        </div>
        <p className="font-semibold text-lg mt-8"> خرید مطمئن</p>
        <p className="mt-4 text-gray-400 text-base font-light text-center">
          خرید مطمئن کلیه مراحل خرید بلیط هواپیما، رزرو هتل و استرداد وجه در
          شرایط مطمئن و با پشتیبانی کامل امکان پذیر است
        </p>
      </div>
      <div className="lg:w-48 text-center">
        <div className="w-full flex justify-center">
          <SearchColorizeIcon />
        </div>
        <p className="font-semibold text-lg mt-8"> جستجو و صدور آنلاین</p>
        <p className="mt-4 text-gray-400 text-base font-light text-center">
          در سفرستان جستجو، خرید بلیط هواپیما و رزرو هتل بصورت آنلاین و شبانه
          روزی امکان پذیر است
        </p>
      </div>
      <div className="lg:w-48 text-center">
        <div className="w-full flex justify-center">
          <AirplaneColorizeIcon />
        </div>
        <p className="font-semibold text-lg mt-4"> کامل ترین پروازها</p>
        <p className="mt-4 text-gray-400 text-base font-light text-center">
          کلیه مراحل خرید بلیط هواپیما، رزرو هتل و استرداد وجه در شرایط مطمئن و
          با پشتیبانی کامل امکان پذیر است
        </p>
      </div>
      <div className="lg:w-48 text-center">
        <div className="w-full flex justify-center">
          <AccessibilityIcon />
        </div>
        <p className="font-semibold text-lg mt-4"> دسترسی سریع و آسان</p>
        <p className="mt-4 text-gray-400 text-base font-light text-center">
          با وب سایت و اپلیکیشن سفرستان جستجو، خرید بلیط هواپیما و رزرو هتل به
          سرعت و آسانی درهر کجا که باشید فراهم است
        </p>
      </div>
    </div>
  );
}
