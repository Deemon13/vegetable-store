import { Card, Image, Text, Badge, Button, Group } from "@mantine/core";

export const VegetableCard = ({
  id,
  image,
  name,
  price,
  amount,
  increaseAmount,
  decreaseAmount,
}) => {
  return (
    <Card id={id} shadow="sm" padding="md" radius="md" withBorder>
      <Card.Section>
        <Image src={image} width={276} height={276} alt={name} />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{name}</Text>
        <Badge color="grey" onClick={decreaseAmount}>
          -
        </Badge>
        <span>{amount}</span>
        <Badge color="grey" onClick={increaseAmount}>
          +
        </Badge>
      </Group>

      <Group justify="space-between" mt="md" mb="xs">
        <Text size="sm" c="dimmed">
          $ {price}
        </Text>

        <Button color="blue" mt="md" radius="md">
          Add to cart
        </Button>
      </Group>
    </Card>
  );
};
