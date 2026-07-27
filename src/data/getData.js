import { vendors } from "./vendors"
import { seasonData } from "./seasons"
import { materialInside, materialsTop } from "./material"
import { colors } from "./colors"
import { sizesLengths } from "./sizes"
import { genders } from "./gender"
import { styles } from "./style"
import { countries } from "./countries"
import { heels } from "./heels"
import { categories } from "./categories"
import { years } from "./years"
import { types } from "./types"
import { facebookCategories } from "./facebook"

export const escapeXML = (str = "") =>
  String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export const getMaterialTop = (id, language = "ru") => {
  const data = materialsTop.find(item => item.id === id)
  return language === "ru" ? data?.ru : data?.ukr
}

export const getMaterialInside = (id, language = "ru") => {
  const data = materialInside.find(item => item.id === id)
  return language === "ru" ? data?.ru : data?.ukr 
}

export const getSeason = (name) => {
  const data = seasonData.find(item => item.eng === name)
  return data?.rozetka
}

export const getSeasonById = (id) => {
  const data = seasonData.find(item => item.id === Number(id))
  return data?.rozetka
}

export const getSeasonQuery = (name) => {
  return seasonData
    .filter(item => item.eng === name)
    .map(item => Number(item.id)); 
};

export const getColor = (ukr, language = "ru") => {
  const data = colors.find(item => item.ukr === ukr)
  return language === "ru" ? data?.name_rozetka : data?.ukr
}

export const getColorById = (id, language = "ru") => {
 const data = colors.find(item => item.id === Number(id))
 const result = language === "ru" ? data?.name_rozetka : data?.ukr
 return result ?? ""
}

export const getColorSimple = (id, language = "ru") => {
  if (!id){
    return ""
  }
  const data = colors.find(item => item.id === id)
  return language === "ru" ? data?.name_prom : data?.ukr
}

export const getColorNameById = (id, language = "ru") => {
  if (!id){
    return ""
  }
  const data = colors.find(item => item.id === id)
  return language === "ru" ? data?.name_prom : data?.ukr
}

export const getDescription = (vendor, language = "ru") => {
  const data = vendors.find(item => item.id === vendor)
  return language === "ru" ? data?.description : data?.description_ukr
}

export const getSizeLength = (size, type) => {
  const data = sizesLengths.find(i => i.id === type)
  return data && data?.[size] ? `${data?.[size]}см` : ""
}

export const getGender = (name) => {
  const data = genders.find(i => i.eng === name)
  return data?.id ?? "all"
}

export const getGenderName = (id) => {
  const data = genders.find(i => i.id === Number(id))
  return data?.ukr ?? "all"
}

export const getGoogleGender = (id) => {
  const data = genders.find(i => i.id === Number(id))
  return data?.google ?? "all"
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

export const getVendorId = (query) => {
  const data = vendors.find(item => item.name?.toLowerCase().includes(query?.toLowerCase()))
  return data?.id ?? null
}

export const getHeels = (id) => {
  return id ? heels.find(i => i.id === id)?.rozetka_name ?? "" : ""
}

export const getCategoryName = (id) => {
  return categories.find(i => i.id === id)?.name
}

export const getYear = (id) => {
  return years.find(i => i.id === id)?.name
}

export const getTypeId = (type) => {
  return types.find(i => i.eng === type)?.id ?? 1
}

export const getMaterial = (id) => {
  const material = materialsTop.find(i => i.id === Number(id))
  return  material?.material_id === 1 ? 'шкіряні' : ""
}

export const getShortName = (id, language) => {
  const data = categories.find(i => i.id === id);

  const result =
    data && language === "ru"
      ? data.short
      : data && language === "ua"
      ? data["short_ua"]
      : "";

  return result
    ? result.charAt(0).toUpperCase() + result.slice(1)
    : "";
};


export const getName = (product, size, language = "ru", isCode = false) => {
  return `${getShortName(product.rozetka_id, language) ?? ""} ${getVendor(product.vendor) ?? ""} ${product.model ?? ""} ${isCode ? product.code : ""} ${getColorSimple(product.color, language) ?? ""} ${size} ${getSizeLength(size, product.size_type) ?? ""}`
}


export const getNameTotal = (product, language = "ua") => {
   return `${getShortName(Number(product.rozetka_id), language) ?? ""} ${getMaterial(product.material_top) ?? ""} ${product.code ?? ""} ${getColorNameById(product.color, language) ?? ""}`
}

export const getFacebook = (id) => {
  const data = facebookCategories.find(i => i.id === Number(id));
  return data?.name
}