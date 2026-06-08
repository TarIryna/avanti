import * as S from './styles'

  const Select = ({options, label, placeholder, onChange, value}) => {
    return (
    <S.SelectContainer
      value={value}
      onChange={(e) => onChange(e)}
    >
      <option value="">{label}:</option>
      {options.map((item) => (
        <option value={item.value} key={item.id}>
          {item.name}
        </option>
      ))}
    </S.SelectContainer>)
    }
    export default Select