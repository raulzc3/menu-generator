import {
  Button,
  Checkbox,
  Divider,
  Group,
  Paper,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useListState, randomId } from "@mantine/hooks";
import { useState } from "react";
import { useForm } from "@mantine/form";
import FormList from "../components/FormList.jsx";
import PdfDownloader from "../components/PdfDownloader";
import MenuTemplate from "../components/MenuTemplate";

const included = [
  { label: "Primeros", checked: true, key: randomId() },
  { label: "Segundos", checked: true, key: randomId() },
  { label: "Postres", checked: false, key: randomId() },
];

export default function Menu(props) {
  const [shownElements, handlers] = useListState(included);
  const [data, setData] = useState(null); //{}
  const [title, setTitle] = useState("Menú del día");

  const form = useForm({
    initialValues: {
      primeros: [],
      segundos: [],
      postres: [],
    },
  });

  const customMenuParts = shownElements.map((value, index) => (
    <Checkbox
      label={value.label}
      key={value.key}
      checked={value.checked}
      onChange={(event) =>
        handlers.setItemProp(index, "checked", event.currentTarget.checked)
      }
    />
  ));

  return (
    <Paper style={{ maxWidth: "50rem" }} shadow="xs" p={10} h={"100%"}>
      <Stack style={{ display: !data ? "flex" : "none" }}>
        <Title order={4}>Título de la página</Title>
        <TextInput
          value={title}
          description="Texto que aparecerá en la cabecera de la página"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <Title order={4}>Elementos a mostrar</Title>
        <Group>{customMenuParts}</Group>
        <Divider style={{ marginTop: ".8rem", marginBottom: "1rem" }} />
        <form
          onSubmit={form.onSubmit((values) => {
            const result = {};
            let idx = 0;
            for (const [key, value] of Object.entries(values)) {
              if (shownElements[idx].checked && value.length > 0) {
                result[key] = value;
              }
              idx++;
            }

            setData(result);
          })}
        >
          {shownElements[0].checked && (
            <>
              <Stack>
                <FormList form={form} label="Primeros" name="primeros" />
              </Stack>
              <Divider
                variant="dashed"
                style={{ marginTop: ".8rem", marginBottom: "1rem" }}
              />
            </>
          )}
          {shownElements[1].checked && (
            <>
              <Stack>
                <FormList form={form} label="Segundos" name="segundos" />
              </Stack>
              <Divider
                variant="dashed"
                style={{ marginTop: ".8rem", marginBottom: "1rem" }}
              />
            </>
          )}
          {shownElements[2].checked && (
            <>
              <Stack>
                <FormList form={form} label="Postres" name="postres" />
              </Stack>
              <Divider
                variant="dashed"
                style={{ marginTop: ".8rem", marginBottom: "1rem" }}
              />
            </>
          )}
          <Button fullWidth type="submit">
            Continuar
          </Button>
        </form>
      </Stack>
      {data && (
        <PdfDownloader setData={setData} type="menu">
          <MenuTemplate data={data} title={title} />
        </PdfDownloader>
      )}
    </Paper>
  );
}
