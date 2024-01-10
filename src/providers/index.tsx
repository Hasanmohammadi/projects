import axios from "axios";
import ReactQueryProvider from "./ReactQueryProvider";
import {
  FlightInfoContextProvider,
  FlightSearchResultContextProvider,
  UserInfoContextProvider,
} from "@/context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const axiosInstance = axios.create({
  baseURL: "http://172.31.30.228:8006/api/",
  headers: {
    InstanceId: "C50EEE38-DE25-40CA-A05F-8186ACDEDD9D",
  },
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <ToastContainer hideProgressBar position="bottom-right" />
      <FlightInfoContextProvider>
        <FlightSearchResultContextProvider>
          <UserInfoContextProvider>
            <ReactQueryProvider>{children}</ReactQueryProvider>
          </UserInfoContextProvider>
        </FlightSearchResultContextProvider>
      </FlightInfoContextProvider>
    </div>
  );
}
