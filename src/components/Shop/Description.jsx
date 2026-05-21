import * as S from './styles'

const Description = ({label, text}) => {
    return (
        <S.Text>{text}
            <S.Label>{label}</S.Label>
        </S.Text>
    )
} 
export default Description