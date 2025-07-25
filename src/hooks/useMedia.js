import { useMediaQuery } from "react-responsive";

export const useIsDesktop = () => useMediaQuery({ minWidth: 1025 });
export const useIsTablet = () => useMediaQuery({ maxWidth: 1024 });
export const useIsMobile = () => useMediaQuery({ maxWidth: 767 });
export const useIsSmallMobile = () => useMediaQuery({ maxWidth: 540 });

export const useMinResponsive = (min) => useMediaQuery({ minWidth: min });
export const useMaxResponsive = (max) => useMediaQuery({ maxWidth: max });
