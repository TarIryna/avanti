export const staffList = [
    {id: 1, name: "Іра", value: 1},
    {id: 2, name: "Юля", value: 2},
    {id: 3, name: "Оля", value: 3},
    {id: 4, name: "Катя", value: 4}, 
    {id: 5, name: "Віка", value: 5}, 
    {id: 6, name: "Маша", value: 6},   
    {id: 7, name: "Лена", value: 7}, 
]

export const getStaffName = (id) => {
    if (!id) return ""
    return staffList.find(i => i.id === Number(id))?.name ?? ""
}