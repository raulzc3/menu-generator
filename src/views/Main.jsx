import { Flex, Text, Button } from "@mantine/core";
import { Link } from "react-router-dom";

export default function Main(props) {
  return (
    <Flex
      gap={15}
      direction={"column"}
      align={"center"}
      justify={"center"}
      h={"40vh"}
    >
      <Text fw={500} size="xl">
        ¿Qué quieres hacer hoy?
      </Text>
      <Button
        variant="light"
        w={"60%"}
        component={Link}
        to={"/menu"}
        key={"main_screen_navlink_1"}
        style={{ textAlign: "center" }}
      >
        Menú del día
      </Button>
      <Button
        variant="light"
        w={"60%"}
        component={Link}
        to={"/finde"}
        key={"main_screen_navlink_2"}
        style={{ textAlign: "center" }}
      >
        Carta fin de semana
      </Button>
    </Flex>
  );
}
