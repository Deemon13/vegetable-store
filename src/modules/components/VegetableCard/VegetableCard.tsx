import { Card, Image, Text, Button, Group } from "@mantine/core";

import { IconShoppingCart } from "@tabler/icons-react";

interface VegetableTypeCard {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  amount: number;
  increaseAmount: React.MouseEventHandler<HTMLButtonElement>;
  decreaseAmount: React.MouseEventHandler<HTMLButtonElement>;
  addToCart: React.MouseEventHandler<HTMLButtonElement>;
}

export const VegetableCard = ({
  id,
  image,
  name,
  price,
  amount,
  increaseAmount,
  decreaseAmount,
  addToCart,
}: VegetableTypeCard) => {
  function transformNameOfVegetable(name: string) {
    const arrOfName = name.split(" - ");
    return { name: arrOfName[0], weight: arrOfName[1] };
  }
  return (
    <Card id={String(id)} shadow="sm" padding="md" radius="md" withBorder>
      <Card.Section>
        <Image src={image} width={276} height={276} alt={name} />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>
          {transformNameOfVegetable(name).name}{" "}
          {transformNameOfVegetable(name).weight}
        </Text>
        <Button
          variant="filled"
          color="gray"
          size="xs"
          radius="md"
          onClick={decreaseAmount}
          className="btn-decrease-amount-list"
        >
          -
        </Button>
        <span>{amount}</span>
        <Button
          variant="filled"
          color="gray"
          size="xs"
          radius="md"
          onClick={increaseAmount}
          className="btn-increase-amount-list"
        >
          +
        </Button>
      </Group>

      <Group justify="space-between" mt="md" mb="xs">
        <Text size="sm" c="dimmed">
          $ {price}
        </Text>

        <Button
          id={String(id)}
          variant="light"
          color="#3B944E"
          mt="md"
          radius="md"
          onClick={addToCart}
        >
          Add to cart
          <IconShoppingCart size={20} />
        </Button>
      </Group>
    </Card>
  );
};
