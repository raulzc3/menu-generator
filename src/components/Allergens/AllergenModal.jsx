import {
  Button,
  Group,
  Stack,
  Divider,
  Modal,
  Text,
  Chip,
} from "@mantine/core";

import ConfirmationPopover from "../ConfirmationPopover";
import Allergen from "./Allergen";
import { useTranslation } from "react-i18next";

export default function AllergenModal({
  opened,
  onClose,
  modalDish,
  form,
  name,
}) {
  const { t } = useTranslation();

  return (
    <Modal
      size={"xl"}
      opened={opened}
      onClose={onClose}
      title={t("generic_editing_allergens")}
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
                <Allergen name="gluten" size={20} />
                {t("allergen_gluten")}
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
                <Allergen name="nuts" size={20} />
                {t("allergen_nuts")}
              </div>
            </Chip>
            <Chip value="shellfish">
              <div
                style={{ display: "flex", alignItems: "center", gap: ".5em" }}
              >
                <Allergen name="shellfish" size={20} />
                {t("allergen_shellfish")}
              </div>
            </Chip>
            <Chip value="crustaceans">
              <div
                style={{ display: "flex", alignItems: "center", gap: ".5em" }}
              >
                <Allergen name="crustaceans" size={20} />
                {t("allergen_crustaceans")}
              </div>
            </Chip>
            <Chip value="eggs">
              <div
                style={{ display: "flex", alignItems: "center", gap: ".5em" }}
              >
                <Allergen name="eggs" size={20} />
                {t("allergen_eggs")}
              </div>
            </Chip>
            <Chip value="fish">
              <div
                style={{ display: "flex", alignItems: "center", gap: ".5em" }}
              >
                <Allergen name="fish" size={20} />
                {t("allergen_fish")}
              </div>
            </Chip>
            <Chip value="soy">
              <div
                style={{ display: "flex", alignItems: "center", gap: ".5em" }}
              >
                <Allergen name="soy" size={20} />
                {t("allergen_soy")}
              </div>
            </Chip>
            <Chip value="peanuts">
              <div
                style={{ display: "flex", alignItems: "center", gap: ".5em" }}
              >
                <Allergen name="peanuts" size={20} />
                {t("allergen_peanuts")}
              </div>
            </Chip>
            <Chip value="dairy">
              <div
                style={{ display: "flex", alignItems: "center", gap: ".5em" }}
              >
                <Allergen name="dairy" size={20} />
                {t("allergen_dairy")}
              </div>
            </Chip>
            <Chip value="sesame">
              <div
                style={{ display: "flex", alignItems: "center", gap: ".5em" }}
              >
                <Allergen name="sesame" size={20} />
                {t("allergen_sesame")}
              </div>
            </Chip>
            <Chip value="celery">
              <div
                style={{ display: "flex", alignItems: "center", gap: ".5em" }}
              >
                <Allergen name="celery" size={20} />
                {t("allergen_celery")}
              </div>
            </Chip>
            <Chip value="mustard">
              <div
                style={{ display: "flex", alignItems: "center", gap: ".5em" }}
              >
                <Allergen name="mustard" size={20} />
                {t("allergen_mustard")}
              </div>
            </Chip>
            <Chip value="sulphites">
              <div
                style={{ display: "flex", alignItems: "center", gap: ".5em" }}
              >
                <Allergen name="sulphites" size={20} />
                {t("allergen_sulphites")}
              </div>
            </Chip>
            <Chip value="lupines">
              <div
                style={{ display: "flex", alignItems: "center", gap: ".5em" }}
              >
                <Allergen name="lupines" size={20} />
                {t("allergen_lupines")}
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
              {t("generic_restore")}
            </Button>
          </ConfirmationPopover>
          <Button flex={1} onClick={onClose}>
            {t("generic_accept")}
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
