import {
  Button,
  TextInput,
  Title,
  Group,
  Grid,
  NumberInput,
  ActionIcon,
  Stack,
  Divider,
  Modal,
  Text,
  Chip,
} from "@mantine/core";
import { randomId, useDisclosure } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import ConfirmationPopover from "./ConfirmationPopover";
import Allergen from "./Allergens/Allergen";
import AllergenModal from "./Allergens/AllergenModal";

export default function FormList({
  label,
  titleOrder,
  name,
  form,
  withPrices,
}) {
  const [modalDish, setModalDish] = useState({});
  const [modalOpened, { open: openModal, close: closeModal }] =
    useDisclosure(false);

  const handleModalOpen = (dish) => {
    setModalDish(dish);
    openModal();
  };

  const handleCloseModal = () => {
    closeModal();
    setTimeout(() => {
      setModalDish({});
    }, 150);
  };

  const fields = form.values[name].map((item, index) => (
    <Stack>
      {index > 0 && <Divider />}
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
      <Button
        variant="outline"
        onClick={() => handleModalOpen({ name: item.nombre, index })}
      >
        Alérgenos
      </Button>
    </Stack>
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
      <AllergenModal
        opened={modalOpened}
        onClose={handleCloseModal}
        modalDish={modalDish}
        form={form}
        name={name}
      />
    </>
  );
}
