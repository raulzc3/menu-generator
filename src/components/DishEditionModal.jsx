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
} from "@mantine/core";

// import ConfirmationPopover from "./ConfirmationPopover";
import { useTranslation } from "react-i18next";
import CustomTextInput from "./CustomTextInput";
import AllergenList from "./Allergens/AllergenList";

export default function DishEditionModal({
  opened,
  onClose,
  modalDish,
  form,
  name,
  withPrices,
}) {
  const { t } = useTranslation();

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
          <Group grow>
            <NumberInput
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
            <Select
              comboboxProps={{
                transitionProps: { transition: "scale-y", duration: 200 },
              }}
              allowDeselect={false}
              label="Moneda"
              rightSectionPointerEvents="none"
              defaultValue={t("currency_eur")}
              // rightSection={<></>}
              data={[
                t("currency_eur"),
                t("currency_eur_kg"),
                t("currency_eur_unit"),
              ]} //Todo: multy currency support (?)
              {...form.getInputProps(`${name}.${modalDish.index}.currency`)}
            />
          </Group>
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

        <Divider />
        <Group>
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
