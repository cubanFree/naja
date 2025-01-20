import "./globals.css";
import AppContent from "@/components/appContent";

export const metadata = {
    title: "Naja",
    description: "Make by @alva",
};

export default function RootLayout({ children }) {
    return (
        <html>
            <body className="h-screen flex flex-col">
                <AppContent>
                    {children}
                </AppContent>
            </body>
        </html>
    );
}
