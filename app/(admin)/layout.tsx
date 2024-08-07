import type { Metadata } from "next";
import "@/app/globals.css";
import AdminProvider from "@/AppProvider/AdminProvider";
import { Sidebar, ToastProvider } from "@/components";
import NavbarAdmin from "@/components/Admin/Navbar";

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
          <AdminProvider>
            <ToastProvider>
              <section className="flex h-full w-full">
                <Sidebar />

                <div className="h-full w-full bg-lightPrimary">
                  <main className='mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px]' >
                    <div className="h-full">
                      <NavbarAdmin></NavbarAdmin>

                      <div className="pt-8 mx-auto mb-auto h-full min-h-[90vh] p-2 md:pr-2">
                        {children}
                      </div>
                    </div>
                  </main>
                </div>
              </section>
            </ToastProvider>
          </AdminProvider>
            
      </body>
    </html>
  );
}
