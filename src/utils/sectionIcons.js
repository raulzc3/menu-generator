import { IconBook, IconGlass, IconToolsKitchen2 } from "@tabler/icons-react";

const sectionIcons = {
  menu: <IconBook size={18} />,
  vino: <IconGlass size={18} />,
  finde: <IconToolsKitchen2 size={18} />,
};

export default function getSectionIcon(section) {
  return section ? sectionIcons[section] : null;
}
