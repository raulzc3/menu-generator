import { Button, Divider, Paper, Stack, Title } from "@mantine/core";

import { useState } from "react";
import { useForm } from "@mantine/form";
import FormList from "../components/FormList.jsx";
import PdfDownloader from "../components/PdfDownloader";
import FindeTemplate from "../components/FindeTemplate";
import CustomTextInput from "../components/CustomTextInput.jsx";
import { useTranslation } from "react-i18next";

export default function Finde(props) {
  const [data, setData] = useState(null); //{}

  const { t } = useTranslation();

  const form = useForm({
    initialValues: {
      platos: [],
    },
  });

  const [title, setTitle] = useState(t("generic_weekend"));

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
        <form
          onSubmit={form.onSubmit((values) => {
            setData(values);
          })}
        >
          <Divider style={{ marginTop: ".8rem", marginBottom: "1rem" }} />
          <Stack>
            <FormList
              withPrices
              form={form}
              label={t("generic_dishes")}
              name="platos"
            />
            <Divider
              variant="dashed"
              style={{ marginTop: ".8rem", marginBottom: "1rem" }}
            />
          </Stack>
          <Button fullWidth type="submit">
            {t("generic_continue")}
          </Button>
        </form>
      </Stack>
      {data && (
        <PdfDownloader setData={setData} type="fin_de_semana">
          <FindeTemplate data={data} title={title} />
        </PdfDownloader>
      )}
    </Paper>
  );
}
