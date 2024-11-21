
import Providers from "@/components/Provider";
import "./globals.css";



export const metadata = {
  title: "Online Auction",
  description: "Your Gateway to Seamless Auctions and Competitive Bidding",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <Providers>

      <body>
        {children}
      </body>
        </Providers>
    </html>
  );
}
