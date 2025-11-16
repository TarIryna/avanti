import "@/styles/globals.css";
import Nav from "@/components/Nav/Nav";
import { ClientProvider } from "@/components/GeneralProvider/ClientProvider";
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
        <ClientProvider>
          <div className="main">
            <div className="gradient" />
          </div>

          <main className="app">
            <Toaster position="top-right" />
            <Nav />
            {children}
            <Footer />
          </main>
        </ClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
