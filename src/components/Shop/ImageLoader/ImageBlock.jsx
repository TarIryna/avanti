import * as S from './styles'
import Image from 'next/image'

const ImageBlock = ({ image }) => {
    return (
        <S.ImageContainer>
            
            <Image src={image} fill/>
        </S.ImageContainer>
    )
}

export default ImageBlock