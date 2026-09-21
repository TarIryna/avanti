export const destinations = [
    {id: 1, ukr: "А1", value: "1"},
    {id: 2, ukr: "А2", value: "2"},
    {id: 3, ukr: "Склад", value: "3"},
    {id: 4, ukr: "Розетка", value: "4"}, 
    {id: 5, ukr: "Пром", value: "5"}, 
    {id: 6, ukr: "Інстаграм", value: "5"},   
    {id: 7, ukr: "Сайт", value: "6"}, 
]

export const getDestinationName = (id) => {
    if (!id) return ""
    const result = destinations.find(item => item.id === Number(id))
    return result?.ukr ?? ""
}