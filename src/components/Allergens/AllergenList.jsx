import { randomId } from "@mantine/hooks";
import Allergen from "./Allergen";
import { useTranslation } from "react-i18next";
import { Chip } from "@mantine/core";

export default function AllergenList({
  allergens = [],
  gap = 1,
  form = false,
  size = 22,
}) {
  const defaultOrder = [
    "gluten",
    "nuts",
    "crustaceans",
    "shellfish",
    "eggs",
    "fish",
    "peanuts",
    "soy",
    "dairy",
    "sesame",
    "sulphites",
    "celery",
    "mustard",
    "lupines",
  ];

  const { t } = useTranslation();

  if (form) {
    return defaultOrder.map((allergen) => (
      <Chip value={allergen} h={30}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: ".5em",
          }}
        >
          <Allergen name={allergen} size={18} />
          {t("allergen_" + allergen)}
        </div>
      </Chip>
    ));
  }
  const sortedArray = defaultOrder.filter((allergen) =>
    allergens.includes(allergen)
  );

  return (
    allergens.length > 0 && (
      <div style={{ display: "flex", gap: gap }}>
        {sortedArray.map((allergenName) => (
          <Allergen name={allergenName} size={size} key={randomId()} />
        ))}
      </div>
    )
  );
}
