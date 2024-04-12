import {
  Button,
  Center,
  Container,
  Group,
  Loader,
  Paper,
  Skeleton,
  Space,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { usePDF } from "react-to-pdf";
import moment from "moment/moment";

export default function PdfDownloader({ children, setData, type }) {
  const filename = type + "_" + moment().format("YYYY-MM-DD_HHmmss") + ".pdf";
  const { toPDF, targetRef } = usePDF({ filename: filename });
  const [downloading, setDownloading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const delay = Math.random() * (500 - 150) + 150;
    setTimeout(() => {
      setLoading(false);
    }, delay);
  }, []);

  useEffect(() => {
    if (downloading) {
      toPDF();
      setTimeout(() => {
        setDownloading(false);
      }, 500);
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
          disabled={downloading}
        >
          Volver
        </Button>
        <Button
          onClick={() => {
            setDownloading(true);
          }}
          disabled={downloading}
        >
          {downloading ? (
            <Loader color="rgba(255, 255, 255, 1)" size="xs" />
          ) : (
            "Descargar"
          )}
        </Button>
      </Group>
      <Space h={"md"} />
      <Skeleton visible={loading}>
        <Center>
          <Paper className="downloadPreview" withBorder shadow="md">
            <Center style={{ padding: "25mm" }}>{children}</Center>
          </Paper>
        </Center>
      </Skeleton>

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
