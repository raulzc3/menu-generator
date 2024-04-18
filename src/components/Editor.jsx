import { Button, Paper, Stack, Title } from "@mantine/core";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import PdfDownloader from "../components/PdfDownloader";
import MenuTemplate from "../components/MenuTemplate";
import FindeTemplate from "../components/FindeTemplate";
import CustomTextInput from "../components/CustomTextInput.jsx";

export default function Editor({
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

  const handleSubmit = (values) => {
    if (parseData) {
      const parsedValues = parseData(values);
      setData(parsedValues);
    } else {
      setData(values);
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
          <Button fullWidth type="submit">
            {t("generic_continue")}
          </Button>
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
