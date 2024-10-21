import "./globals.css";

export const metadata = {
  title: "Naja",
  description: "Make by @alva",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
