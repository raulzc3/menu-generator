import { Center, Group, Stack, Text, Title } from "@mantine/core";
import capitalize from "../utils/capitalize";
import AllergenList from "./Allergens/AllergenList";

export default function MenuTemplate({ data, title }) {
  const result = [];
  const parseData = () => {
    for (let category in data) {
      const categoryName = capitalize(category);
      console.log(data);
      const dishes = data[category].map((dish) => (
        <Group gap={"xs"} wrap="wrap-reverse">
          <Text size="lg" inherit>
            {dish.nombre}
          </Text>
          <AllergenList allergens={dish.alergenos} />
        </Group>
      ));

      result.push(
        <div style={{ marginBottom: "1rem" }}>
          <Center>
            <Title order={2} style={{ marginBottom: "2rem" }}>
              {categoryName}
            </Title>
          </Center>
          <Stack justify="center">{dishes}</Stack>
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
          {title}
        </Title>
      </Center>
      {parseData()}
    </Stack>
  );
}
