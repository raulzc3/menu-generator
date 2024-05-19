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
      <Paper shadow="xs" p="sm">
        <Stack>
          <Group justify="space-between" wrap="nowrap">
            <Text style={{ fontWeight: "bold" }} size="sm">
              {item.nombre}
            </Text>
            <Divider pos></Divider>
            {withPrices && item.precio && (
              <Text
                size="sm"
                style={{
                  whiteSpace: "nowrap",
                  alignSelf: "start",
                  fontWeight: "bold",
                }}
              >
                {item.precio} {item.currency || "€"}{" "}
              </Text>
            )}
          </Group>

          {hasAllergens && <AllergenList allergens={allergens} gap={2} />}
          <Divider h={0} size={"xs"}></Divider>
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
