import { Divider, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useTranslation } from "react-i18next";
import FormList from "../components/FormList.jsx";
import Editor from "../components/Editor.jsx";

export default function Finde({ reloadNav, ...props }) {
  const { t } = useTranslation();

  const initialValues = {
    platos: [],
  };

  const form = useForm({
    initialValues: initialValues,
  });

  return (
    <Editor
      titlePlaceholder={t("generic_weekend")}
      form={form}
      type="finde"
      initialValues={initialValues}
      reloadNav={reloadNav}
    >
      <Divider style={{ marginTop: ".8rem", marginBottom: "1rem" }} />
      <Stack>
        <FormList
          withPrices
          withDescription
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
