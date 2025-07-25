"use client";

import Collection from "@/components/Collection/Collection";
import Tabs from "@/components/Collection/Tabs";

const Season = () => {
  return (
    <section className="w-full flex-center flex-col">
      <Tabs />
      <Collection />
    </section>
  );
};

export default Season;
