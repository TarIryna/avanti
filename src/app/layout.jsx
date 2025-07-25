import "@/styles/globals.css";
import Nav from "@/components/Nav/Nav";
import ProviderNext from "@/components/Provider";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer/Footer";

export const metadata = {
  title: "Avanti shoes bags",
  description: "взуття сумки ужгород кросівки",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="ua">
      <body>
        <ProviderNext>
          <div className="main">
            <div className="gradient" />
          </div>

          <main className="app">
            <Toaster position="top-right" />
            <Nav />
            {children}
            <Footer />
          </main>
        </ProviderNext>
      </body>
    </html>
  );
};

export default RootLayout;
