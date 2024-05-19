import { randomId } from "@mantine/hooks";
import Allergen from "./Allergen";
import { useTranslation } from "react-i18next";
import { Chip } from "@mantine/core";

export default function AllergenList({
  allergens = [],
  gap = 1,
  form = false,
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
      <Chip value={allergen}>
        <div style={{ display: "flex", alignItems: "center", gap: ".5em" }}>
          <Allergen name={allergen} size={20} />
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
          <Allergen name={allergenName} size={22} key={randomId()} />
        ))}
      </div>
    )
  );
}
