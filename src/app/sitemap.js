export default async function sitemap() {
  const genders = ['men', 'women', 'girls', 'boys']

  // Популярные фильтры, которые хотим видеть в sitemap
  const popularFilters = [
    { color: 'black', size: '38' },
    { color: 'brown', size: '38' },
    { color: 'black', size: '39' },
    { color: 'brown', size: '39' },
    { color: 'black', size: '37' },
    { color: 'brown', size: '37' },
    { color: 'black', size: '41' },
    { color: 'brown', size: '41' },
    { color: 'black', size: '42' },
    { color: 'brown', size: '42' },
    { color: 'black', size: '43' },
    { color: 'brown', size: '43' },
  ]

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

  const urls = [
    { url: 'https://avanti-shoes.com.ua', lastModified: new Date() },

    // Гендерные страницы
    ...genders.map(g => ({
      url: `https://avanti-shoes.com.ua/${g}`,
      lastModified: new Date(),
    })),
  ]

  // Добавляем товары
  products.forEach(p => {
    const baseUrl = `https://avanti-shoes.com.ua/product/${p.code}`
    urls.push({
      url: baseUrl,
      lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date(),
    })

    // Создаём отдельные URL для популярных фильтров (для SEO)
    popularFilters.forEach(f => {
      const params = new URLSearchParams(f).toString()
      urls.push({
        url: `${baseUrl}?${params}`,
        lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date(),
      })
    })
  })

  return urls
}
