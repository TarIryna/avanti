import { create, useModal } from "@ebay/nice-modal-react";
import React, {useEffect, useMemo, useRef, useState} from "react";
import ReactModal from "@/components/modals/ReactModal";
import { Wrapper } from "../styles";
import { FormProvider, useForm } from "react-hook-form";
import Head from "../components/Head/Head";
import { Input, Button } from "@/components/ui";
import CheckProductInfo from "@/components/Shop/CheckProductInfo";
import * as S from "./styles";
import { registerDynamicModal } from "@/helpers/useDynamicModal";
import { MODALS, OPERATION_TYPE } from "@/constants/constants";
import { changeSaleClient, saleCheckTotal } from '@/utils/saleCheck';
import toast from 'react-hot-toast';

registerDynamicModal(
  MODALS.CHECK_PRINT,
  import("@/components/modals/CheckModal/CheckPrint")
);

const CheckModal = create(({ id, check, type, resetCheck }) => {
  const { remove } = useModal(id);
  const { show: showPrint } = useModal(MODALS.CHECK_PRINT);
  const [currentCheck, setCurrentCheck] = useState(check);
  const [clientLoading, setClientLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const clientRequest = useRef(null);
  const submitting = useRef(false);
  useEffect(() => () => clientRequest.current?.abort(), []);

  const title = type === OPERATION_TYPE.SALE ? "Чек продажу" : "Чек повернення";
  const buttonText = type === OPERATION_TYPE.SALE ? "Провести продаж з чеком" : "Провести повернення з чеком";

  // 1. Инициализируем форму. Сумма по умолчанию идет в наличку (или как вам удобно)
  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      terminal: 0,
      phone: check.client?.phone || '',
    }
  });

  const { setValue, getValues, handleSubmit, watch } = methods;

  const terminal = Number(watch('terminal') ?? 0)
  const phone = String(watch('phone') || '').trim();
  const total = useMemo(() => saleCheckTotal(currentCheck.items), [currentCheck.items]);
  const clientNotApplied = type === OPERATION_TYPE.SALE && phone !== String(currentCheck.client?.phone || '');
  const disabled = clientLoading || saving || clientNotApplied;

  const cash = useMemo(() => {
    return Math.round((total - terminal) * 100) / 100;
  }, [terminal, total])

  const applyClient = async () => {
    clientRequest.current?.abort();
    const controller = new AbortController();
    clientRequest.current = controller;
    setClientLoading(true);
    try {
      let client = null;
      if (phone) {
        const response = await fetch(`/api/client/${encodeURIComponent(phone)}`, { cache: 'no-store', signal: controller.signal });
        client = await response.json();
        if (!response.ok) throw new Error(client?.error || 'Помилка пошуку клієнта');
        if (!client?.phone) throw new Error('Клієнта не знайдено');
      }
      if (controller.signal.aborted) return;
      const updated = changeSaleClient(currentCheck, client);
      const previousTerminal = Number(getValues('terminal') || 0);
      setValue('terminal', previousTerminal > 0 && previousTerminal === total
        ? updated.total : Math.min(previousTerminal, updated.total));
      setCurrentCheck(updated);
      setValue('phone', client?.phone || '');
    } catch (error) {
      if (!controller.signal.aborted) toast.error(error.message || 'Помилка пошуку клієнта');
    } finally {
      if (!controller.signal.aborted) setClientLoading(false);
    }
  };

  const handleTerminalChange = (e) => {
    const value = Number(e.target.value);
    setValue("terminal", value);
};


  const sendOperation = async (params) => {
    const res = await fetch("/api/shop/operation/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });
    const result = await res.json();
    if (!res.ok || !result?.success) throw new Error(result?.error || 'Не вдалося зберегти операцію');
    return result;
  };

  const onTerminalButton = () => {
    setValue("terminal", total);
    onSubmit(total, true)
  }

  const onTerminalNoPrintButton = () => {
    setValue("terminal", total);
    onSubmit(total, false)
  }

  const onPrintButton = () => {
    onSubmit(terminal, true)
  }

  const onNoPrintButton = () => {
    onSubmit(terminal, false)
  }

  // 3. Отправка формы через стандартный onSubmit в react-hook-form
  const onSubmit = async (terminal, isPrint) => {
    if (disabled || submitting.current) return;
    if (!Number.isFinite(terminal) || terminal < 0 || terminal > total) {
      toast.error('Сума терміналом має бути від 0 до суми чека');
      return;
    }
    submitting.current = true;
    setSaving(true);
    const payload = {
      client: currentCheck.client,
      items: currentCheck.items,
      total,
      cash: Math.round((total - terminal) * 100) / 100,
      shop: currentCheck.shop,
      terminal,
      type
    };

    try {
      await sendOperation(payload);
      if (isPrint) showPrint({ data: payload, type, resetCheck });
      remove();
    } catch (error) {
      toast.error(error.message || 'Не вдалося зберегти операцію');
    } finally {
      submitting.current = false;
      setSaving(false);
    }
  };

  return (
    <ReactModal id={id} closeOnClickOutside={false}>
      <Wrapper>
        <S.CheckContainer>
          <Head close={remove} title={title} />
          <S.CheckContent>
            <FormProvider {...methods}>
              {/* Стандартный сабмит формы */}
              <S.Form autoComplete="off" onSubmit={handleSubmit(() => onSubmit(terminal, true))}>
                <S.ClientSection>
                {type === OPERATION_TYPE.SALE && <>
                  <S.ClientControls>
                  <Input
                    name="phone"
                    type="tel"
                    label="Телефон клієнта"
                    placeholder="Введіть телефон клієнта"
                    disabled={clientLoading || saving}
                    onKeyDown={event => {
                      if (event.key === 'Enter') { event.preventDefault(); applyClient(); }
                    }}
                  />
                  <Button type="button" disabled={clientLoading || saving} onClick={applyClient}>
                    {clientLoading ? 'Пошук клієнта…' : 'Застосувати клієнта та перерахувати'}
                  </Button>
                  {currentCheck.client && <Button type="button" disabled={clientLoading || saving} onClick={() => {
                    setValue('phone', '');
                    const updated = changeSaleClient(currentCheck, null);
                    setCurrentCheck(updated);
                    const value = Number(getValues('terminal') || 0);
                    setValue('terminal', value > 0 && value === total ? updated.total : Math.min(value, updated.total));
                  }}>Прибрати клієнта</Button>}
                  </S.ClientControls>
                  {clientNotApplied && <S.Text>Застосуйте телефон, щоб перерахувати чек перед оплатою.</S.Text>}
                </>}
                {currentCheck.client && (
                  <S.Text>{`КЛІЄНТ: ${currentCheck.client.phone} ${currentCheck.client.name} ${currentCheck.client.discount || 0}%`}</S.Text>
                )}
                </S.ClientSection>
                <S.Items>
                {!!currentCheck.items?.length &&
                  currentCheck.items.map((item, index) => <CheckProductInfo key={`${item.code}-${index}`} data={item}/>)
                }
                </S.Items>
                <S.PaymentSection>
                {!!currentCheck.items?.length && (
                  <S.Totals><S.Total>Всього: {total} грн</S.Total><S.Total>Готівкою: {cash} грн</S.Total></S.Totals>
                )}

                {/* 4. Возвращаем стандартный register и обрабатываем изменение */}
                <Input 
                  name="terminal"
                  placeholder="термінал" 
                  type="number" 
                  label="Термінал"
                  step={0.01}
                  disabled={clientLoading || saving}
                  onValueChange={handleTerminalChange}
                />
                <S.Grid>
            
                <Button type="button" disabled={disabled} onClick={onPrintButton}>
                  {buttonText}
                </Button>
                <Button type="button" disabled={disabled} onClick={onNoPrintButton}>
                  Провести без чека
                </Button>
                <Button type="button" disabled={disabled} onClick={onTerminalButton}>
                  Провести терміналом з чеком
                </Button>
                <Button type="button" disabled={disabled} onClick={onTerminalNoPrintButton}>
                  Провести терміналом без чека
                </Button>
                </S.Grid>
                </S.PaymentSection>
              </S.Form>
            </FormProvider>
          </S.CheckContent>
        </S.CheckContainer>
      </Wrapper>
    </ReactModal>
  );
});

export default CheckModal;
