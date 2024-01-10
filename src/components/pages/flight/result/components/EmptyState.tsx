import { XBigSearchIcon } from "@/assets/svg";

export default function EmptyState() {
  return (
    <div className="w-full my-4 bg-white m-auto rounded-lg py-11 flex flex-col items-center gap-8">
      <XBigSearchIcon />
      <div className="text-center">
        <p className="my-4">
          متاسفانه برای این مسیر در تاریخ مورد نظر شما، پروازی یافت نشد.
        </p>
        <p className="my-4">اگر مایل هستید تاریخ دیگری را انتخاب کنید</p>
      </div>
      <div className="bg-primary text-white py-2 w-52 rounded-3xl flex justify-center cursor-pointer">
        <p className="font-bold">جستجوی مجدد</p>
      </div>
    </div>
  );
}
