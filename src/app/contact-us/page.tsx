"use client";
import { Input, TextArea } from "@/components/common";
import { useForm } from "react-hook-form";

export default function ContactUs() {
  const { control } = useForm();

  return (
    <div className="bg-gray-200 pb-14">
      <div className="lg:w-4/5 w-11/12 m-auto pt-14">
        <p className="font-medium text-xl text-gray-500">تماس با ما</p>
        <div className="border-gray-300 border p-8 rounded-lg mt-6 bg-white">
          <p className="text-gray-500">
            پشتیبانی 9 صبح الی 12 شب : 96621777 - 021
          </p>
          <p className="text-gray-500 mt-8">نمابر : 96621787 - 021 </p>
          <p className="text-gray-500 mt-8">
            آدرس: تهران بلوار میرداماد، نرسیده به میدان مادر، جنب بانک صادرات
            پلاک 102 طبقه 3 واحد 8 | کد پستی : 1547934135
          </p>
          <p className="text-gray-500 mt-8">ایمیل : info@safarestan.com</p>
          <p className="text-gray-500 mt-8">
            شماره تلفن : 02196621777 - 02122259694
          </p>
          <div className="mt-16 border-t-2 border-dashed border-t-gray-200 pt-8">
            <div className="flex gap-10 justify-between">
              <Input
                control={control}
                name="email"
                className="h-9 w-full"
                label="ایمیل"
              />
              <Input
                control={control}
                name="name"
                className="h-9 w-full"
                label="نام"
              />
            </div>
            <TextArea
              control={control}
              name="message"
              className="h-20 mt-8"
              label="پیام"
            />
            <div className="w-full flex justify-end mt-8">
              <button
                type="submit"
                className="bg-primary rounded-full w-56 py-2 flex justify-center text-white font-bold text-lg mt-8"
              >
                ارسال
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
