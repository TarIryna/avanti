import { MetadataRoute } from 'next'

export default async function sitemap() {
  const genders = ['men', 'women', 'girls', 'boys']

  const products = await fetch('https://api.avanti-shoes.com.ua/products').then(res => res.json())

  return [
    { url: 'https://avanti-shoes.com.ua', lastModified: new Date() },

    ...genders.map(g => ({ url: `https://avanti-shoes.com.ua/${g}`, lastModified: new Date() })),

    ...genders.flatMap(g =>
      categories.map(c => ({ url: `https://avanti-shoes.com.ua/${g}/${c}`, lastModified: new Date() }))
    ),

    ...products.map((p) => ({
      url: `https://avanti-shoes.com.ua/product/${p.code}`,
      lastModified: new Date(p.updatedAt),
    })),
  ]
}
