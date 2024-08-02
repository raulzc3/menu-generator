import { Center, Flex, Stack, Title, Group, Box } from "@mantine/core";
import { randomId } from "@mantine/hooks";
import AllergenList from "./Allergens/AllergenList";

const DishDescription = ({ description }) => {
  const descriptionArray = description
    ?.trim()
    .split(/\r\n|\r|\n/g)
    .map((line) => (
      <span style={{ fontFamily: "OpenSans_Condensed" }}>{line}</span>
    ));

  return (
    <Stack w={"94%"} pl={8} gap={5}>
      {descriptionArray}
    </Stack>
  );
};

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
        const currency = dish.currency || "€";

        return (
          <Stack gap={0}>
            <Flex justify={"space-between"} align="end" key={randomId()}>
              <Group gap={0}>
                <span style={{ fontWeight: 700, fontSize: 18 }}>
                  {dish.nombre}
                </span>
                <Box pl={5}>
                  <AllergenList allergens={allergens} />
                </Box>
              </Group>
              {precio && (
                <span
                  style={{ fontFamily: "OpenSans_Condensed", fontSize: 18 }}
                >
                  {!dish.hidePrice && precio + currency}
                </span>
              )}
            </Flex>
            <DishDescription description={dish.description} />
          </Stack>
        );
      });

      result.push(<Stack>{dishes}</Stack>);
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
