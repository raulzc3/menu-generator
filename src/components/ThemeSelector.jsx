import React from "react";
import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { t } from "i18next";

export default function ThemeSelector() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const toggleColorScheme = () => {
    setColorScheme(colorScheme === "dark" ? "light" : "dark");
  };

  return (
    <ActionIcon
      onClick={toggleColorScheme}
      variant="transparent"
      size="md"
      color="blue"
      title={t("theme_icon_title", { theme: t(`theme_${colorScheme}`) })}
      aria-label="Toggle color scheme"
    >
      {colorScheme === "dark" ? (
        <IconSun stroke={1.5} />
      ) : (
        <IconMoon stroke={1.5} />
      )}
    </ActionIcon>
  );
}
