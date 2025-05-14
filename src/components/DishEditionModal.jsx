import {
  Button,
  Group,
  Stack,
  Divider,
  Modal,
  Chip,
  NumberInput,
  Select,
  FocusTrap,
  ActionIcon,
  Grid,
} from "@mantine/core";
// import ConfirmationPopover from "./ConfirmationPopover";
import { useTranslation } from "react-i18next";
import CustomTextInput from "./CustomTextInput";
import AllergenList from "./Allergens/AllergenList";
import AiTextInput from "./AiTextInput";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

export default function DishEditionModal({
  opened,
  onClose,
  modalDish,
  form,
  name,
  withPrices,
  withDescription,
}) {
  const { t } = useTranslation();

  const hidePrice =
    form.getValues()[name]?.[modalDish.index]?.hidePrice ?? false;

  return (
    <Modal
      size={"xl"}
      opened={opened}
      onClose={onClose}
      withCloseButton={false}
      // title={"Edición de plato"}
    >
      <FocusTrap.InitialFocus />
      <Stack>
        <CustomTextInput
          label={t("generic_name")}
          placeholder={t("generic_name")}
          {...form.getInputProps(`${name}.${modalDish.index}.nombre`)}
        />
        {withPrices && (
          <Grid align="flex-end">
            <Grid.Col span={"auto"}>
              <NumberInput
                disabled={hidePrice}
                onKeyDown={(e) => {
                  //Prevent submit on enter
                  if (e.key === "Enter") {
                    e.target.blur();
                    e.preventDefault();
                  }
                }}
                label={t("generic_price")}
                hideControls
                decimalScale={2}
                decimalSeparator=","
                thousandSeparator="."
                placeholder={t("generic_price")}
                {...form.getInputProps(`${name}.${modalDish.index}.precio`)}
              />
            </Grid.Col>
            <Grid.Col span={"auto"}>
              <Select
                disabled={hidePrice}
                comboboxProps={{
                  transitionProps: { transition: "scale-y", duration: 200 },
                }}
                allowDeselect={false}
                label={t("currency_label")}
                rightSectionPointerEvents="none"
                defaultValue={t("currency_eur")}
                // rightSection={<></>}
                data={[
                  t("currency_eur"),
                  t("currency_eur_kg"),
                  t("currency_eur_unit"),
                  t("currency_eur_piece"),
                  t("currency_eur_person"),
                ]} //Todo: multiple currency support (?)
                {...form.getInputProps(`${name}.${modalDish.index}.currency`)}
              />
            </Grid.Col>
            <Grid.Col span="content">
              <ActionIcon
                size={"lg"}
                variant="light"
                color="blue"
                style={{ flexGrow: 0 }}
                onClick={() => {
                  form.setFieldValue(
                    `${name}.${modalDish.index}.hidePrice`,
                    !hidePrice
                  );
                }}
              >
                {!hidePrice ? <IconEyeOff /> : <IconEye />}
              </ActionIcon>
            </Grid.Col>
          </Grid>
        )}
        {withDescription && (
          <AiTextInput
            label={t("generic_description")}
            placeholder={t("generic_description")}
            allowLineBreak
            {...form.getInputProps(`${name}.${modalDish.index}.description`)}
          />
        )}
        <Divider label={t("generic_allergens")} />
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
              rowGap: ".5rem",
            }}
          >
            <AllergenList form={true} />
          </div>
        </Chip.Group>

        <Group mt={"xs"}>
          {/* <ConfirmationPopover
            onOk={() => {
              form.setFieldValue(`${name}.${modalDish.index}.alergenos`, []);
            }}
          >
            <Button variant="outline" flex={1}>
              {t("generic_restore")}
            </Button>
          </ConfirmationPopover> */}
          <Button flex={1} onClick={onClose}>
            {t("generic_accept")}
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
