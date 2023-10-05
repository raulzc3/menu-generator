import {
  Button,
  Center,
  Checkbox,
  Divider,
  Group,
  Stack,
  Title,
} from "@mantine/core";
import { useListState, randomId } from "@mantine/hooks";
import { useState } from "react";
import { useForm } from "@mantine/form";
import FormList from "../components/FormList";

const included = [
  { label: "Primeros", checked: true, key: randomId() },
  { label: "Segundos", checked: true, key: randomId() },
  { label: "Postres", checked: false, key: randomId() },
  // { label: "Café", checked: false, key: randomId() },
];

export default function Menu(props) {
  const [values, handlers] = useListState(included);
  const [active, setActive] = useState(1);
  const form = useForm();

  const customMenuParts = values.map((value, index) => (
    <Checkbox
      label={value.label}
      key={value.key}
      checked={value.checked}
      onChange={(event) =>
        handlers.setItemProp(index, "checked", event.currentTarget.checked)
      }
    />
  ));

  /*   console.log(values); */

  return (
    <>
      <Stack>
        <Title order={4}>Elementos a mostrar</Title>
        <Group>{customMenuParts}</Group>
        <form
          onSubmit={form.onSubmit((values) => {
            const result = {};

            for (const [key, value] of Object.entries(values)) {
              const category = key.substring(0, key.indexOf("_"));
              result[category]
                ? result[category].push(value)
                : (result[category] = [value]);
            }

            console.log(result);
          })}
        >
          {values[0].checked && (
            <>
              <Stack>
                <FormList form={form} label="Primeros" name="primeros" />
              </Stack>
              <Divider style={{ marginTop: ".8rem", marginBottom: "1rem" }} />
            </>
          )}
          {values[1].checked && (
            <>
              <Stack>
                <FormList form={form} label="Segundos" name="segundos" />
              </Stack>
              <Divider style={{ marginTop: ".8rem", marginBottom: "1rem" }} />
            </>
          )}
          {values[2].checked && (
            <>
              <Stack>
                <FormList form={form} label="Postres" name="postres" />
              </Stack>
              <Divider style={{ marginTop: ".8rem", marginBottom: "1rem" }} />
            </>
          )}
          <Button fullWidth type="submit">
            Continuar
          </Button>
        </form>
      </Stack>
    </>
  );
}
