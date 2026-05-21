import * as S from './styles'
import { usePathname, useRouter } from "next/navigation";

const MenuItem = ({item}) => {
  const router = useRouter();
  const pathname = usePathname();

   const handleClick = () => {
    router.push(`${pathname}/${item.value}`);
  };

    return (
        <S.MenuButton onClick={handleClick}>{item.name}</S.MenuButton>
    )
}

export default MenuItem