import { Flex, Text, Button } from "@mantine/core";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Main(props) {
  const { t } = useTranslation();
  return (
    <Flex
      gap={15}
      direction={"column"}
      align={"center"}
      justify={"center"}
      h={"40vh"}
    >
      <Text fw={500} size="xl">
        {t("main_welcome_text")}
      </Text>
      <Button
        variant="light"
        w={"60%"}
        component={Link}
        to={"/menu"}
        key={"main_screen_navlink_1"}
        style={{ textAlign: "center" }}
      >
        {t("section_menu")}
      </Button>
      <Button
        variant="light"
        w={"60%"}
        component={Link}
        to={"/finde"}
        key={"main_screen_navlink_2"}
        style={{ textAlign: "center" }}
      >
        {t("section_page")}
      </Button>
      <Button
        variant="light"
        w={"60%"}
        component={Link}
        to={"/vino"}
        key={"main_screen_navlink_3"}
        style={{ textAlign: "center" }}
      >
        {t("section_wine")}
      </Button>
    </Flex>
  );
}
