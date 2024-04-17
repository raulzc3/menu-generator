import {
  Button,
  Checkbox,
  Collapse,
  Divider,
  Group,
  Paper,
  Stack,
  Title,
} from "@mantine/core";
import { useListState, randomId } from "@mantine/hooks";
import React, { useState } from "react";
import { useForm } from "@mantine/form";
import FormList from "../components/FormList.jsx";
import PdfDownloader from "../components/PdfDownloader";
import MenuTemplate from "../components/MenuTemplate";
import CustomTextInput from "../components/CustomTextInput.jsx";
import { useTranslation } from "react-i18next";

export default function Menu(props) {
  const { t } = useTranslation();

  const included = [
    {
      label: t("menu_section_starters"),
      name: "entrantes",
      checked: false,
      key: randomId(),
    },
    {
      label: t("menu_section_firsts"),
      name: "primeros",
      checked: true,
      key: randomId(),
    },
    {
      label: t("menu_section_seconds"),
      name: "segundos",
      checked: true,
      key: randomId(),
    },
    {
      label: t("menu_section_desserts"),
      name: "postres",
      checked: false,
      key: randomId(),
    },
  ];

  const [shownElements, handlers] = useListState(included);
  const [data, setData] = useState(null); //{}
  const [title, setTitle] = useState(t("generic_daily_menu"));

  const form = useForm({
    initialValues: {
      entrantes: [],
      primeros: [],
      segundos: [],
      postres: [],
    },
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
    <Paper style={{ maxWidth: "50rem" }} shadow="xs" p={10} h={"100%"}>
      <Stack style={{ display: !data ? "flex" : "none" }}>
        <Stack gap={"xs"}>
          <Title order={4}>{t("generic_page_title_title")}</Title>
          <CustomTextInput
            value={title}
            description={t("generic_page_title_placeholder")}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </Stack>
        <Title order={4}>{t("generic_shown_elements_title")}</Title>
        <Group>{customMenuParts}</Group>
        <Divider style={{ marginTop: ".8rem", marginBottom: "1rem" }} />
        <form
          onSubmit={form.onSubmit((values) => {
            const result = {};
            let idx = 0;
            for (const [key, value] of Object.entries(values)) {
              if (shownElements[idx].checked && value.length > 0) {
                result[key] = value;
              }
              idx++;
            }

            setData(result);
          })}
        >
          {shownElements.map((element) => (
            <Collapse in={element.checked}>
              <Stack>
                <FormList
                  form={form}
                  label={element.label}
                  name={element.name}
                />
              </Stack>
              <Divider
                variant="dashed"
                style={{ marginTop: ".8rem", marginBottom: "1rem" }}
              />
            </Collapse>
          ))}
          <Button fullWidth type="submit">
            {t("generic_continue")}
          </Button>
        </form>
      </Stack>
      {data && (
        <PdfDownloader setData={setData} type="menu">
          <MenuTemplate data={data} title={title} />
        </PdfDownloader>
      )}
    </Paper>
  );
}
