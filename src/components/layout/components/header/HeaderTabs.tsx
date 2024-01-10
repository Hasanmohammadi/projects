"use client";

import Link from "next/link";
import clsx from "clsx";
import { AirplaneTakeoffCircleIcon, BedIcon } from "@/assets/svg";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export default function HeaderTabs() {
  const pathname = usePathname();

  const tabs = useMemo(
    () => [
      {
        id: 0,
        text: "پرواز",
        value: "flight",
        icon: (
          <AirplaneTakeoffCircleIcon
            color={pathname.includes("flight") ? "#686868" : "#b3b3b3"}
          />
        ),
      },
      // {
      //   id: 1,
      //   text: "هتل",
      //   value: "hotel",
      //   icon: <BedIcon color={pathname === "/hotel" ? "#686868" : "#b3b3b3"} />,
      // },
    ],
    [pathname]
  );

  return (
    <div className="lg:flex hidden bg-gray-100 w-fit rounded-tr-lg rounded-tl-lg text-gray-400">
      {tabs.map(({ icon, id, text, value }, index) => (
        <Link
          key={id}
          href={`/${value}`}
          className={clsx("flex gap-3 px-6 py-3", {
            "rounded-tr-lg": !index,
            "bg-slate-200": pathname.includes(`${value}`),
            "rounded-tl-lg": tabs?.length - 1 === index,
          })}
        >
          {icon}
          <p
            className={clsx("font-bold text-base", {
              "text-gray-600": pathname.includes(`${value}`),
            })}
          >
            {text}
          </p>
        </Link>
      ))}
    </div>
  );
}
