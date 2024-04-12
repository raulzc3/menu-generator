import {
  Button,
  Checkbox,
  Collapse,
  Divider,
  Group,
  Paper,
  Stack,
  Title,
} from "@mantine/core";
import { useListState, randomId } from "@mantine/hooks";
import React, { useState } from "react";
import { useForm } from "@mantine/form";
import FormList from "../components/FormList.jsx";
import PdfDownloader from "../components/PdfDownloader";
import MenuTemplate from "../components/MenuTemplate";
import CustomTextInput from "../components/CustomTextInput.jsx";

const included = [
  { label: "Entrantes", name: "entrantes", checked: false, key: randomId() },
  { label: "Primeros", name: "primeros", checked: true, key: randomId() },
  { label: "Segundos", name: "segundos", checked: true, key: randomId() },
  { label: "Postres", name: "postres", checked: false, key: randomId() },
];

export default function Menu(props) {
  const [shownElements, handlers] = useListState(included);
  const [data, setData] = useState(null); //{}
  const [title, setTitle] = useState("Menú del día");

  const form = useForm({
    initialValues: {
      entrantes: [],
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
        <Stack gap={"xs"}>
          <Title order={4}>Título de la página</Title>
          <CustomTextInput
            value={title}
            description="Texto que aparecerá en la cabecera de la página"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </Stack>
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
          {shownElements.map((element) => (
            <Collapse in={element.checked}>
              <Stack>
                <FormList
                  form={form}
                  label={element.label}
                  name={element.name}
                />
              </Stack>
              <Divider
                variant="dashed"
                style={{ marginTop: ".8rem", marginBottom: "1rem" }}
              />
            </Collapse>
          ))}
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
