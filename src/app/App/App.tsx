import ky from "ky";

import "@mantine/core/styles.css";

import { useEffect, useState, type MouseEvent } from "react";
import {
  MantineProvider,
  createTheme,
  type MantineColorsTuple,
  AppShell,
  SimpleGrid,
  Popover,
  Button,
  Stack,
} from "@mantine/core";

import { IconShoppingCart } from "@tabler/icons-react";

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

import "./App.css";

import { VegetableCard } from "../../modules/components/VegetableCard/VegetableCard";

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

  // console.log(vegetables);

  function handleIncreaseAmount(
    evt: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) {
    const vegetablesWithIncreaseAmount = vegetables.map((item) => {
      if (item.id !== Number(evt.target.offsetParent.id)) {
        return item;
      } else {
        item.amount += 1;
        return item;
      }
    });

    setVegetables([...vegetablesWithIncreaseAmount]);
  }

  function handleIncreaseAmountCart(
    evt: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) {
    if (evt.target.nodeName !== "BUTTON") {
      return;
    }
    // console.log("increasing cart");

    const vegetablesWithIncreaseAmount = cart.map((item) => {
      if (item.id !== Number(evt.target.parentNode.id)) {
        return item;
      } else {
        item.amount += 1;
        return item;
      }
    });

    setCart([...vegetablesWithIncreaseAmount]);
  }

  function handleDecreaseAmount(
    evt: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) {
    // console.dir(evt.target.parentNode);
    // console.log(evt.target.parentNode);
    // console.log(evt.target.offsetParent);

    const vegetablesWithIncreaseAmount = vegetables.map((item) => {
      if (item.id !== Number(evt.target.offsetParent.id)) {
        return item;
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        item.amount <= 0 ? (item.amount = 0) : (item.amount -= 1);
        return item;
      }
    });

    setVegetables([...vegetablesWithIncreaseAmount]);
  }

  function handleDecreaseAmountCart(
    evt: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) {
    if (evt.target.nodeName !== "BUTTON") {
      return;
    }
    // console.log("decreasing cart");
    // console.dir(evt.target);
    // console.dir(evt.target.parentNode);
    // console.dir(evt.target.offsetParent);

    const vegetablesWithIncreaseAmount = cart.map((item) => {
      if (item.id !== Number(evt.target.parentNode.id)) {
        return item;
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        item.amount <= 0 ? (item.amount = 0) : (item.amount -= 1);
        return item;
      }
    });

    setCart([...vegetablesWithIncreaseAmount]);
  }

  function handleAddToCart(
    evt: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) {
    // console.dir(evt.target.parentNode);
    // console.log(evt.target.parentNode);
    // console.log(evt.target.offsetParent);

    let newCart = [];

    const vegetableToCartId = Number(evt.target.offsetParent.id);

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

  useEffect(() => {
    createTotalCart();
  }, [cart]);

  function createTotalCart() {
    const totalValueOfVegetables = cart.reduce((acc, item) => {
      return acc + item.price * item.amount;
    }, 0);

    // console.log("total:", totalValueOfVegetables);
    setTotal(totalValueOfVegetables);
  }

  function transformNameOfVegetable(name: string) {
    const arrOfName = name.split(" - ");
    return { name: arrOfName[0], weight: arrOfName[1] };
  }

  // console.log("cart:", cart);
  // console.log("totalState:", total);

  return (
    <MantineProvider theme={theme}>
      <AppShell header={{ height: 60 }}>
        <AppShell.Header className="header">
          <div>
            Vegetable <span>SHOP</span>
          </div>
          <Popover width={444} position="bottom-end" offset={20}>
            <Popover.Target>
              <Button variant="filled" color="#54b46a">
                {cart.length > 0 && <span>{cart.length}</span>} Cart{" "}
                <IconShoppingCart size={20} />
              </Button>
            </Popover.Target>
            <Popover.Dropdown>
              <Stack
                h={300}
                bg="var(--mantine-color-body)"
                align="stretch"
                justify="center"
                gap="md"
              >
                {cart.length > 0 ? (
                  cart.map((item) => {
                    return (
                      <div key={item.id} id={String(item.id)}>
                        {transformNameOfVegetable(item.name).name}{" "}
                        {transformNameOfVegetable(item.name).weight} -{" "}
                        {item.price} $,{" "}
                        <Button
                          variant="filled"
                          color="gray"
                          size="xs"
                          radius="md"
                          onClick={handleDecreaseAmountCart}
                          className="btn-decrease-amount-cart"
                        >
                          -
                        </Button>
                        {item.amount}
                        <Button
                          variant="filled"
                          color="gray"
                          size="xs"
                          radius="md"
                          onClick={handleIncreaseAmountCart}
                          className="btn-increase-amount-cart"
                        >
                          +
                        </Button>
                      </div>
                    );
                  })
                ) : (
                  <div>cart is empty!</div>
                )}
                {total > 0 && <div>Total price: {total} $</div>}
              </Stack>
            </Popover.Dropdown>
          </Popover>
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
