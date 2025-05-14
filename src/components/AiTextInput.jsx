import { notifications } from "@mantine/notifications";
import useAI from "../hooks/useAI";
import { ActionIcon, Flex, Text } from "@mantine/core";
import CustomTextInput from "./CustomTextInput";
import { IconAi } from "@tabler/icons-react";

export default function AiTextInput({ label, value, onChange, ...props }) {
  const { translate, loading } = useAI();

  const translateText = async () => {
    const langs = ["galician", "spanish", "english"];
    const { data: translations, error } = await translate(langs, value);

    if (error) {
      return notifications.show({
        title: "Error en la traducción",
        message: error,
        color: "red",
      });
    }

    const parsedTranslations = langs
      .map((lang) => translations[lang])
      .join("\n");

    onChange(parsedTranslations);
  };

  return (
    <div>
      <Text size="sm" mb={2}>
        {label}
      </Text>
      <Flex gap={"md"}>
        <CustomTextInput
          flex={1}
          // label={"Traductor IA"}
          onSubmit={(e) => {
            e.preventDefault();
          }}
          value={value}
          onChange={onChange}
          disabled={loading}
          {...props}
        />
        <ActionIcon
          size={"lg"}
          variant="light"
          color="blue"
          loading={loading}
          onClick={translateText}
        >
          <IconAi />
        </ActionIcon>
      </Flex>
    </div>
  );
}
