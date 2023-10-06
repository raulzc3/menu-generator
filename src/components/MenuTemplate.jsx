import { Center, Stack, Text, Title } from "@mantine/core";
import capitalize from "../utils/capitalize";
import { randomId } from "@mantine/hooks";

export default function MenuTemplate({ data }) {
  const result = [];
  const parseData = () => {
    for (let category in data) {
      const categoryName = capitalize(category);
      const dishes = data[category].map((dish) => (
        <Text
          fs="italic"
          style={{ fontFamily: "Garamond " }}
          size="lg"
          key={randomId()}
        >
          {dish.nombre}
        </Text>
      ));

      result.push(
        <div style={{ marginBottom: "1rem" }}>
          <Center>
            <Title
              order={2}
              style={{ fontFamily: "Garamond ", marginBottom: "2rem" }}
            >
              {categoryName}
            </Title>
          </Center>
          <Stack>{dishes}</Stack>
        </div>
      );
    }
    return result;
  };

  return (
    <Stack>
      <Center>
        <Title
          style={{
            fontFamily: "Edwardian",
            fontWeight: 100,
            fontSize: "5rem",
            marginBottom: "2rem",
          }}
        >
          Menú del día
        </Title>
      </Center>
      {parseData()}
    </Stack>
  );
}
