import { Center, Flex, Group, Stack, Text, Title } from "@mantine/core";
import capitalize from "../utils/capitalize";
import AllergenList from "./Allergens/AllergenList";
import { useTranslation } from "react-i18next";

export default function WineTemplate({ data, title }) {
  const { t } = useTranslation();
  const result = [];
  const WineList = () => {
    for (let category in data) {
      const categoryName = capitalize(t(category));
      const wines = data[category].map((wine) =>
        wine.nombre ? (
          <Flex justify={"space-between"} align={"self-start"}>
            <Group gap={"xs"} wrap="wrap">
              <Text size="lg" fw={700} style={{ fontSize: 18 }} inherit>
                {wine.nombre}
              </Text>
            </Group>
            <Group gap={10} ml={5} wrap="nowrap">
              <AllergenList allergens={wine.alergenos} />
              <Text size="lg" style={{ fontSize: 18 }} inherit>
                {wine.precio}€
              </Text>
            </Group>
          </Flex>
        ) : null
      );

      result.push(
        <Stack style={{ breakInside: "avoid" }} mb={50} gap={"sm"}>
          <Title order={2}>{categoryName}</Title>
          <Stack gap="xs">{wines}</Stack>
        </Stack>
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
      <div
        style={{
          columnCount: 2,
          margin: 0,
          padding: 0,
          columnGap: 40,
        }}
      >
        <WineList />
      </div>
    </Stack>
  );
}
