"use client";
import { getSizesList } from "@/data/sizes";
import * as S from './styles'
import { Controller, useFormContext, FormProvider, useForm  } from "react-hook-form";
import { Button, Input } from "@/components/ui";

const SizesAdd = ({ item, onSelect }) => {
  const methods = useForm({ mode: "onSubmit" });

  const onSubmit = (data) => {
    console.log(data);
  };

  const {
    handleSubmit,
    control,
  } = methods;

  const sizes = getSizesList(item);

  return (
    <FormProvider {...methods}>
      <S.SizesWrapper>
        <S.SizesForm onSubmit={handleSubmit(onSubmit)}>
          <S.List>
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

          <Button fullWidth type="submit">
            Оформити прихід
          </Button>
        </S.SizesForm>
      </S.SizesWrapper>
    </FormProvider>
  );
};

export default SizesAdd