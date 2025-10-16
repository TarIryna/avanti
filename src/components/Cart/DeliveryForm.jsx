// import { useEffect, useState } from "react";
// import debounce from "debounce";
// import { useUser } from "@/store/selectors";
// import * as S from "./styles";

// const CartShipping = () => {
//   const user = useUser()?.user?.user;
//   const userCity = user?.city;
//   const userAdress = user?.adress;

//   const isUserDeliveryData =
//     userCity?.length > 0 && userAdress?.length > 0 ? true : false;

//   const [regions, setRegions] = useState(null);
//   const [value, setValue] = useState("");
//   const [city, setCity] = useState(userCity ?? "");
//   const [adresses, setAdresses] = useState([]);
//   const [adress, setAdress] = useState(userAdress ?? "");
//   const [showSelects, setShowSelects] = useState(true);

//   const fetchRegions = async (query) => {
//     console.log(query);
//     const response = await fetch(
//       `/api/shipping/novaposhta/cities?query=${query}`
//     );
//     const data = await response?.json();
//     console.log(data);
//     if (data) setRegions(data.data);
//   };

//   const fetchAddress = async (id) => {
//     const response = await fetch(`/api/shipping/novaposhta/adress?query=${id}`);
//     const data = await response?.json();
//     if (data) setAdresses(data.data);
//   };

//   useEffect(() => {
//     fetchRegions(value);
//   }, []);

//   useEffect(() => {
//     if (isUserDeliveryData) setShowSelects(false);
//     else setShowSelects(true);
//   }, [isUserDeliveryData]);

//   useEffect(() => {
//     const debouncedFetch = debounce(() => fetchRegions(value), 500);
//     debouncedFetch();
//   }, [value]);

//   useEffect(() => {
//     if (!!userCity) {
//       setCity(userCity);
//     }
//   }, [userCity]);

//   useEffect(() => {
//     if (!city) return;
//     if (!city.ref) return;
//     fetchAddress(city.ref);
//   }, [city]);

//   const renderOptions = (array, name) => (
//     <S.Select
//       name="cities"
//       id={name}
//       onChange={
//         name === "city"
//           ? debounce(selectCity, 200)
//           : debounce(selectAdress, 200)
//       }
//     >
//       <option value="">
//         {name === "city" ? "Виберіть місто" : "Виберіть відділення"}:
//       </option>
//       {array.length > 0 &&
//         array.map((item) => (
//           <option value={item.Description} id={item.Ref}>
//             {item.Description}
//           </option>
//         ))}
//     </S.Select>
//   );

//   const onChange = (e) => {
//     setValue(e.target.value);
//   };

//   const selectCity = (e) => {
//     setCity({ name: e.target.children[1].value, ref: e.target.children[1].id });
//   };

//   const selectAdress = (e) => {
//     setAdress({
//       name: e.target.children[1].value,
//       ref: e.target.children[1].id,
//     });
//   };

//   const changeDelivery = () => {
//     setShowSelects(true);
//   };

//   return (
//     <>
//       {showSelects ? (
//         <h3>Оберіть способи доставки:</h3>
//       ) : (
//         <h3>Реквізити доставки:</h3>
//       )}
//       <h4>Нова пошта</h4>
//       {(!showSelects || city) && (
//         <>
//           <S.Input name="city" value={city} disabled />
//           <S.Input name="adress" value={adress} disabled />
//           <button onClick={changeDelivery}>Змінити реквізити доставки</button>
//         </>
//       )}

//       {showSelects && (
//         <>
//           <S.Input
//             value={value}
//             onChange={onChange}
//             placeholder="Почніть вводити назву міста і виберіть із списку"
//           />
//           {regions && renderOptions(regions, "city")}
//           {adresses?.length > 0 && renderOptions(adresses, "adress")}
//         </>
//       )}

//       {adress && <button className="block">Підтвердити замовлення</button>}
//       {adress && <p>Після підтвердження очікуйте дзвінка менеджера</p>}
//     </>
//   );
// };
// export default CartShipping;

// "use client";
import { useState } from "react";
// import SelectWithSearch from "./SelectWithSearch";
import SearchSelect from "../ui/SearchSelect/SearchSelect";
import { useUser } from "@/store/selectors";

const DeliveryForm = ({ register }) => {
  const [cityRef, setCityRef] = useState("");
  const [addressRef, setAddressRef] = useState("");
  const { user } = useUser();

  return (
    <>
      <h3>Оберіть місто:</h3>
      <SearchSelect
        {...register("city")}
        defaultValue={user.city}
        fetchOptions={async (query) => {
          const res = await fetch(
            `/api/shipping/novaposhta/cities?query=${query}`
          );
          const json = await res.json();
          return json.data.map((c) => ({
            value: c.Ref,
            label: c.Description,
          }));
        }}
        onChange={(val) => setCityRef(val)}
      />

      {cityRef && (
        <>
          <h3 className="mt-4">Оберіть відділення / поштамат:</h3>
          <SearchSelect
            {...register("address")}
            defaultValue=""
            fetchOptions={async () => {
              const res = await fetch(
                `/api/shipping/novaposhta/adress?query=${cityRef}`
              );
              const json = await res.json();
              return json.data.map((a) => ({
                value: a.Ref,
                label: a.Description,
              }));
            }}
            onChange={(val) => setAddressRef(val)}
          />
        </>
      )}
    </>
  );
};

export default DeliveryForm;
