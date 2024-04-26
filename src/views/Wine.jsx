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

export default function Wine({ reloadNav, ...props }) {
  const { t } = useTranslation();

  const menuParts = [
    {
      label: t("wine_house_wines"),
      name: t("wine_house_wines"),
      checked: true,
      key: randomId(),
    },
    {
      label: "Rioja",
      name: "Rioja",
      checked: true,
      key: randomId(),
    },
    {
      label: "Ribera del Duero",
      name: "Ribera del Duero",
      checked: true,
      key: randomId(),
    },
    {
      label: "Mencía",
      name: "Mencía",
      checked: true,
      key: randomId(),
    },
    {
      label: "Godello",
      name: "Godello",
      checked: true,
      key: randomId(),
    },
    {
      label: "Albariño",
      name: "Albariño",
      checked: true,
      key: randomId(),
    },
    {
      label: "Ribeiro",
      name: "Ribeiro",
      checked: true,
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
      type={"vino"}
      titlePlaceholder={t("section_wine")}
      form={form}
      initialValues={initialValues}
      reloadNav={reloadNav}
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
            <FormList
              type={"vino"}
              form={form}
              label={element.label}
              name={element.name}
              withPrices
            />
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
