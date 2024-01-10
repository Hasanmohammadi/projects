"use client";
import { Collapse } from "@/components/common";

const faq = [
  {
    question: "سایت سفرستان چه خدماتی را ارائه می دهد ؟",
    answer:
      "سایت سفرستان به عنوان جامع ترین وب سایت خرید آنلاین بلیط هواپیما و هتل ، امکان خرید کلیۀ بلیط های سیستمی و چارتری داخلی ، بلیط های سیستمی خارجی و هتل خارجی از طریق کارتهای بانکی عضو شتاب را فراهم می کند .",
  },
  {
    question: "چگونه می توان به سایت سفرستان اعتماد کرد ؟",
    answer:
      "سایت سفرستان با نماد اعتماد الکترونیکی متعلق به شرکت خدمات مسافرت هوایی و جهانگردی سفرستان شهر فردا با داشتن مجوزهای لازم از سازمان هواپیمایی کشوری و همچنین ادارۀ کل میراث فرهنگی ، صنایع دستی و گردشکری استان تهران ، بیش از 40 سال است که در این عرصه فعالیت دارد . برای مشاهدۀ سابقۀ این شرکت و جزئیات مجوزها و اطمینان از انتخاب خود می توانید به بخش دربارۀ ما در سایت سفرستان مراجعه کنید",
  },
  {
    question: "طریقۀ خرید در سایت سفرستان به چه صورت می باشد ؟",
    answer:
      "از طریق سایت سفرستان شما قادر خواهید بود در هر ساعتی از شبانه روز به صورت آنلاین ، بلیط خود را در تمامی مقاصد با کلیۀ ایرلاین ها و هتل خارجی در اقصی نقاط جهان به صورت آنلاین خریداری نمایید . شما می توانید با مراجعه به راهنمای خرید بلیط هواپیما و هتل ، تمامی جزئیات و مراحل خرید بر روی سایت سفرستان را ملاحظه نمایید .",
  },
  {
    question: "طریقۀ پرداخت هزینۀ بلیط و هتل در این سایت چیست ؟",
    answer: "از طریق کارت شتاب و به صورت آنلاین در درگاه سایت سفرستان",
  },
  {
    question:
      "برای کسانی که در خارج از کشور زندگی می کنند امکان خرید از سایت سفرستان وجود دارد ؟",
    answer:
      "مخاطبان ما از هر نقطه از جهان با داشتن اطلاعات مربوط به کارتهای اعتباری بانک های ایرانی عضو شتاب ، می توانند اقدام به خرید پرواز و هتل نمایند .",
  },
  {
    question: "فرآیند خرید به چه صورت است ؟",
    answer:
      "شامل مراحل : جستجو ، انتخاب ، ثبت و بررسی اطلاعات ، پرداخت هزینه و دریافت بلیط یا واچر",
  },
  {
    question:
      "شمارۀ ملی / شمارۀ پاسپورتم را در هنگام خرید دقیق به خاطر ندارم ، میتوانم این اطلاعات را بعداً وارد کنم و یا تغییر دهم ؟",
    answer:
      "خیر . وارد کردن تمامی موارد درج شده در صفحۀ ثبت اطلاعات مسافر ضروری می باشد و طبق قوانین ایرلاین ها پس از خرید امکان ویرایش اطلاعات وجود نخواهد داشت .",
  },
  {
    question: "آیا امکان تغییر نام بعد از خرید بلیط وجود دارد ؟",
    answer:
      "خیر ، بلیط غیر قابل انتقال به غیر است . مسئولیت ثبت اطلاعات نادرست درقسمت : نام ، نام خانوادگی ، کد ملی ، پاسپورت ، تاریخ تولد ، تاریخ انقضاء پاسپورت بر عهده مسافر خواهد بود .",
  },
  {
    question: "آیا برای انتخاب پرواز محدودیت زمانی وجود دارد ؟",
    answer:
      "بله. با توجه به اینکه کلیۀ اطلاعات نمایش داده شده به صورت آنلاین و مستقیماً از سیستم های رزرواسیون و تأمین کننده ها گرفته می شود ، برای قیمتها و ظرفیت نمایش داده شده محدودیت وجود دارد . در سایت سفرستان برای انتخاب پرواز 10 دقیقه زمان در نظرگرفته شده است. درصورتی که درمدت زمان مشخص شده پرواز مورد نظر را انتخاب نکنید پیغامی برروی صفحه ظاهر می گردد و از شما می خواهد که اطلاعات را به روز رسانی کنید و یا به صفحه اول بازگردید .",
  },
  {
    question:
      "اگر در روزهای تعطیل با سؤال و یا مشکلی مواجه شدم چگونه می توانم پیگیری کنم ؟",
    answer:
      "کارشناسان پشتیبانی ما همه روزه از ساعت 9 صبح تا 12 شب پاسخگو و پیگیر امور شما خواهند بود",
  },
];

export default function Faq() {
  return (
    <div className="bg-gray-200 pb-14">
      <div className="lg:w-4/5 w-11/12 m-auto pt-14">
        <p className="font-medium text-xl text-gray-500">سوالات متداول</p>
        <div className="mt-10">
          {faq.map(({ answer, question }) => (
            <>
              <Collapse
                className="bg-white rounded-lg p-3 my-4"
                additionalHeight={20}
                title={question}
              >
                <p className="mt-3 text-gray-500">{answer}</p>
              </Collapse>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
