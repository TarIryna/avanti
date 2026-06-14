"use client";
import { getSizesList } from "@/data/sizes";
import * as S from './styles'
import { Controller, useFormContext, FormProvider, useForm  } from "react-hook-form";
import { Button, Input } from "@/components/ui";
import { toast } from "react-hot-toast";

const SizesChange = ({ item, setProduct, addToCheck, shop, type, comment, staff, isOrder }) => {
  const methods = useForm({ mode: "onSubmit" });
  const { handleSubmit, control, reset } = methods;
  const buttonText = type === "arrival" ? "Оформити прихід" : type === "return" ? "Офрмити повернення" : type === "sale" ? "Оформити продаж" : "Оформити списання"
  const isAddFunction = type === "return" || type === "arrival"

 const onSubmit = async (data) => {
  try {
    const existingSizes = isOrder ? item.sizes : [...(item.sizes_all?.[shop?.toString()] || [])];

    // размеры, которые реально участвуют в операции
    const operationSizes = Object.entries(data)
      .filter(([_, qty]) => Number(qty) > 0)
      .map(([size, qty]) => ({
        size,
        q: Number(qty),
      }));

  if (!operationSizes.length) {
      return;
    }

    for (const { size, q } of operationSizes) {
      const existing = existingSizes.find((s) => s.size === size);

      if (isAddFunction) {
        if (existing) {
          existing.q += q;
        } else {
          existingSizes.push({
            size,
            q,
          });
        }
      } else if (!isAddFunction){
        // списание

        if (!existing) {
           toast.error(`Розмір ${size} відсутній на складі`);
           reset()
          return;
        }

        if (existing.q < q ) {
          toast.error(
            `Недостатньо залишку для розміру ${size}. Є ${existing.q}, потрібно ${q}`
          );
          return;
        }

        existing.q -= q;
      }
    }

    // const updatedSizes = existingSizes
    //   // .filter((s) => s.q > 0)
    //   .sort((a, b) => Number(a.size) - Number(b.size));

  if (type === 'return' || type === "sale" && typeof addToCheck === 'function'){
      addToCheck(operationSizes)
      return
      }

    const newItem = {
      ...item,
        size: operationSizes,
        comment: comment ? comment : "",
        staff: staff ? Number(staff) : null
      }
    const items = [newItem]

    if (isOrder) {
       const response = await fetch("/api/shop/change-sizes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        item: newItem,
        type
   }),
    });
      const result = await response.json();
    if (result.success) {
          setProduct(null);
          reset();
        }

    }
    else {
      const response = await fetch("/api/shop/operation/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items,
        shop,
        type
      }),
    });
      const result = await response.json();
    if (result.success) {
          setProduct(null);
          reset();
        }
    }

  } catch (error) {
    console.error(error);
  }
};

  const sizes = getSizesList(item);

  return (
    <FormProvider {...methods}>
      <S.SizesWrapper>
        <S.SizesForm onSubmit={handleSubmit(onSubmit)}>
          <S.List>
            {shop && <div>A{shop}</div>}
            {sizes?.map((el) => {
              if (!el) return null;

              return (
                <S.BlockContainer key={`${item.code}${el?.size}`}>
                  <S.SizesBlock isOne={sizes?.length === 1}>
                    {el?.size}
                  </S.SizesBlock>

                  <Controller
                    name={el.size}
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="number"
                        isBorder
                      />
                    )}
                  />
                </S.BlockContainer>
              );
            })}
          </S.List>

          <Button fullWidth onClick={handleSubmit(onSubmit)}>
            {buttonText}
          </Button>
        </S.SizesForm>
      </S.SizesWrapper>
    </FormProvider>
  );
};

export default SizesChange