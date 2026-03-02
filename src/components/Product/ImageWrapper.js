"use client";

import Image from "next/image";
import { useState } from "react";

const BLOCKED_HOSTS = ["i.ibb.co"];

const ImageWrapper = ({
  src,
  alt = "",
  fill = false,
  width,
  height,
  className,
  style,
  priority = false,
  ...props
}) => {
  const [useImg, setUseImg] = useState(false);

  if (!src) return null;

  const isBlockedHost = BLOCKED_HOSTS.some((host) =>
    src.includes(host)
  );

  // если источник проблемный — сразу img
  if (isBlockedHost || useImg) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        style={{
          objectFit: "contain",
          width: fill ? "100%" : width,
          height: fill ? "100%" : height,
          ...style,
        }}
        loading={priority ? "eager" : "lazy"}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      className={className}
      style={style}
      priority={priority}
      unoptimized={isBlockedHost}
      onError={() => setUseImg(true)} // fallback при ошибке
      {...props}
    />
  );
};

export default ImageWrapper;
