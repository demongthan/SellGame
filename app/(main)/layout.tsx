import type { Metadata } from "next";
import "@/app/globals.css";
import { Footer, Header, ToastProvider } from "@/components";
import GlobalProvider from "@/AppProvider/GlobalProvider";

export const metadata: Metadata = {
  title: "Nick.vn Shop game online số 1 Việt Nam",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-customFont">
      <GlobalProvider>
          <ToastProvider>
            <Header></Header>
              <div className="pt-[140px]">
                {children}
              </div>
            <Footer></Footer>
          </ToastProvider>
      </GlobalProvider>
      </body>
    </html>
  );
}
