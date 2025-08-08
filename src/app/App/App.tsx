import ky from "ky";

import "@mantine/core/styles.css";

import { useEffect, useState } from "react";
import { MantineProvider, AppShell, SimpleGrid } from "@mantine/core";
// import { AppShell } from "@mantine/core";

import "./App.css";

import { VegetableCard } from "../../modules/components/VegetableCard/VegetableCard";

const url =
  "https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json";

export const App = () => {
  const [vegetables, setVegetables] = useState([]);

  const getVegetables = async () => {
    const newVegetables = await ky.get(url).json();
    const newVegetablesWithAmount = newVegetables.map((itm) => {
      return { ...itm, amount: 1 };
    });
    setVegetables(newVegetablesWithAmount);
  };

  useEffect(() => {
    getVegetables();
  }, []);

  console.log(vegetables);

  function handleIncreaseAmount(evt) {
    const vegetablesWithIncreaseAmount = vegetables.map((item) => {
      if (item.id !== Number(evt.target.offsetParent.id)) {
        return item;
      } else {
        item.amount += 1;
        return item;
      }
    });

    setVegetables(vegetablesWithIncreaseAmount);
  }

  function handleDecreaseAmount(evt) {
    const vegetablesWithIncreaseAmount = vegetables.map((item) => {
      if (item.id !== Number(evt.target.offsetParent.id)) {
        return item;
      } else {
        item.amount <= 0 ? (item.amount = 0) : (item.amount -= 1);
        return item;
      }
    });

    setVegetables(vegetablesWithIncreaseAmount);
  }

  return (
    <MantineProvider>
      <AppShell header={{ height: 60 }}>
        <AppShell.Header className="header">
          <div>
            Vegetable <span>SHOP</span>
          </div>
          <button>Cart</button>
        </AppShell.Header>
        <AppShell.Main className="main">
          <h1 className="main-title">Catalog</h1>

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
                  increaseAmount={handleIncreaseAmount}
                  decreaseAmount={handleDecreaseAmount}
                />
              );
            })}
          </SimpleGrid>
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
};
