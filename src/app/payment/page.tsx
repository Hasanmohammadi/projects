"use client";

import { TicketCard } from "@/components/pages/flight/result/components";
import { useFlightInfoContext, useFlightSearchResultContext } from "@/context";
import { useGetBank } from "@/hooks/bank";
import { usePostPriceDetail } from "@/hooks/book";
import { useRouter } from "next/navigation";
import { SetStateAction, useEffect, useState } from "react";

import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import clsx from "clsx";
import { CreditCard } from "react-feather";
import { useGetProduct, usePostCreateOnlinePayment } from "@/hooks/purchase";
import { Checkbox, CircularProgress } from "@mui/material";

export default function Payment() {
  const { departureFlightInfo, returnFlightInfo, flightGeneralInfo } =
    useFlightSearchResultContext();

  const { invoiceCode } = useFlightInfoContext();

  const [isAgree, setIsAgree] = useState(false);

  const [bankInfo, setBankInfo] = useState<{
    bankId: number;
    internationalTerminal: boolean;
  }>();

  const { push } = useRouter();

  useEffect(() => {
    if (!departureFlightInfo?.id) {
      push("/");
    }
  }, []);

  const { getBankData } = useGetBank();

  const { getProductData, productLoading } = useGetProduct({ invoiceCode });

  const {
    postCreateOnlinePaymentAction,
    postCreateOnlinePaymentLoading,
    postCreateOnlinePaymentData,
  } = usePostCreateOnlinePayment({
    onSuccess: ({ bankURL }) => {
      push(bankURL);
    },
  });

  const handleSelect = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setBankInfo((pre) => ({
      internationalTerminal: pre?.internationalTerminal as boolean,
      bankId: +event.target.value as number,
    }));
  };

  const onPay = () => {
    postCreateOnlinePaymentAction({
      agencyBankId: bankInfo?.bankId as number,
      callBackUrl: "http://localhost:3000/purchase-result",
      invoiceCode,
    });
  };

  return (
    <div className="bg-gray-200 pb-8">
      {departureFlightInfo?.id && (
        <div className="lg:w-4/5 w-11/12 m-auto pt-8 pb-4 rounded-xl">
          <TicketCard
            departureFlight={departureFlightInfo}
            currencyCode={flightGeneralInfo?.currencyCode}
            returnFlight={returnFlightInfo}
            groupFares={flightGeneralInfo?.groupFares}
            groupId={flightGeneralInfo?.groupId}
            id={flightGeneralInfo?.id}
            passengersCount={{
              adult: flightGeneralInfo.passengersCount.adult,
              child: flightGeneralInfo.passengersCount.child,
              infant: flightGeneralInfo.passengersCount.infant,
            }}
            oneAdultTotalFare={flightGeneralInfo?.oneAdultTotalFare}
            totalFareAmount={flightGeneralInfo?.totalFareAmount}
            isBookPage
            priceDetailsFareAmount={getProductData?.totalAmount}
          />
        </div>
      )}
      <div className="lg:w-4/5 w-11/12 bg-white m-auto lg:p-8 p-4 flex flex-col-reverse lg:flex-row lg:justify-between rounded-xl">
        <div className="lg:mt-0 mt-8">
          <p className="mt-2 font-semibold">
            مبلغ نهایی:{" "}
            {productLoading ? (
              <CircularProgress size={20} className="mr-4" />
            ) : (
              <span className="font-semibold">
                {getProductData?.totalAmount.toLocaleString()} ریال
              </span>
            )}
          </p>
          <div className="mt-2">
            <p>قوانین پرداخت :</p>
            <FormControlLabel
              label=""
              control={
                <Checkbox
                  defaultChecked={isAgree}
                  onChange={(e) => setIsAgree(e.target.checked)}
                />
              }
            />
            <p></p>
          </div>
        </div>

        <FormControl className="">
          <p className="font-semibold">درگاه پرداخت خود را انتخاب کنید</p>
          <RadioGroup
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={bankInfo?.bankId}
            onChange={handleSelect}
          >
            {getBankData?.map(
              ({
                active,
                title,
                agencyBankId,
                internationalTerminal,
                bankId,
              }) =>
                !internationalTerminal && (
                  <div
                    key={bankId}
                    className={clsx(
                      "lg:h-10 flex justify-between mt-5  border-2 border-gray-400  rounded-lg px-4  w-full lg:w-80",
                      { "border-red-500": agencyBankId === bankInfo?.bankId }
                    )}
                    style={{ direction: "ltr" }}
                  >
                    <FormControlLabel
                      value={agencyBankId}
                      control={
                        <Radio
                          sx={{
                            color: "#a4a4a4",
                            "&.Mui-checked": {
                              color: "#FF6B6B",
                            },
                          }}
                          disabled={!active}
                        />
                      }
                      label={<span>{title}</span>}
                      className="flex gap-2 flex-row-reverse"
                    />
                    <div className="self-center">
                      <CreditCard />
                    </div>
                  </div>
                )
            )}
          </RadioGroup>
        </FormControl>
      </div>
      <button
        disabled={!isAgree || !bankInfo?.bankId}
        type="submit"
        className={clsx(
          "rounded-full w-56 py-2 flex justify-center text-white font-bold text-lg m-auto mt-8",
          {
            "bg-gray-300": !isAgree || !bankInfo?.bankId,
            "bg-primary ": isAgree && bankInfo?.bankId,
          }
        )}
        onClick={onPay}
      >
        ثبت اطلاعات
      </button>
    </div>
  );
}
