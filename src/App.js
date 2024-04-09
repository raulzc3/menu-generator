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
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ModalsProvider } from "@mantine/modals";
import { Link, Route, Routes } from "react-router-dom";
import Main from "./views/Main";
import Menu from "./views/Menu";
import Finde from "./views/Finde";
import AppLogo from "./components/AppLogo";

function App() {
  const [opened, { toggle }] = useDisclosure();

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
            width: { base: 200, md: 200, lg: 300 },
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
              <AppLogo />
              <Title order={3}>Generador de menús</Title>
            </Group>
          </AppShell.Header>
          <AppShell.Navbar p="md">
            <Text fw={500} style={{ marginBottom: "1rem" }}>
              Crear nuevo:
            </Text>
            <Stack>
              <Button
                variant="light"
                component={Link}
                onClick={toggle}
                to={"/menu"}
                key={"main_navlink_1"}
              >
                Menú del día
              </Button>
              <Button
                variant="light"
                component={Link}
                onClick={toggle}
                to={"/finde"}
                key={"main_navlink_2"}
              >
                Fin de semana
              </Button>
            </Stack>

            <Container
              style={{
                position: "absolute",
                bottom: 10,
                opacity: 0.7,
                right: 0,
              }}
            >
              <Text size="xs">
                v1.6.02 | Iconos de{" "}
                <a style={{ color: "#4dabf7" }} href="https://icons8.com/">
                  Icons8
                </a>
              </Text>
            </Container>
          </AppShell.Navbar>
          <AppShell.Main>
            <Paper>
              <Routes>
                <Route path="/menu" element={<Menu />} />
                <Route path="/finde" element={<Finde />} />
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
