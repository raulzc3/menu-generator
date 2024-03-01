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
import Allergen from "./Allergen";

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
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                rowGap: "1rem",
                columnGap: ".rem",
              }}
            >
              <Chip value="gluten">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: ".5em",
                  }}
                >
                  Gluten
                  <Allergen name="gluten" size={20} />
                </div>
              </Chip>
              <Chip value="nuts">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: ".5em",
                  }}
                >
                  Frutos de cáscara
                  <Allergen name="nuts" size={20} />
                </div>
              </Chip>
              <Chip value="shellfish">
                <div
                  style={{ display: "flex", alignItems: "center", gap: ".5em" }}
                >
                  Moluscos
                  <Allergen name="shellfish" size={20} />
                </div>
              </Chip>
              <Chip value="crustaceans">
                <div
                  style={{ display: "flex", alignItems: "center", gap: ".5em" }}
                >
                  Crustáceos
                  <Allergen name="crustaceans" size={20} />
                </div>
              </Chip>
              <Chip value="eggs">
                <div
                  style={{ display: "flex", alignItems: "center", gap: ".5em" }}
                >
                  Huevo
                  <Allergen name="eggs" size={20} />
                </div>
              </Chip>
              <Chip value="fish">
                <div
                  style={{ display: "flex", alignItems: "center", gap: ".5em" }}
                >
                  Pescado
                  <Allergen name="fish" size={20} />
                </div>
              </Chip>
              <Chip value="soy">
                <div
                  style={{ display: "flex", alignItems: "center", gap: ".5em" }}
                >
                  Soja
                  <Allergen name="soy" size={20} />
                </div>
              </Chip>
              <Chip value="peanuts">
                <div
                  style={{ display: "flex", alignItems: "center", gap: ".5em" }}
                >
                  Cacahuetes
                  <Allergen name="peanuts" size={20} />
                </div>
              </Chip>
              <Chip value="dairy">
                <div
                  style={{ display: "flex", alignItems: "center", gap: ".5em" }}
                >
                  Lácteos
                  <Allergen name="dairy" size={20} />
                </div>
              </Chip>
              <Chip value="sesame">
                <div
                  style={{ display: "flex", alignItems: "center", gap: ".5em" }}
                >
                  Sésamo
                  <Allergen name="sesame" size={20} />
                </div>
              </Chip>
              <Chip value="celery">
                <div
                  style={{ display: "flex", alignItems: "center", gap: ".5em" }}
                >
                  Apio
                  <Allergen name="celery" size={20} />
                </div>
              </Chip>
              <Chip value="mustard">
                <div
                  style={{ display: "flex", alignItems: "center", gap: ".5em" }}
                >
                  Mostaza
                  <Allergen name="mustard" size={20} />
                </div>
              </Chip>
              <Chip value="sulphites">
                <div
                  style={{ display: "flex", alignItems: "center", gap: ".5em" }}
                >
                  Sulfitos
                  <Allergen name="sulphites" size={20} />
                </div>
              </Chip>
              <Chip value="lupines">
                <div
                  style={{ display: "flex", alignItems: "center", gap: ".5em" }}
                >
                  Altramuces
                  <Allergen name="lupines" size={20} />
                </div>
              </Chip>
            </div>
          </Chip.Group>
          <Divider />
          <Group>
            <ConfirmationPopover
              onOk={() => {
                form.setFieldValue(`${name}.${modalDish.index}.alergenos`, []);
              }}
            >
              <Button variant="outline" flex={1}>
                Restablecer
              </Button>
            </ConfirmationPopover>
            <Button flex={1} onClick={handleCloseModal}>
              Aceptar
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}
