import {
  Button,
  TextInput,
  Title,
  Group,
  Grid,
  NumberInput,
  ActionIcon,
} from "@mantine/core";
import { randomId } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons-react";

export default function FormList({
  label,
  titleOrder,
  name,
  form,
  withPrices,
}) {
  const fields = form.values[name].map((item, index) => (
    <Grid key={item.key} gutter={6}>
      <Grid.Col span={"auto"}>
        <TextInput
          placeholder="Plato"
          {...form.getInputProps(`${name}.${index}.nombre`)}
        />
      </Grid.Col>
      {withPrices && (
        <Grid.Col span={2.5}>
          <NumberInput
            hideControls
            decimalScale={2}
            decimalSeparator=","
            thousandSeparator="."
            suffix="€"
            placeholder="Precio"
            {...form.getInputProps(`${name}.${index}.precio`)}
          />
        </Grid.Col>
      )}

      <Grid.Col span="content">
        <ActionIcon
          size={"lg"}
          color="red"
          onClick={() => form.removeListItem(name, index)}
        >
          <IconTrash
            style={{ width: "80%", height: "70%" }}
            stroke={1.5}
          ></IconTrash>
        </ActionIcon>
      </Grid.Col>
    </Grid>
  ));

  return (
    <>
      <Group>
        <Title order={titleOrder || 4}>{label}</Title>
        <Button
          size="xs"
          onClick={() => {
            form.insertListItem(name, {
              nombre: "",
              precio: "",
              key: randomId(),
            });
          }}
        >
          + Añadir
        </Button>
      </Group>
      {fields}
    </>
  );
}
