"use client";

import Script from "next/script";

export default function GoogleReviewsOptIn({data}) {
  const {orderId,email, estimatedDeliveryDate } = data
  return (
    <>
      <Script
        src="https://apis.google.com/js/platform.js?onload=renderOptIn"
        strategy="afterInteractive"
      />

      <Script id="google-review-optin" strategy="afterInteractive">
        {`
          window.renderOptIn = function() {
            window.gapi.load('surveyoptin', function() {
              window.gapi.surveyoptin.render({
                merchant_id: 5761227059,
                order_id: "${orderId}",
                email: "${email}",
                delivery_country: "UA",
                estimated_delivery_date: "${estimatedDeliveryDate}"
              });
            });
          }
        `}
      </Script>
      
    </>
  );
}
