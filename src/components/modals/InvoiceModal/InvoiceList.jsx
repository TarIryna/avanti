import * as S from "./styles";
import ListItem from "./ListItem";

const InvoiceList = ({ items, setItems }) => {
  const deleteItem = (id) => {
    console.log('delete')
    const newList = items.filter((item) => item.productCode !== id);
    setItems(newList);
  };

  const updateItems = (updatedSizes, code, price) => {
    const newItem = items.find((i) => i.productCode === code);
    if (newItem) {
      const quantity = updatedSizes.reduce((sum, el) => sum + (el.q || 0), 0);
      newItem.sizes = updatedSizes;
      newItem.quantity = quantity;
      newItem.price = price;
      newItem.total = Math.round(quantity * price * 100) / 100;
    }
    setItems((prevItems) =>
      prevItems.map((item) => (item.productCode === newItem.productCode ? newItem : item)),
    );
  };

  return (
    <S.ListWrapper>
      {!!items?.length &&
        items.map((item) => (
          <ListItem
            item={item}
            updateItems={updateItems}
            deleteItem={deleteItem}
            key={item.productCode}
          />
        ))}
    </S.ListWrapper>
  );
};

export default InvoiceList;
