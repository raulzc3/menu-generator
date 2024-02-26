import { randomId } from "@mantine/hooks";
import Allergen from "./Allergen";

export default function AllergenList({ allergens = [] }) {
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

  const sortedArray = defaultOrder.filter((allergen) =>
    allergens.includes(allergen)
  );

  return (
    allergens.length > 0 && (
      <div style={{ display: "flex" }}>
        {sortedArray.map((allergenName) => (
          <Allergen name={allergenName} size={22} key={randomId()} />
        ))}
      </div>
    )
  );
}
