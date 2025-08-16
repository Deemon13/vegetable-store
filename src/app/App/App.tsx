import ky from "ky";

import "@mantine/core/styles.css";

import { useEffect, useState } from "react";
import {
  MantineProvider,
  createTheme,
  type MantineColorsTuple,
  AppShell,
} from "@mantine/core";

import "./App.css";

import { Header, VegetablesList } from "../../pages";
import { CatalogTitle, Loader } from "../../modules/UI";

const myColor: MantineColorsTuple = [
  "#eafbee",
  "#dbf2e0",
  "#b9e1c2",
  "#94d0a1",
  "#74c186",
  "#60b874",
  "#54b46a",
  "#449e59",
  "#398d4d",
  "#2a7a3f",
];

const theme = createTheme({
  colors: {
    myColor,
  },
});

const url =
  "https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json";

interface VegetableType {
  id: number;
  name: string;
  price: number;
  image?: string;
  category?: string;
  amount: number;
}

export const App = () => {
  const [vegetables, setVegetables] = useState<VegetableType[] | []>([]);
  const [cart, setCart] = useState<VegetableType[] | []>([]);
  const [total, setTotal] = useState(0);

  const getVegetables = async () => {
    const newVegetables: VegetableType[] = await ky.get(url).json();
    const newVegetablesWithAmount = newVegetables.map((itm) => {
      return { ...itm, amount: 1 };
    });
    setVegetables(newVegetablesWithAmount);
  };

  useEffect(() => {
    getVegetables();
  }, []);

  return (
    <MantineProvider theme={theme}>
      <AppShell header={{ height: 60 }}>
        <AppShell.Header className="header">
          <Header
            cart={cart}
            setCart={setCart}
            total={total}
            setTotal={setTotal}
          />
        </AppShell.Header>
        <AppShell.Main className="main">
          <CatalogTitle title="Catalog" />
          {vegetables.length ? (
            <VegetablesList
              vegetables={vegetables}
              setVegetables={setVegetables}
              cart={cart}
              setCart={setCart}
            />
          ) : (
            <Loader />
          )}
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
};
