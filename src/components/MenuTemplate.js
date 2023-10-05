import { Button, Center, Container, Stack, Title } from "@mantine/core";
import { usePDF } from "react-to-pdf";

export default function MenuTemplate() {
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });
  return (
    <div>
      <Button onClick={() => toPDF()}>Descargar</Button>
      <Container fluid ref={targetRef}>
        <Center>
          <Stack>
            <Center>
              <Title>Menú del día</Title>
            </Center>
            <Center>
              <Title>Primeros</Title>
            </Center>
            <Stack>
              <Title style={{}}>Algo</Title>
              <Title style={{}}>asdfasdf</Title>
              <Title style={{}}>Primasdfasdferos</Title>
              <Title style={{}}>Primasdfasdferos</Title>
            </Stack>

            <Center>
              <Title>Segundos</Title>
            </Center>
            <Stack>
              <Title style={{}}>Algo</Title>
              <Title style={{}}>asdfasdf</Title>
              <Title style={{}}>Seguasdfasdfndos</Title>
              <Title style={{}}>Seguasdfasdfndos</Title>
            </Stack>
          </Stack>
        </Center>
      </Container>
    </div>
  );
}
