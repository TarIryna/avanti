"use client";
import Order from "./Order";

const OrdersList = ({ data }) => {
  return (
    <div className="flex-col">
      {data && data.map((item) => <Order item={item} key={item._id} />)}
    </div>
  );
};

export default OrdersList;
