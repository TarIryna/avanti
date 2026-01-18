export const FilterSelect = ({options, label, currentValue, updateParam}) => {
       return (
        <select
          id={label}
          className={`filter__select${currentValue !== '' ? '_current' : ''}`}
          value={currentValue}
          onChange={(e) => updateParam(label, e.target.value)}
        >
          <option value="">
            {label === "season"
              ? "Сезон"
              : label === "gender"
              ? "Стать"
              : label === "color"
              ? "Колір"
              : label === "material"
              ? "Матеріал верху"
              : label === "sort"
              ? "Сортувати за"
              : label === "limits"
              ? "Кількість на сторінці"
              : "Вигляд"}
            :
          </option>
          {options.map((item, index) => (
            <option value={item.query ?? item} key={item.query ?? item ?? index}>
              {item.filterName ?? item.name ?? item}
            </option>
          ))}
        </select>
      );
}