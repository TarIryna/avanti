import { create, useModal } from "@ebay/nice-modal-react";
import React, { useEffect, useState } from "react";
import ReactModal from "../ReactModal";
import Head from "../components/Head/Head";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "@/components/ui";
import { Button } from "@mui/material";
import { Wrapper, Content } from "../styles";
import * as S from "./styles";
import toast from "react-hot-toast";

const ClientsModal = create(({ id, shop, client }) => {
  const { remove } = useModal(id);
  const [mode, setMode] = useState(client?._id ? "edit" : "create");
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [selectedClient, setSelectedClient] = useState(client || null);
  const editing = mode === "edit";
  const methods = useForm({
    mode: "onSubmit",
    defaultValues: {
      surname: selectedClient?.surname || "",
      name: selectedClient?.name || "",
      phone: selectedClient?.phone || "",
    },
  });
  const { handleSubmit, reset, formState: { isSubmitting } } = methods;

  useEffect(() => {
    reset({
      surname: selectedClient?.surname || "",
      name: selectedClient?.name || "",
      phone: selectedClient?.phone || "",
    });
  }, [selectedClient, reset]);

  const searchClients = async (event) => {
    event.preventDefault();
    const query = search.trim();
    if (!query) return;
    try {
      const response = await fetch(`/api/client?search=${encodeURIComponent(query)}`);
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Не вдалося знайти клієнтів");
      setResults(result.clients || []);
      if (!result.clients?.length) toast.error("Клієнтів не знайдено");
    } catch (error) {
      toast.error(error.message || "Помилка пошуку клієнтів");
    }
  };

  const changeMode = (nextMode) => {
    setMode(nextMode);
    setResults([]);
    setSearch("");
    setSelectedClient(null);
    reset({ surname: "", name: "", phone: "" });
  };

  const onSubmit = async ({ surname, name, phone }) => {
    try {
      const response = await fetch(editing ? `/api/client/${encodeURIComponent(selectedClient.phone)}` : "/api/client", {
        method: editing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ surname: surname.trim(), name: name.trim(), phone: phone.trim(), shop }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Не вдалося зберегти клієнта");

      toast.success(editing ? "Дані клієнта оновлено" : "Клієнта створено");
      remove();
    } catch (error) {
      toast.error(error.message || "Помилка під час збереження клієнта");
    }
  };

  return (
    <ReactModal id={id} closeOnClickOutside={false}>
      <Wrapper>
        <S.Container>
          <Head close={remove} title={editing ? "Дані клієнта" : "Новий клієнт"} />
          <Content>
            <S.ModeSwitch>
              <Button variant={!editing ? "contained" : "outlined"} onClick={() => changeMode("create")}>Створити</Button>
              <Button variant={editing ? "contained" : "outlined"} onClick={() => changeMode("edit")}>Редагувати</Button>
            </S.ModeSwitch>
            {editing && !selectedClient && (
              <>
                <S.SearchForm onSubmit={searchClients}>
                  <Input value={search} onValueChange={(event) => setSearch(event.target.value)} label="Телефон або прізвище" placeholder="Введіть телефон або прізвище" isBorder />
                  <Button type="submit" variant="contained">Знайти</Button>
                </S.SearchForm>
                {results.length > 0 && (
                  <S.Results>
                    {results.map((item) => (
                      <Button key={item._id} onClick={() => { setSelectedClient(item); setResults([]); }}>
                        {`${item.surname || ""} ${item.name || ""} — ${item.phone}`}
                      </Button>
                    ))}
                  </S.Results>
                )}
              </>
            )}
            {(!editing || selectedClient) && (
            <FormProvider {...methods}>
              <S.Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <Input name="surname" label="Прізвище" placeholder="Прізвище" isBorder rules={{ required: "Вкажіть прізвище" }} />
                <Input name="name" label="Ім'я" placeholder="Ім'я" isBorder rules={{ required: "Вкажіть ім'я" }} />
                <Input name="phone" label="Телефон" placeholder="Телефон" type="tel" isBorder rules={{ required: "Вкажіть телефон" }} />
                <Button type="submit" disabled={isSubmitting}>{editing ? "Зберегти" : "Створити"}</Button>
              </S.Form>
            </FormProvider>
            )}
          </Content>
        </S.Container>
      </Wrapper>
    </ReactModal>
  );
});

export default ClientsModal;
