"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { changeToInitialAction } from "@/store/actions/products";
import { TabsWrapper } from "./styles";
import { tabsData } from "@/utils/data";

const Tabs = () => {
  const router = useRouter();
  const setRoute = (link) => {
    changeToInitialAction();
    router.push(link);
  };

  return (
    <TabsWrapper>
      {tabsData &&
        tabsData.map((tab) => (
          <button
            // href={tab.link}
            key={tab.name}
            className="flex-column justify-center items-center"
            onClick={() => setRoute(tab.link)}
          >
            <span>{tab.name}</span>
            <Image src={tab.image} alt="category" width={150} height={150} />
          </button>
        ))}
    </TabsWrapper>
  );
};

export default Tabs;
