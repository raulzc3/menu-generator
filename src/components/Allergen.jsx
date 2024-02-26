import { Image } from "@mantine/core";
import allergenManager from "../utils/allergenManager";

export default function Allergen({ size = 25, name }) {
  return (
    name && (
      <Image
        src={allergenManager(name)}
        alt={`alergeno_${name}`}
        h={size}
        w={size}
      />
    )
  );
}
