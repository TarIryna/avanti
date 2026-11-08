import { useLayoutEffect, useRef, useState } from "react";
import * as S from "./styles";

const Code39 = ({ value }) => {
  const code = String(value ?? "").trim().toUpperCase();
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [scale, setScale] = useState(1);
  const encoded = `*${code}*`;
  const fontSize = Math.min(28, Math.max(16, 220 / encoded.length));

  useLayoutEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;
    if (!container || !text) return;
    let active = true;
    const fit = () => {
      if (!active) return;
      const availableWidth = Math.max(0, container.clientWidth - 8);
      setScale(Math.min(1, availableWidth / Math.max(1, text.offsetWidth)));
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(container);
    document.fonts.ready.then(fit);
    window.addEventListener("beforeprint", fit);
    window.addEventListener("afterprint", fit);
    return () => {
      active = false;
      observer.disconnect();
      window.removeEventListener("beforeprint", fit);
      window.removeEventListener("afterprint", fit);
    };
  }, [encoded, fontSize]);

  if (!code || !/^[0-9A-Z. $\/+%-]+$/.test(code)) return null;

  return (
    <S.BarcodeFont ref={containerRef} role="img" aria-label={`Code 39: ${code}`} style={{ fontSize: `${fontSize}pt` }}>
      <span ref={textRef} style={{ transform: `scaleX(${scale})` }}>{encoded}</span>
    </S.BarcodeFont>
  );
};

export default Code39;
