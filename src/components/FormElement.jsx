import {
  Button,
  Grid,
  NumberInput,
  ActionIcon,
  Stack,
  Collapse,
  Divider,
} from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

import CustomTextInput from "./CustomTextInput";
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
  handleModalOpen,
  isLast,
}) {
  const [opened, setOpened] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
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
      <Stack>
        <Divider label={index + 1} variant="dashed" labelPosition="left" />
        <Grid key={item.key} gutter={6}>
          <Grid.Col span={"auto"}>
            <CustomTextInput
              placeholder={t("generic_dish")}
              {...form.getInputProps(`${name}.${index}.nombre`)}
            />
          </Grid.Col>
          {withPrices && (
            <Grid.Col span={2.5}>
              <NumberInput
                onKeyDown={(e) => {
                  //Prevent submit on enter
                  if (e.key === "Enter") {
                    e.target.blur();
                    e.preventDefault();
                  }
                }}
                hideControls
                decimalScale={2}
                decimalSeparator=","
                thousandSeparator="."
                suffix="€"
                placeholder={t("generic_price")}
                {...form.getInputProps(`${name}.${index}.precio`)}
              />
            </Grid.Col>
          )}
          <Grid.Col span="content">
            <ConfirmationPopover
              onOk={() => {
                setOpened(false);
              }}
            >
              <ActionIcon size={"lg"} color="red">
                <IconTrash
                  style={{ width: "80%", height: "70%" }}
                  stroke={1.5}
                />
              </ActionIcon>
            </ConfirmationPopover>
          </Grid.Col>
        </Grid>
        {hasAllergens && <AllergenList allergens={allergens} gap={2} />}
        <Button
          variant="outline"
          onClick={() => handleModalOpen({ name: item.nombre, index })}
        >
          {hasAllergens
            ? t("generic_edit_allergens")
            : t("generic_add_allergens")}
        </Button>
      </Stack>
    </Collapse>
  );
}
