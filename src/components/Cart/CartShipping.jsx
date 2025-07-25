import { useEffect, useState } from "react";
import debounce from "debounce";
import { useUser } from "@/store/selectors";

const CartShipping = () => {
  const user = useUser()?.user?.user;
  const userCity = user?.city;
  const userAdress = user?.adress;

  const isUserDeliveryData =
    userCity?.length > 0 && userAdress?.length > 0 ? true : false;

  const [regions, setRegions] = useState(null);
  const [value, setValue] = useState("");
  const [city, setCity] = useState(userCity ?? "");
  const [adresses, setAdresses] = useState([]);
  const [adress, setAdress] = useState(userAdress ?? "");
  const [showSelects, setShowSelects] = useState(true);

  const fetchRegions = async (query) => {
    const response = await fetch(
      `/api/shipping/novaposhta/cities?query=${query}`
    );
    const data = await response?.json();
    if (data) setRegions(data.data);
  };

  const fetchAddress = async (id) => {
    const response = await fetch(`/api/shipping/novaposhta/adress?query=${id}`);
    const data = await response?.json();
    if (data) setAdresses(data.data);
  };

  useEffect(() => {
    fetchRegions(value);
  }, []);

  useEffect(() => {
    if (isUserDeliveryData) setShowSelects(false);
    else setShowSelects(true);
  }, [isUserDeliveryData]);

  useEffect(() => {
    fetchRegions(value);
  }, [value]);

  useEffect(() => {
    if (!city) return;
    if (!city.ref) return;
    fetchAddress(city.ref);
  }, [city]);

  const renderOptions = (array, name) => (
    <select
      name="cities"
      id={name}
      className="cart_shipping__select"
      onChange={
        name === "city"
          ? debounce(selectCity, 200)
          : debounce(selectAdress, 200)
      }
    >
      <option value="">
        {name === "city" ? "Виберіть місто" : "Виберіть відділення"}:
      </option>
      {array.length > 0 &&
        array.map((item) => (
          <option value={item.Description} id={item.Ref}>
            {item.Description}
          </option>
        ))}
    </select>
  );

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const selectCity = (e) => {
    setCity({ name: e.target.children[1].value, ref: e.target.children[1].id });
  };

  const selectAdress = (e) => {
    setAdress({
      name: e.target.children[1].value,
      ref: e.target.children[1].id,
    });
  };

  const changeDelivery = () => {
    setShowSelects(true);
  };

  return (
    <div>
      {showSelects ? (
        <h3>Оберіть способи доставки:</h3>
      ) : (
        <h3>Реквізити доставки:</h3>
      )}
      <h4>Нова пошта</h4>
      {!showSelects && (
        <>
          <input
            name="city"
            value={city}
            disabled
            className="cart_shipping__input"
          />
          <input
            name="adress"
            value={adress}
            disabled
            className="cart_shipping__input"
          />
          <button onClick={changeDelivery}>Змінити реквізити доставки</button>
        </>
      )}

      {showSelects && (
        <>
          <input
            value={value}
            onChange={onChange}
            className="cart_shipping__input"
            placeholder="Почніть вводити назву міста і виберіть із списку"
          />
          {regions && renderOptions(regions, "city")}
          {adresses?.length > 0 && renderOptions(adresses, "adress")}
        </>
      )}

      {adress && <button className="block">Підтвердити замовлення</button>}
      {adress && <p>Після підтвердження очікуйте дзвінка менеджера</p>}
    </div>
  );
};
export default CartShipping;
