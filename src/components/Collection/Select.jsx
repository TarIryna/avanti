import { SelectControl } from '@/components/ui/Select/Select';
const Select = ({ array, active, setActive, name, title }) => {
  const handleChange = (e) => {
    const value = e.target.value;
    setActive(value);
  };

  return (
    <form className="select">
      <SelectControl name={name} onChange={handleChange}>
        <option value={null}>{title}</option>
        {array &&
          array.map((item) => (
            <option
              value={item.query ? item.query : item}
              selected={active}
              key={item.name}
            >
              {item.name ? item.name : item}
            </option>
          ))}
      </SelectControl>
    </form>
  );
};

export default Select;
