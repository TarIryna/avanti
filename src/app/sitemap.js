import { MetadataRoute } from 'next'

export default async function sitemap() {
  const genders = ['men', 'women', 'girls', 'boys']

  let products = []

  try {
    const res = await fetch('https://api.avanti-shoes.com.ua/products')
    if (res.ok) {
      products = await res.json()
    } else {
      console.error('Products API error', res.status)
    }
  } catch (err) {
    console.error('Failed to fetch products', err)
  }

  return [
    { url: 'https://avanti-shoes.com.ua', lastModified: new Date() },

    ...genders.map(g => ({
      url: `https://avanti-shoes.com.ua/${g}`,
      lastModified: new Date(),
    })),

    ...products.map(p => ({
      url: `https://avanti-shoes.com.ua/product/${p.code}`,
      lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date(),
    })),
  ]
}
