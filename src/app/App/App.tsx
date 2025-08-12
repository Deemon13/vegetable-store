import ky from "ky";

import "@mantine/core/styles.css";

import { useEffect, useState, type MouseEvent } from "react";
import {
  MantineProvider,
  createTheme,
  type MantineColorsTuple,
  AppShell,
  SimpleGrid,
} from "@mantine/core";

import "./App.css";

import { Header } from "../../pages";
import { VegetableCard } from "../../modules/components";
import { CatalogTitle } from "../../modules/UI";

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
  image: string;
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

  function handleIncreaseAmount(
    evt: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) {
    const vegetablesWithIncreaseAmount = vegetables.map((item) => {
      if (item.id !== Number((evt.target as HTMLElement).offsetParent?.id)) {
        return item;
      } else {
        item.amount += 1;
        return item;
      }
    });

    setVegetables([...vegetablesWithIncreaseAmount]);
  }

  function handleDecreaseAmount(
    evt: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) {
    const vegetablesWithIncreaseAmount = vegetables.map((item) => {
      if (item.id !== Number((evt.target as HTMLElement).offsetParent?.id)) {
        return item;
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        item.amount <= 0 ? (item.amount = 0) : (item.amount -= 1);
        return item;
      }
    });

    setVegetables([...vegetablesWithIncreaseAmount]);
  }

  function handleAddToCart(
    evt: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) {
    let newCart = [];

    const vegetableToCartId = Number(
      (evt.target as HTMLElement).offsetParent?.id
    );

    const vegetableToCart: VegetableType | undefined = vegetables.find(
      (item) => item.id === vegetableToCartId
    );

    if (!vegetableToCart || vegetableToCart.amount === 0) {
      return;
    }

    if (cart.some((item) => item.id === vegetableToCartId)) {
      const vegetableExist = cart.find((item) => item.id === vegetableToCartId);
      const amountToAdd = vegetableToCart.amount;

      if (vegetableExist) {
        vegetableExist.amount += amountToAdd;
      }

      newCart = [...cart];
    } else {
      newCart = [...cart, vegetableToCart];
    }

    setCart([...newCart]);

    const vegetablesWithAmount = vegetables.map((item) => {
      if (item.id !== vegetableToCartId) {
        return item;
      } else {
        const newItem = { ...item };
        newItem.amount = 1;
        return newItem;
      }
    });

    setVegetables([...vegetablesWithAmount]);
  }

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

          <SimpleGrid
            cols={{ base: 1, sm: 2, lg: 4 }}
            spacing={{ base: 10, sm: "md" }}
            verticalSpacing={{ base: "md", sm: "md" }}
          >
            {vegetables.map(({ id, image, name, price, amount }) => {
              return (
                <VegetableCard
                  key={id}
                  id={id}
                  image={image}
                  name={name}
                  price={price}
                  amount={amount}
                  increaseAmount={(evt) => handleIncreaseAmount(evt)}
                  decreaseAmount={(evt) => handleDecreaseAmount(evt)}
                  category={""}
                  addToCart={(evt) => handleAddToCart(evt)}
                />
              );
            })}
          </SimpleGrid>
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
};
