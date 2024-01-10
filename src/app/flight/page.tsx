import { FlightInformation, FlightSearchBox } from "@/components/pages/flight";
import { headers } from "next/headers";

export default function Flight() {
  const headersList = headers();
  const userAgent = headersList.get("user-agent")?.includes("Mobile");

  return (
    <>
      <div className="lg:min-h-screen items-center flight-main-page overflow-y-hidden bg-gray-200 h-screen">
        <FlightSearchBox className="w-full px-4" />
      </div>
      <FlightInformation />
    </>
  );
}
