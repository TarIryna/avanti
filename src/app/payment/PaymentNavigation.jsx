"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const REDIRECT_SECONDS = 5;
const STATUS_CHECKS = 10;

export default function PaymentNavigation({ status }) {
  const router = useRouter();
  const [seconds, setSeconds] = useState(REDIRECT_SECONDS);
  const [checks, setChecks] = useState(0);

  useEffect(() => {
    if (status === "paid" && seconds > 0) {
      const timer = setTimeout(() => {
        if (seconds === 1) router.replace("/");
        setSeconds(seconds - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
    if (status === "pending" && checks < STATUS_CHECKS) {
      const timer = setTimeout(() => {
        router.refresh();
        setChecks(checks + 1);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [status, seconds, checks, router]);

  if (status === "paid") {
    return seconds > 0 && <p>Перехід на головну через {seconds} с.</p>;
  }
  if (status === "pending" && checks === STATUS_CHECKS) {
    return <button type="button" onClick={() => router.refresh()}>Перевірити статус</button>;
  }
  return null;
}
