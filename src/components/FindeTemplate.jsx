import { Center, Flex, Stack, Text, Title, Group } from "@mantine/core";
import { randomId } from "@mantine/hooks";
import AllergenList from "./Allergens/AllergenList";

export default function FindeTemplate({ data, title }) {
  const parseData = () => {
    const result = [];
    for (let category in data) {
      const dishes = data[category].map((dish) => {
        if (!dish.nombre) {
          return null;
        }

        const precio =
          dish.precio % 1 === 0
            ? dish.precio
            : Number(dish.precio).toFixed(2).replace(".", ",");

        const allergens = dish.alergenos;

        return (
          <Flex
            justify={"space-between"}
            align="end"
            key={randomId()}
            style={{ fontSize: 18 }}
          >
            <Group gap={"xs"} wrap="wrap-reverse">
              <Text fw={700} inherit>
                {dish.nombre}
              </Text>
              <AllergenList allergens={allergens} />
            </Group>
            {precio && (
              <Text size="lg" inherit>
                {precio + "€"}
              </Text>
            )}
          </Flex>
        );
      });

      result.push(
        <Stack style={{ fontFamily: "OpenSans_Condensed" }}>{dishes}</Stack>
      );
    }
    return result;
  };

  return (
    <Stack w={"100%"}>
      <Center>
        <Title
          style={{
            fontFamily: "Edwardian",
            fontWeight: 100,
            fontSize: "4.5rem",
            marginBottom: "2rem",
            textAlign: "center",
          }}
        >
          {title}
        </Title>
      </Center>
      {parseData()}
    </Stack>
  );
}
