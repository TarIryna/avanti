import { vendors } from "./vendors"
import { seasonData } from "./seasons"
import { materialInside, materailsTop } from "./material"
import { colors } from "./colors"
import { sizesLengths } from "./sizes"
import { genders } from "./gender"
import { styles } from "./style"
import { countries } from "./countries"
import { heels } from "./heels"
import { categories } from "./categories"
import { years } from "./years"
import { types } from "./types"

export const getMaterialTop = (id, language = "ru") => {
  const data = materailsTop.find(item => item.id === id)
  return language === "ru" ? data?.name : data?.ukr
}

export const getMaterialInside = (id, language = "ru") => {
  const data = materialInside.find(item => item.id === id)
  return language === "ru" ? data?.name : data?.ukr 
}

export const getSeason = (name) => {
  const data = seasonData.find(item => item.eng === name)
  return data?.name
}

export const getColor = (ukr, language = "ru") => {
  const data = colors.find(item => item.ukr === ukr)
  return language === "ru" ? data?.name_rozetka : data?.ukr
}

export const getDescription = (vendor, language = "ru") => {
  const data = vendors.find(item => item.name === vendor)
  return language === "ru" ? data?.description : data?.description_ukr
}

export const getSizeLength = (size, type) => {
  const data = sizesLengths.find(item => item.name === type)
  return data[size] ?? ""
}

export const getGender = (name) => {
  const data = genders.find(i => i.eng === name)
  return data?.id ?? "all"
}

export const getStyle = (id, language = "ru") => {
  const data = styles.find(item => item.id === id)
   return language === "ukr" ? data?.ukr ?? "" : data?.name ?? ""
}

export const getCountry = (id, language = "ru") => {
  const data = countries.find(item => item.id === id)
  return language === "ukr" ? data?.ukr ?? "" : data?.name ?? ""
}

export const getVendor = (id) => {
  const data = vendors.find(item => item.id === id)
  return data?.name ?? ""
}

export const getHeels = (id) => {
  return id ? heels.find(i => i.id === id)?.rozetka_name ?? "" : ""
}

export const getCategoryName = (id) => {
  return categories.find(i => i.category_id === id)?.name
}

export const getYear = (id) => {
  return years.find(i => i.id === id)?.name
}

export const getTypeId = (type) => {
  return types.find(i => i.eng === type)?.id ?? 1
}