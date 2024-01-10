"use client";
import { PhoneIcon, SafarestanLogo, UserIcon } from "@/assets/svg";
import Cookies from "js-cookie";
import { Menu, Modal } from "@/components/common";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HeaderTabs } from "./components/header";
import SignInModal from "./components/header/signInModal/SignInModal";
import RegisterModal from "./components/header/signInModal/RegisterModal";
import { LogOut } from "react-feather";
import { useGetProfileInformation } from "@/hooks/profile";
import { useRouter } from "next/navigation";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<"signIn" | "register">("signIn");
  const [isClient, setIsClient] = useState(false);
  const { push } = useRouter();

  const { getProfileInfoData } = useGetProfileInformation();

  useEffect(() => {
    setIsClient(true);
  }, [getProfileInfoData]);

  const onModalClose = () => {
    setIsOpen(false);
    setModalType("register");
  };

  return (
    <div className="w-full bg-white text-black lg:px-40 pt-4 flex flex-col gap-4 px-4">
      <div className="flex justify-between items-center">
        <Link href="/">
          <SafarestanLogo className="lg:mb-0 mb-4" />
        </Link>
        <div className="flex items-center">
          {isClient && !Cookies.get("userTokenSafarestan") ? (
            <div
              className="flex gap-2 lg:px-6 px-3 lg:border-r-2 lg:border-r-gray-200 h-8 items-center cursor-pointer"
              onClick={() => setIsOpen(true)}
            >
              <UserIcon />
              <span className="text-gray-400 lg:block hidden">
                {Cookies.get("userTokenSafarestan")
                  ? "پروفایل"
                  : "ورود- ثبت نام"}
              </span>
            </div>
          ) : (
            <Menu
              hasArrow={false}
              btnText={
                <div className="flex gap-2 lg:px-6 px-3 lg:border-r-2 border-r-gray-200 h-8 items-center cursor-pointer">
                  <UserIcon />
                  <span className="text-gray-400 lg:block hidden">
                    {isClient && Cookies.get("userTokenSafarestan")
                      ? getProfileInfoData?.firstName &&
                        `... ${(
                          getProfileInfoData?.firstName +
                          " " +
                          getProfileInfoData?.lastName
                        )?.slice(0, 10)}`
                      : "ورود- ثبت نام"}
                  </span>
                </div>
              }
              menuItems={[
                {
                  text: (
                    <Link
                      href="/profile"
                      className="flex px-3 h-8 justify-between gap-4 cursor-pointer"
                    >
                      <UserIcon />
                      <p className="text-gray-400">پروفایل</p>
                    </Link>
                  ),
                  onClick: () => {},
                },
                {
                  text: (
                    <div
                      className="flex pl-3 pr-2 h-8 justify-between gap-4 cursor-pointer"
                      onClick={() => setIsOpen(true)}
                    >
                      <LogOut color="#A2A2A2" size={20} />
                      <span className="text-gray-400">خروج</span>
                    </div>
                  ),
                  onClick: () => {
                    Cookies.remove("userTokenSafarestan");
                    push("/");
                  },
                },
              ]}
            />
          )}
          <Link
            href="/contact-us"
            className="flex gap-2 lg:px-6 px-3 lg:border-r-2 lg:border-r-gray-200 h-8 items-center cursor-pointer"
          >
            <PhoneIcon />
            <span className="text-gray-400 lg:block hidden">تماس با ما</span>
          </Link>
        </div>
      </div>
      <HeaderTabs />

      <Modal open={isOpen} onClose={onModalClose}>
        <>
          {modalType === "signIn" && (
            <SignInModal setIsOpen={setIsOpen} setModalType={setModalType} />
          )}
          {modalType === "register" && (
            <RegisterModal setIsOpen={setIsOpen} setModalType={setModalType} />
          )}
        </>
      </Modal>
    </div>
  );
}
