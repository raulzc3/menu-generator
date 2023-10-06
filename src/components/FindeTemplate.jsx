import { Center, Flex, Stack, Text, Title } from "@mantine/core";
import { randomId } from "@mantine/hooks";

export default function FindeTemplate({ data, title }) {
  const result = [];
  const parseData = () => {
    console.log(data);

    for (let category in data) {
      const dishes = data[category].map((dish) => {
        const precio =
          dish.precio % 1 === 0
            ? dish.precio
            : Number(dish.precio).toFixed(2).replace(".", ",");
        return (
          <Flex justify={"space-between"}>
            <Text
              style={{ fontFamily: "Garamond " }}
              size="lg"
              key={randomId()}
            >
              {dish.nombre}
            </Text>
            <Text
              style={{ fontFamily: "Garamond " }}
              size="lg"
              key={randomId()}
            >
              {precio + "€"}
            </Text>
          </Flex>
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
