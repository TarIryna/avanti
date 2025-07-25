import Select from "./Select";
import { tabsData, seasons, views } from "@/utils/data";

const SelectList = ({ filter, setFilter }) => {
  const handleChange = (e) => {};
  const arrayViews = views();

  return (
    <div className="select-list">
      <Select
        name="gender"
        array={tabsData}
        active={filter.gender}
        title="Для кого"
      />
      <Select
        name="season"
        array={seasons}
        active={filter.season}
        title="Сезон"
      />
      <Select
        name="view"
        array={arrayViews}
        active={filter.view}
        title="Вигляд"
      />
    </div>
  );
};

export default SelectList;
