import { Divider, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useTranslation } from "react-i18next";
import FormList from "../components/FormList.jsx";
import Editor from "../components/Editor.jsx";

export default function Finde(props) {
  const { t } = useTranslation();

  const form = useForm({
    initialValues: {
      platos: [],
    },
  });

  return (
    <Editor
      titlePlaceholder={t("generic_weekend")}
      form={form}
      type="fin_de_semana"
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
    </Editor>
  );
}
