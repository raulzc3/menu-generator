import "./App.css";
import "@mantine/core/styles.css";
import {
  MantineProvider,
  AppShell,
  Burger,
  Group,
  Title,
  NavLink,
  Paper,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ModalsProvider } from "@mantine/modals";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Main from "./views/Main";
import Menu from "./views/Menu";
import Finde from "./views/Finde";
import { useEffect } from "react";
import MenuTemplate from "./components/MenuTemplate";

function App() {
  const [opened, { toggle }] = useDisclosure();

  // const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // console.log(location.pathname);
  }, [location]);

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
              <Title order={3}>Generador de menús</Title>
            </Group>
          </AppShell.Header>
          <AppShell.Navbar p="md">
            <NavLink
              component={Link}
              onClick={toggle}
              to={"/menu"}
              key={"main_navlink_1"}
              label="Menú del día"
            />
            <NavLink
              component={Link}
              onClick={toggle}
              to={"/finde"}
              key={"main_navlink_2"}
              label="Fin de semana"
            />
          </AppShell.Navbar>
          <AppShell.Main>
            <Paper>
              <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/finde" element={<MenuTemplate />} />
                <Route
                  path="/*"
                  element={
                    <h1>
                      Onde vas? <br />
                      404 not fooound
                    </h1>
                  }
                />
              </Routes>
            </Paper>
          </AppShell.Main>
        </AppShell>
      </ModalsProvider>
    </MantineProvider>
  );
}

export default App;
