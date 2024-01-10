"use client";

import { PersonalInformation, Security } from "@/components/pages/profile";
import MyTrips from "@/components/pages/profile/MyTrips";
import { useGetProfileInformation } from "@/hooks/profile";
import clsx from "clsx";
import Cookies from "js-cookie";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { List, Lock, User } from "react-feather";

const sidebarList = [
  {
    id: "1",
    text: "اطلاعات شخصی",
    icon: <User />,
    value: "info",
  },
  {
    id: "3",
    text: "تغییر رمز عبور",
    icon: <Lock size={20} className="mt-0.5" />,
    value: "security",
  },
  {
    id: "4",
    text: "سفر های من",
    icon: <List size={20} className="mt-0.5" />,
    value: "my-trips",
  },
];

export default function Profile() {
  const { profileInfoAction, getProfileInfoData } = useGetProfileInformation();

  const {
    brithDate,
    emailAddress,
    firstName,
    gender,
    lastName,
    mobileNo,
    nationality,
    userId,
  } = getProfileInfoData ?? {};

  const { push } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (Cookies.get("userTokenSafarestan")) {
      push("/profile?section=info");
      profileInfoAction();
    } else {
      push("/");
    }
  }, [push, Cookies.get]);

  const onSelect = (value: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    if (!value) {
      current.delete("section");
    } else {
      current.set("section", value);
    }

    const search = current.toString();
    const query = search ? `?${search}` : "";
    push(`${pathname}${query}`);
  };

  return (
    <div className="bg-gray-100">
      <div className="lg:px-40 rounded-lg py-4 lg:flex lg:gap-10 min-h-screen">
        <div className=" bg-white lg:w-1/5 w-11/12 m-auto lg:m-0  rounded-lg h-fit">
          {sidebarList.map(({ icon, text, id, value }, index) => (
            <div
              className={clsx("py-4 flex gap-2 px-8 cursor-pointer ", {
                "border-b-2 border-dashed border-gray-300":
                  index !== sidebarList.length - 1,
                "text-primary": searchParams.get("section") === value,
              })}
              key={id}
              onClick={() => onSelect(value)}
            >
              {icon}
              <p>{text}</p>
            </div>
          ))}
        </div>
        <div className="bg-white lg:w-4/5 w-11/12 m-auto mt-10 lg:mt-0 lg:m-0 py-4 px-8 rounded-lg">
          {searchParams.get("section") === "info" && (
            <PersonalInformation
              dateOfBirth={brithDate}
              email={emailAddress}
              gender={gender}
              lastName={lastName}
              name={firstName}
              nationality={nationality}
              phoneNumber={mobileNo}
              profileInfoAction={profileInfoAction}
            />
          )}
          {searchParams.get("section") === "security" && (
            <Security userId={userId} />
          )}
          {searchParams.get("section") === "my-trips" && <MyTrips />}
        </div>
      </div>
    </div>
  );
}
