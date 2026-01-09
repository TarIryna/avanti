import Banners from "@/components/Banners/Banners";

// --- SEO для страницы ---
export async function generateMetadata() {
  const title = `Аванті — магазин взуття і сумок в Ужгороді | Avanti Shoes`;
  const description = `Аванті - магазин в місті Ужгород - взуття для жінок, чоловіків, дітей, хлопців та дівчат. Стильне молодіжне взуття. Доставка по Україні. Найнижчі ціни. Взуття по хороших цінах`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://avanti-shoes.com.ua/`,
    },
  };
}

const Home = () => (
  <section className="page home">
    <h1 className="title">Магазин взуття Аванті в Ужгороді | Avanti - офіційний магазин</h1>
    <p className="description">Магазин взуття <strong>Avanti (Аванті)</strong> — це сучасне жіноче та чоловіче взуття в 
      <strong>Ужгороді</strong>. Ми пропонуємо стильне та якісне взуття з доставкою по Україні.
    </p>
    <Banners />
  </section>
);

export default Home;
