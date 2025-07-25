import { useEffect, useState } from "react";

export const useMediaQuery = ({ maxWidth, minWidth }) => {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      let query = "";

      if (maxWidth) {
        query += `(max-width: ${maxWidth}px)`;
      }
      if (minWidth) {
        if (query) {
          query += " and ";
        }
        query += `(min-width: ${minWidth}px)`;
      }

      const mediaQueryList = window?.matchMedia(query);
      const documentChangeHandler = () => setMatches(mediaQueryList.matches);

      documentChangeHandler();
      mediaQueryList.addEventListener("change", documentChangeHandler);

      return () =>
        mediaQueryList.removeEventListener("change", documentChangeHandler);
    }
  }, [maxWidth, minWidth]);

  return matches;
};
