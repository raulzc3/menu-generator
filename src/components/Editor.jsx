import { Button, Group, Modal, Paper, Stack, Title } from "@mantine/core";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import PdfDownloader from "../components/PdfDownloader";
import MenuTemplate from "../components/MenuTemplate";
import FindeTemplate from "../components/FindeTemplate";
import CustomTextInput from "../components/CustomTextInput.jsx";
import { getAllFiles, storeFile } from "../utils/fileManager.js";

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
  console.log(getAllFiles());
  console.log(id);
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
    console.log("New id" + newId);
    if (!id) {
      setId(newId);
    }
  };

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

        <form onSubmit={form.onSubmit(handleSubmit)}>
          {children}
          <Group grow>
            <Button type="button" onClick={saveDocument}>
              {t("generic_save")}
            </Button>
            <Button type="submit">{t("generic_continue")}</Button>
          </Group>
        </form>
      </Stack>

      {data && (
        <PdfDownloader setData={setData} type={type}>
          {type === "fin_de_semana" && (
            <FindeTemplate data={data} title={title} />
          )}
          {type === "menu" && <MenuTemplate data={data} title={title} />}
        </PdfDownloader>
      )}
    </Paper>
  );
}
