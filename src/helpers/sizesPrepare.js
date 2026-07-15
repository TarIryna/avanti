import { sizesGroup } from "@/data"

export const getSizesObject = (item) => {
    const sizesType = sizesGroup.find(i => i.id === item.sizesGroup)?.default
    const allSizes = item.sizes_all
    sizesType.map(i => i.q = 0)
    return  Object.fromEntries(
      Object.entries(allSizes).map(([key, currentSizes]) => {
      
      // 1. Создаем карту существующих размеров для быстрого поиска O(1)
      const currentMap = new Map(currentSizes.map(item => [item.size, item]));

      // 2. Берем все элементы из макета и подменяем их, если они уже есть в currentMap
      const filledFromTemplate = sizesType.map(templateItem => {
        return currentMap.get(templateItem.size) || { ...templateItem };
      });

      // 3. (Опционально) Находим те размеры, которых в макете не было (например, "44"), 
      // чтобы они не удалились из итогового результата
      const templateSizes = new Set(sizesType.map(t => t.size));
      const extraSizes = currentSizes.filter(item => !templateSizes.has(item.size));

      // Соединяем дополненный макет и уникальные старые значения
      return [key, [...filledFromTemplate, ...extraSizes]];
    })  
)
}