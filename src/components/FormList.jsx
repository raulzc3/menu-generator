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
  SimpleGrid,
} from "@mantine/core";
import { randomId, useDisclosure } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons-react";
import { useState } from "react";

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
      <Modal
        withCloseButton={false}
        size={"xl"}
        opened={modalOpened}
        onClose={handleCloseModal}
        title="Editando alérgenos de:"
      >
        <Stack>
          <Text lineClamp={1} fw={700}>
            {modalDish.name}
          </Text>
          <Divider />

          <Chip.Group
            multiple="true"
            value={form.values[name][modalDish.index]?.alergenos}
            onChange={(allergenArray) => {
              form.setFieldValue(
                `${name}.${modalDish.index}.alergenos`,
                allergenArray
              );
            }}
          >
            <SimpleGrid cols={2}>
              <Chip value="gl">Gluten</Chip>
              <Chip value="fr">Frutos de cáscara</Chip>
              <Chip value="cr">Crustáceos</Chip>
              <Chip value="ml">Moluscos</Chip>
              <Chip value="hu">Huevo</Chip>
              <Chip value="pe">Pescado</Chip>
              <Chip value="ca">Cacahuetes</Chip>
              <Chip value="so">Soja</Chip>
              <Chip value="la">Lácteos</Chip>
              <Chip value="se">Sésamo</Chip>
              <Chip value="ap">Apio</Chip>
              <Chip value="mo">Mostaza</Chip>
              <Chip value="al">Altramuces</Chip>
              <Chip value="su">Sulfitos</Chip>
            </SimpleGrid>
          </Chip.Group>
          <Divider />
          <Group>
            {/* Posibilidad de añadir popover de confirmación antes de borrar los alergenos */}
            <Button
              variant="outline"
              flex={1}
              onClick={() => {
                form.setFieldValue(`${name}.${modalDish.index}.alergenos`, []);
              }}
            >
              Restablecer
            </Button>
            <Button flex={1} onClick={handleCloseModal}>
              Aceptar
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}
