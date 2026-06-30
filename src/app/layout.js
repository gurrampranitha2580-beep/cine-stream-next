import Navbar from "../components/Navbar";
import ReduxProvider from "../store/Provider";

import "./globals.css";

export const metadata = {
  title: "CineStream",
  description: "Movie discovery app built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <Navbar />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}