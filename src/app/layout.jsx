import "@/styles/globals.css";
import Nav from "@/components/Nav/Nav";
import { ClientProvider } from "@/components/GeneralProvider/ClientProvider";
import Footer from "@/components/Footer/Footer";
import Script from "next/script";

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
      <head>
        {/* ✅ Google Tag Manager */}
        <Script
          id="gtm-head"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];
              w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;
              j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-N6CBRZCW');
            `,
          }}
        />

        {/* ✅ Schema.org */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "ShoeStore",
                  name: "Avanti (Аванті)",
                  url: "https://avanti-shoes.com.ua/",
                  logo: "https://avanti-shoes.com.ua/logo.png",
                  image: "https://avanti-shoes.com.ua/banner.jpg",
                  telephone: "+380123456789",
                  email: "info@avanti-shoes.com.ua",
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: "вул. Примерна, 1",
                    addressLocality: "Ужгород",
                    addressRegion: "Закарпатська обл.",
                    postalCode: "88000",
                    addressCountry: "UA",
                  },
                  areaServed: "UA",
                  openingHoursSpecification: [
                    {
                      "@type": "OpeningHoursSpecification",
                      dayOfWeek: [
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                      ],
                      opens: "09:00",
                      closes: "19:00",
                    },
                  ],
                  sameAs: [
                    "https://www.instagram.com/avanti_shoes/",
                    "https://www.facebook.com/avanti.shops/",
                  ],
                },
                {
                  "@type": "Organization",
                  name: "Avanti",
                  url: "https://avanti-shoes.com.ua/",
                  logo: "https://avanti-shoes.com.ua/logo.png",
                  sameAs: [
                    "https://www.instagram.com/avanti_shoes/",
                    "https://www.facebook.com/avanti.shops/",
                  ],
                },
              ],
            }),
          }}
        />
      </head>

      <body>
        {/* ✅ GTM (noscript fallback) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-N6CBRZCW"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {/* ✅ Meta Pixel */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;
              n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}
              (window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');

              fbq('init', '2108223476665153');
              fbq('track', 'PageView');
            `,
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
