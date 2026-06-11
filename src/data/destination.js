export const destinations = [
    {id: 1, name: "А1", value: "1"},
    {id: 2, name: "А2", value: "2"},
    {id: 3, name: "Склад", value: "3"},
    {id: 4, name: "Розетка", value: "4"}, 
    {id: 5, name: "Пром", value: "5"}, 
    {id: 6, name: "Інстаграм", value: "5"},   
    {id: 7, name: "Сайт", value: "6"}, 
]

export const getDestinationName = (id) => {
    const result = destinations.find(item => item.id === Number(id))
    return result?.name ?? ""
}