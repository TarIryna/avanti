"use client";

import Card from "./Card/Card";

const List = ({ data }) => {
  return (
    <div className="cards-list">
      {data && data.map((item) => <Card item={item} key={item.code} />)}
    </div>
  );
};

export default List;
