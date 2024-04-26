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

  const currentLanguage = i18n.resolvedLanguage;

  const handleLanguageChange = (newLang) => {
    i18n.changeLanguage(newLang);
    document.title = t("main_title");
    document.location.reload();
  };

  return (
    <Menu trigger="click-hover" openDelay={100} closeDelay={400}>
      <Menu.Target>
        <Button size="xs" variant="subtle" leftSection={<IconWorld />}>
          <Text size="sm">{currentLanguage.toUpperCase()}</Text>
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>{t("language")}</Menu.Label>
        {Object.keys(langs).map((lang) => (
          <Menu.Item
            disabled={lang === currentLanguage}
            onClick={() =>
              handleLanguageChange(lang)
            } /* aqui iría la bandera del idioma: leftSection={} */
          >
            {langs[lang]}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
