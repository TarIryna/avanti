import "@/styles/globals.css";
import Nav from "@/components/Nav/Nav";
import { ClientProvider } from "@/components/GeneralProvider/ClientProvider";
import Footer from "@/components/Footer/Footer";

export const metadata = {
  title: {
    default: "Avanti — взуття та сумки",
    template: "%s | Avanti",
  },
  description:
    "Avanti — інтернет-магазин взуття та сумок. Жіноче, чоловіче та дитяче взуття з доставкою по Україні.",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="uk">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ShoeStore",
              "name": "Avanti (Аванті)",
              "url": "https://avanti-shoes.com.ua/",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Ужгород",
                "addressCountry": "UA"
              },
              "areaServed": "UA"
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "ShoeStore",
                  "name": "Avanti (Аванті)",
                  "url": "https://avanti-shoes.com.ua/",
                  "logo": "https://avanti-shoes.com.ua/logo.png",
                  "image": "https://avanti-shoes.com.ua/banner.jpg",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "вул. Примерна, 1",
                    "addressLocality": "Ужгород",
                    "addressRegion": "Закарпатська обл.",
                    "postalCode": "88000",
                    "addressCountry": "UA"
                  },
                  "telephone": "+380123456789",
                  "email": "info@avanti-shoes.com.ua",
                  "areaServed": "UA",
                  "sameAs": [
                    "https://www.instagram.com/avanti_shoes/",
                    "https://www.facebook.com/avanti.shops/"
                  ],
                  "openingHoursSpecification": [
                    {
                      "@type": "OpeningHoursSpecification",
                      "dayOfWeek": [
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday"
                      ],
                      "opens": "09:00",
                      "closes": "20:00"
                    }
                  ]
                },
                {
                  "@type": "Organization",
                  "name": "Avanti (Аванті)",
                  "url": "https://avanti-shoes.com.ua/",
                  "logo": "https://avanti-shoes.com.ua/logo.png",
                  "sameAs": [
                    "https://www.instagram.com/avanti_shoes/",
                    "https://www.facebook.com/avanti.shops/"
                  ]
                }
              ]
            }),
          }}
        />


        <ClientProvider>
          <div className="main">
            <div className="gradient" />
          </div>

          <main className="app">
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

