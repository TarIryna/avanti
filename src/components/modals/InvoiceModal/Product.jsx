import { useEffect, useState } from "react";
import { getSizesList, getColorSimple, getVendor } from "@/data";
import { Select, Input } from "@/components/ui";
import { sizesGroup } from "@/data";
import Sizes from "./Sizes";
import * as S from './styles'
import Image from "next/image";
import toast from "react-hot-toast";


const InvoiceProduct = ({ product, addToInvoice, setProduct }) => {
    const image = product.small_image ?? product.images[0] ?? "";
    const [sizes, setSizes] = useState(() => getSizesList(product));
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(null);

    const handleAddToInvoice = () => {
        if (!price || !quantity){
            toast.error("Обов'язкові поля ціна та кількість!");
            return;
        }
        else {
           addToInvoice({ quantity, sizes, price, id: product._id })
        }
    }

    // 🌟 СИНХРОНИЗАЦИЯ: Если изменился сам продукт (например, пришла новая сетка с сервера), 
    // сбрасываем и обновляем локальный стейт размеров
    useEffect(() => {
        setSizes(getSizesList(product));
    }, [product?.sizesGroup, product?._id]);

    // Автоматический подсчет общего количества при изменении размеров
    useEffect(() => {
        if (!sizes) return;
        const totalQuantity = sizes.reduce((sum, el) => sum + (el?.q ? Number(el.q) : 0), 0);
        setQuantity(totalQuantity);
    }, [sizes]);

    const changeSizesGroup = async (e) => {
        if (!e) return;
        try {
            const response = await fetch(`/api/product/update`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    sizesGroup: e.toString(),
                    code: product.code
                }),
            });

            if (!response.ok) throw new Error("Ошибка сервера");
            const updatedProductFromDB = await response.json();
            
            if (updatedProductFromDB) {
                // 🌟 Перед отправкой наверх нормализуем поля так же, как делали в getList,
                // чтобы не сломать отображение (name, value)
                const formattedProduct = {
                    ...updatedProductFromDB,
                    name: `${updatedProductFromDB.model || product.model} ${getColorSimple(updatedProductFromDB.color)} ${getVendor(updatedProductFromDB.vendor) ?? ""}`,
                    value: updatedProductFromDB._id
                };

                // Передаем обновленный продукт в родительский стейт
                setProduct(formattedProduct);
                toast.success("Успішно змінено розмірну сітку");
            }
        } catch (error) {
            // console.error(error);
            console.log("=== КРИТИЧЕСКАЯ ОШИБКА FETCH ===");
            console.log("Тип ошибки:", typeof error);
            console.log("Имя ошибки:", error?.name || "Нет имени");
            console.log("Сообщение:", error?.message || "Нет сообщения");
            console.dir(error); // Разворачивает объект ошибки полностью
            toast.error("Виникла помилка при зміні розмірної сітки");
        }
    };

    return (
        <S.Wrapper>
            <S.Text>{`${product.code} ${product.name}`}</S.Text>
            <Select 
              options={sizesGroup} 
              label="Розмірна сітка"
              placeholder="Пошук із списку..."
              isInput={true}
              value={product.sizesGroup} // Используем value вместо defaultValue для реактивности
              onChange={changeSizesGroup}
              className="invoice-select"
            />
            <S.Flex>
                {image && <S.ImageCard>
                   <Image src={image} alt={image} fill/>
                </S.ImageCard>}
                <S.Quantity>{quantity}</S.Quantity>
                <Input
                    type="number"
                    value={price}
                    label="Ціна"
                    className="invoice"
                    isBorder
                    onValueChange={(e) => setPrice(e.target.value)}
                />
                <Sizes sizes={sizes} item={product} setSizes={setSizes}/>
               <S.Button onClick={handleAddToInvoice}>
                Додати в накладну
               </S.Button>
            </S.Flex>
        </S.Wrapper>
    );
};


export default InvoiceProduct