import {
  Button,
  Stack,
  Collapse,
  Divider,
  Text,
  Paper,
  Group,
} from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";

import ConfirmationPopover from "./ConfirmationPopover";
import AllergenList from "./Allergens/AllergenList";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function FormElement({
  form,
  name,
  item,
  index,
  withPrices,
  allergens,
  handleEditionModalOpen,
  type,
  isNew,
}) {
  const [opened, setOpened] = useState(false);

  const openEditionModal = () => {
    handleEditionModalOpen({ index, ...item });
  };

  const { t } = useTranslation();

  useEffect(() => {
    if (isNew) {
      openEditionModal();
    }
    setOpened(true);
  }, []);

  const hasAllergens = allergens?.length > 0;

  return (
    <Collapse
      mb={"xs"}
      in={opened}
      onTransitionEnd={() => {
        if (!opened) {
          form.removeListItem(name, index);
        }
      }}
    >
      <Paper shadow="xs" p="xs">
        <Stack gap="xs">
          <Text fw={700} size="sm">
            {item.nombre}
          </Text>
          <Group justify="space-between" gap={0}>
            <Text size="sm">
              {item.precio}
              {item.precio && (item.currency || "€")}
            </Text>

            {hasAllergens && (
              <AllergenList allergens={allergens} gap={1} size={18} />
            )}
          </Group>

          <Divider></Divider>
          <Group grow gap={"xs"}>
            <ConfirmationPopover
              onOk={() => {
                setOpened(false);
              }}
            >
              <Button
                variant="light"
                color="red"
                leftSection={
                  <IconTrash
                    style={{ width: "80%", height: "70%" }}
                    stroke={1.5}
                  />
                }
                size="xs"
              >
                {t("generic_delete")}
              </Button>
            </ConfirmationPopover>
            <Button
              variant="light"
              w={"50%"}
              leftSection={
                <IconPencil
                  style={{ width: "80%", height: "70%" }}
                  stroke={1.5}
                />
              }
              size="xs"
              onClick={openEditionModal}
            >
              {t("generic_edit")}
            </Button>
          </Group>
        </Stack>
      </Paper>
    </Collapse>
  );
}
