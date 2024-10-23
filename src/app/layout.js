import HeaderHome from "@/components/headerHome";
import "./globals.css";
import FooterHome from "@/components/footerHome";
import AppContent from "@/components/appContent";
import LoadingContent from "@/components/loadingContent";

export const metadata = {
  title: "Naja",
  description: "Make by @alva",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <AppContent>
          <LoadingContent>
            <HeaderHome />
            {children}
            <FooterHome />
          </LoadingContent>
        </AppContent>
      </body>
    </html>
  );
}
