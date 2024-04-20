import {
  ActionIcon,
  Button,
  Group,
  Indicator,
  Paper,
  Stack,
  Title,
} from "@mantine/core";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import PdfDownloader from "../components/PdfDownloader";
import MenuTemplate from "../components/MenuTemplate";
import FindeTemplate from "../components/FindeTemplate";
import CustomTextInput from "../components/CustomTextInput.jsx";
import { storeFile } from "../utils/fileManager.js";
import { IconDeviceFloppy } from "@tabler/icons-react";

export default function Editor({
  fileId,
  titlePlaceholder,
  form,
  parseData,
  children,
  type,
  ...props
}) {
  const { t } = useTranslation();
  const [data, setData] = useState(null); //{}
  const [title, setTitle] = useState(titlePlaceholder);
  const [id, setId] = useState(fileId);

  const handleSubmit = (values) => {
    if (parseData) {
      const parsedValues = parseData(values);
      setData(parsedValues);
    } else {
      setData(values);
    }
  };

  const saveDocument = async () => {
    const formValues = form.getValues();
    const newId = storeFile({
      id: id,
      type: type,
      name: "Test",
      title: title,
      data: formValues,
    });
    form.resetDirty();

    if (!id) {
      setId(newId);
    }
  };

  return (
    <Paper style={{ maxWidth: "50rem" }} shadow="xs" p={10} h={"100%"}>
      <Stack style={{ display: !data ? "flex" : "none" }}>
        <Stack gap={"xs"}>
          <Group justify="space-between">
            <Title order={4}>{t("generic_page_title_title")}</Title>
            <Indicator
              color="red"
              withBorder
              disabled={!id || (id && !form.isDirty())}
            >
              <ActionIcon variant="light" onClick={saveDocument}>
                <IconDeviceFloppy />
              </ActionIcon>
            </Indicator>
          </Group>
          <CustomTextInput
            value={title}
            description={t("generic_page_title_placeholder")}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </Stack>

        <form onSubmit={form.onSubmit(handleSubmit)}>
          {children}

          <Button type="submit" fullWidth>
            {t("generic_continue")}
          </Button>
        </form>
      </Stack>

      {data && (
        <PdfDownloader setData={setData} type={type}>
          {type === "finde" && <FindeTemplate data={data} title={title} />}
          {type === "menu" && <MenuTemplate data={data} title={title} />}
        </PdfDownloader>
      )}
    </Paper>
  );
}
