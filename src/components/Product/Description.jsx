import { useState } from "react";
const Description = ({ data }) => {
  console.log(data);
  return (
    <div>
      <p>
        <span className="product_price_title">Ціна: </span>
        <span className="product_price">{data.price} грн</span>
      </p>
      <p>
        <span className="product_title">Матеріал верху: </span>
        <span className="product_value">{data.material_top}</span>
      </p>
      <p>
        <span className="product_title">Матеріал всередині: </span>
        <span className="product_value">{data.material_inside}</span>
      </p>
      <p>
        <span className="product_title">Колір: </span>
        <span className="product_value">{data.color}</span>
      </p>
    </div>
  );
};

export default Description;
