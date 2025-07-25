import { InView } from "react-intersection-observer";
import { changePageAction } from "@/store/actions/products";

const IntersectionObserver = ({ page }) => {
  return (
    <InView
      as="div"
      onChange={(inView, entry) => {
        if (inView) changePageAction(page + 1);
      }}
    >
      <div style={{ height: 2 + "px" }}></div>
    </InView>
  );
};

export default IntersectionObserver;
