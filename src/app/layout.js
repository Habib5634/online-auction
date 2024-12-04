
import Providers from "@/components/Provider";
import "./globals.css";
import { Toaster } from "react-hot-toast";



export const metadata = {
  title: "Online Auction",
  description: "Your Gateway to Seamless Auctions and Competitive Bidding",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body>
        <Providers>
      <Toaster position="top-right" />
        {children}
        </Providers>
      </body>
    </html>
  );
}
