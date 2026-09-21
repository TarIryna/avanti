
export const operations = [
    {id: 1, value: "sale", ru: "Продажа", ukr: "Продаж"},
    {id: 2, value: "return", ru: "Возврат", ukr: "Повернення"},
    {id: 3, value: "arrival", ru: "Приход", ukr: "Прихід"},
    {id: 4, value: "decrease", ru: "Списание", ukr: "Списання"},
    {id: 5, value: "inside", ru: "Внутренняя продажа", ukr: "Внутрішній продаж"},
    {id: 6, value: "redirect", ru: "Перемещение между кодами", ukr: "Переміщення між кодами"},
    {id: 7, value: "audit", ru: "Ревизия", ukr: "Ревізія"},
]

export const getOperationName = (value, lang = "ru") => {
    const operation = operations.find(op => op.value === value)
    return operation && lang === "ru" ? operation.ru : operation ? operation.ukr : ""
}