import { Button, Center, Container, Flex, Group, Paper } from "@mantine/core";
import { useEffect, useState } from "react";
import { usePDF } from "react-to-pdf";
import moment from "moment/moment";

export default function PdfDownloader({ children, setData, type }) {
  const filename = type + "_" + moment().format("YYYY-MM-DD") + ".pdf";
  const { toPDF, targetRef } = usePDF({ filename: filename });
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (downloading) {
      toPDF();
      setDownloading(false);
    }
  }, [downloading]);

  return (
    <div>
      <Group gap="xs" justify={"space-between"} grow>
        <Button
          onClick={() => {
            setData(null);
          }}
          variant="default"
          // style={{ width: "49%" }}
        >
          Volver
        </Button>
        <Button
          onClick={() => {
            setDownloading(true);
          }}
          // style={{ width: "49%" }}
        >
          Descargar
        </Button>
      </Group>
      <Paper shadow="xl" p={"xs"}>
        <Center>{children}</Center>
      </Paper>

      <div
        style={{
          position: "absolute",
          top: 2000,
          display: downloading ? "block" : "none",
        }}
      >
        <Container
          ref={targetRef}
          style={{
            width: "210mm",
            height: "290mm",
          }}
        >
          <Center style={{ padding: "25mm" }}>{children}</Center>
        </Container>
      </div>
    </div>
  );
}
