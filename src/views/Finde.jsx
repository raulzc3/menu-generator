import { Button, Divider, Paper, Stack, Title } from "@mantine/core";

import { useState } from "react";
import { useForm } from "@mantine/form";
import FormList from "../components/FormList.jsx";
import PdfDownloader from "../components/PdfDownloader";
import FindeTemplate from "../components/FindeTemplate";

export default function Finde(props) {
  const [data, setData] = useState(null); //{}

  const form = useForm({
    initialValues: {
      platos: [],
    },
  });

  return (
    <Paper style={{ maxWidth: "50rem" }} shadow="xs" p={10} h={"100%"}>
      <Stack style={{ display: !data ? "flex" : "none" }}>
        <form
          onSubmit={form.onSubmit((values) => {
            setData(values);
          })}
        >
          <Title order={4}>Título de la página</Title>

          <Divider style={{ marginTop: ".8rem", marginBottom: "1rem" }} />
          <Stack>
            <FormList withPrices form={form} label="Platos" name="platos" />
            <Divider
              variant="dashed"
              style={{ marginTop: ".8rem", marginBottom: "1rem" }}
            />
          </Stack>
          <Button fullWidth type="submit">
            Continuar
          </Button>
        </form>
      </Stack>
      {data && (
        <div>
          <PdfDownloader setData={setData} type="menu">
            <FindeTemplate data={data} />
          </PdfDownloader>
        </div>
      )}
    </Paper>
  );
}
