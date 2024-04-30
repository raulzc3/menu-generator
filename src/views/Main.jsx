import { Flex, Text, Button, Group, Divider } from "@mantine/core";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import getSectionIcon from "../utils/sectionIcons";

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
        justify="left"
        leftSection={
          <Group gap={10}>
            {getSectionIcon("menu")}
            <Divider orientation="vertical" size={"xs"} color="lightblue" />
          </Group>
        }
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
        justify="left"
        leftSection={
          <Group gap={10}>
            {getSectionIcon("finde")}
            <Divider orientation="vertical" size={"xs"} color="lightblue" />
          </Group>
        }
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
        justify="left"
        leftSection={
          <Group gap={10}>
            {getSectionIcon("vino")}
            <Divider orientation="vertical" size={"xs"} color="lightblue" />
          </Group>
        }
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
