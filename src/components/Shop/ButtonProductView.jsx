import Link from "next/link";
import { Button } from "../ui"
import { usePathname } from 'next/navigation';


const ButtonProductView = () => {
    const pathname = usePathname();
    const parentPath = pathname.substring(0, pathname.lastIndexOf('/')) || '/';
    return (
        <Button>
            <Link href={`${parentPath}/product/view`}>Товар перегляд</Link>
        </Button>
    )
}

export default ButtonProductView