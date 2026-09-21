import Link from "next/link";
import { Button } from "../ui"
import { usePathname } from 'next/navigation';


const ButtonBack = () => {
    const pathname = usePathname();
    const parentPath = pathname.substring(0, pathname.lastIndexOf('/')) || '/';
    return (
        <Button>
            <Link href={parentPath}>Назад</Link>
        </Button>
    )
}

export default ButtonBack