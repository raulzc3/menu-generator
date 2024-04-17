import { Button, Menu, Text } from "@mantine/core";
import { IconWorld } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

const langs = {
  en: "English",
  es: "Español",
  gl: "Galego",
};

export default function LangSelector({ style }) {
  const { t, i18n } = useTranslation();

  const currentLanguage = i18n.resolvedLanguage.toUpperCase();

  console.log(i18n.resolvedLanguage);
  return (
    <Menu trigger="click-hover" openDelay={100} closeDelay={400}>
      <Menu.Target>
        <Button size="xs" variant="subtle" leftSection={<IconWorld />}>
          <Text size="sm">{currentLanguage}</Text>
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>{t("language")}</Menu.Label>
        {Object.keys(langs).map((lang) => (
          <Menu.Item
            onClick={() => {
              i18n.changeLanguage(lang);
            }} /* aqui iría la bandera del idioma: leftSection={} */
          >
            {langs[lang]}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}