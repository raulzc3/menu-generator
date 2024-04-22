import {
  Checkbox,
  Collapse,
  Divider,
  Group,
  Stack,
  Title,
} from "@mantine/core";
import { useListState, randomId } from "@mantine/hooks";
import React from "react";
import { useForm } from "@mantine/form";
import { useTranslation } from "react-i18next";
import FormList from "../components/FormList.jsx";
import Editor from "../components/Editor.jsx";

export default function Menu(props) {
  const { t } = useTranslation();

  const menuParts = [
    {
      label: t("menu_section_starters"),
      name: t("menu_section_starters"),
      checked: false,
      key: randomId(),
    },
    {
      label: t("menu_section_firsts"),
      name: t("menu_section_firsts"),
      checked: true,
      key: randomId(),
    },
    {
      label: t("menu_section_seconds"),
      name: t("menu_section_seconds"),
      checked: true,
      key: randomId(),
    },
    {
      label: t("menu_section_desserts"),
      name: t("menu_section_desserts"),
      checked: false,
      key: randomId(),
    },
  ];

  const [shownElements, handlers] = useListState(menuParts);
  const initialValues = menuParts.reduce((result, menuPart) => {
    result[menuPart.name] = [];
    return result;
  }, {});
  const form = useForm({
    initialValues: initialValues,
  });

  const customMenuParts = shownElements.map((value, index) => (
    <Checkbox
      label={value.label}
      key={value.key}
      checked={value.checked}
      onChange={(event) =>
        handlers.setItemProp(index, "checked", event.currentTarget.checked)
      }
    />
  ));

  return (
    <Editor
      type={"menu"}
      titlePlaceholder={t("generic_daily_menu")}
      form={form}
      initialValues={initialValues}
      parseData={(values) => {
        const result = {};
        let idx = 0;
        for (const [key, value] of Object.entries(values)) {
          if (shownElements[idx].checked && value.length > 0) {
            result[key] = value;
          }
          idx++;
        }
        return result;
      }}
    >
      <Title order={4} mb={5}>
        {t("generic_shown_elements_title")}
      </Title>
      <Group>{customMenuParts}</Group>
      <Divider style={{ marginTop: ".8rem", marginBottom: "1rem" }} />
      {shownElements.map((element) => (
        <Collapse in={element.checked}>
          <Stack>
            <FormList form={form} label={element.label} name={element.name} />
          </Stack>
          <Divider
            variant="dashed"
            style={{ marginTop: ".8rem", marginBottom: "1rem" }}
          />
        </Collapse>
      ))}
    </Editor>
  );
}
