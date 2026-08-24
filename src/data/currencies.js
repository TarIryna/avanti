export const currencies = [
    {id: 1, value: 1, name: "USD", symbol: "$"},
    {id: 2, value: 2, name: "UAH", symbol: "грн"},
    {id: 3, value: 3, name: "EUR", symbol: "€"},
]

export const getCurrencyName = (id) => {
    const data = currencies.find(i => i.id === Number(id))
    return data ? data.name : ""
} 

export const getCurrencySymbol = (id) => {
    const data = currencies.find(i => i.id === Number(id))
    return data ? data.symbol : ""
} 