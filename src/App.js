import "./App.css";
import "@mantine/core/styles.css";
import {
  MantineProvider,
  AppShell,
  Burger,
  Group,
  Title,
  Paper,
  Text,
  Button,
  Stack,
  Container,
  ActionIcon,
  Divider,
} from "@mantine/core";
import { randomId, useDisclosure } from "@mantine/hooks";
import { ModalsProvider } from "@mantine/modals";
import { Link, Route, Routes } from "react-router-dom";
import Main from "./views/Main";
import Menu from "./views/Menu";
import Finde from "./views/Finde";
import AppLogo from "./components/AppLogo";
import LangSelector from "./components/LangSelector";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import NavFiles from "./components/NavFiles";
import Wine from "./views/Wine";
import getSectionIcon from "./utils/sectionIcons";

function App() {
  const [opened, { toggle }] = useDisclosure();
  const { t } = useTranslation();
  const [navKey, setNavKey] = useState(randomId());
  const [activeId, setActiveId] = useState();
  //Workaround to reload items in nav
  const reloadNav = (newActiveId) => {
    setNavKey(randomId());

    setActiveId(newActiveId);
  };

  useEffect(() => {
    document.title = t("main_title");
  }, []);

  // const navigate = useNavigate();
  // const location = useLocation();

  /*  useEffect(() => {
    console.log(location.pathname);
  }, [location]); */

  return (
    <MantineProvider>
      <ModalsProvider>
        <AppShell
          header={{ height: { base: 60, md: 70, lg: 80 } }}
          navbar={{
            width: { base: 250, md: 250, lg: 300 },
            breakpoint: "sm",
            collapsed: { mobile: !opened },
          }}
          padding="md"
        >
          <AppShell.Header>
            <Group h="100%" px="md">
              <Burger
                opened={opened}
                onClick={toggle}
                hiddenFrom="sm"
                size="sm"
              />
              <ActionIcon
                variant="transparent"
                component={Link}
                onClick={() => {
                  opened && toggle();
                }}
                to={"/"}
              >
                <AppLogo />
              </ActionIcon>
              <Title order={3}>{t("main_title")}</Title>
            </Group>
          </AppShell.Header>
          <AppShell.Navbar p="md">
            <Text fw={500} style={{ marginBottom: "1rem" }}>
              {t("nav_title_1")}
            </Text>
            <Stack>
              <Button
                justify="left"
                leftSection={
                  <Group gap={10}>
                    {getSectionIcon("menu")}
                    <Divider
                      orientation="vertical"
                      size={"xs"}
                      color="lightblue"
                    />
                  </Group>
                }
                variant="light"
                component={Link}
                onClick={toggle}
                to={"/menu"}
                key={"main_navlink_1"}
              >
                {t("section_menu")}
              </Button>
              <Button
                justify="left"
                leftSection={
                  <Group gap={10}>
                    {getSectionIcon("finde")}
                    <Divider
                      orientation="vertical"
                      size={"xs"}
                      color="lightblue"
                    />
                  </Group>
                }
                variant="light"
                component={Link}
                onClick={toggle}
                to={"/finde"}
                key={"main_navlink_2"}
              >
                {t("section_page")}
              </Button>
              <Button
                justify="left"
                leftSection={
                  <Group gap={10}>
                    {getSectionIcon("vino")}
                    <Divider
                      orientation="vertical"
                      size={"xs"}
                      color="lightblue"
                    />
                  </Group>
                }
                variant="light"
                component={Link}
                onClick={toggle}
                to={"/vino"}
                key={"main_navlink_3"}
              >
                {t("section_wine")}
              </Button>
              <NavFiles
                key={navKey}
                activeId={activeId}
                setActiveId={setActiveId}
                toggle={toggle}
              />
            </Stack>

            <Container
              style={{
                position: "absolute",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "end",
                bottom: 10,
                opacity: 0.7,
                width: "100%",
                right: 0,
              }}
            >
              <Stack gap={2}>
                <Text size="xs">v2.01.05</Text>
                <Text size="xs">
                  {t("nav_icon_text")}
                  <a style={{ color: "#4dabf7" }} href="https://icons8.com/">
                    Icons8
                  </a>
                </Text>
              </Stack>
              <LangSelector />
            </Container>
          </AppShell.Navbar>
          <AppShell.Main>
            <Paper>
              <Routes>
                <Route
                  path="/menu/*"
                  element={<Menu reloadNav={reloadNav} />}
                />
                <Route
                  path="/finde/*"
                  element={<Finde reloadNav={reloadNav} />}
                />
                <Route
                  path="/vino/*"
                  element={<Wine reloadNav={reloadNav} />}
                />
                <Route path="*" element={<Main />} />
              </Routes>
            </Paper>
          </AppShell.Main>
        </AppShell>
      </ModalsProvider>
    </MantineProvider>
  );
}

export default App;
