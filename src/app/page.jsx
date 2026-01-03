import Banners from "@/components/Banners/Banners";

// --- SEO для страницы ---
export async function generateMetadata() {
  const title = `Взуття та аксесуари для всієї сім'ї — купити с доставкою`;
  const description = `Великий вибір взуття для дінок, чоловіків, дітей, хлопців та дівчат. Фото, ціни, доставка.`;

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
    <Banners />
  </section>
);

export default Home;
