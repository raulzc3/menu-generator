import {
  ActionIcon,
  Button,
  Grid,
  Indicator,
  Paper,
  Stack,
  Title,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PdfDownloader from "../components/PdfDownloader";
import MenuTemplate from "../components/MenuTemplate";
import FindeTemplate from "../components/FindeTemplate";
import CustomTextInput from "../components/CustomTextInput.jsx";
import { findFile, storeFile } from "../utils/fileManager.js";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { useLocation } from "react-router-dom";

export default function Editor({
  titlePlaceholder,
  form,
  initialValues,
  parseData,
  children,
  type,
  reloadNav,
  ...props
}) {
  const location = useLocation();
  const fileId = location.pathname.split("/")[2] || window.history.state.fileId;
  const { t } = useTranslation();
  const [data, setData] = useState(null); //{}
  const [title, setTitle] = useState(titlePlaceholder);
  const [fileName, setFileName] = useState();
  const [id, setId] = useState(fileId);
  const [lastSavedData, setLastSavedData] = useState({});

  useEffect(() => {
    setId(fileId);
    const file = findFile({ id: fileId });
    if (!window.history?.state?.new && file) {
      setTitle(file.title);
      setFileName(file.name);
      setLastSavedData({ name: file.name, title: file.title });
      form.setValues(file.data);
    } else {
      setTitle(titlePlaceholder);
      setFileName("");
      setLastSavedData({});

      if (JSON.stringify(form.values !== JSON.stringify(form.initialValues))) {
        form.setValues(initialValues);
      }
    }

    form.resetDirty();
  }, [location.pathname, window.history.state.fileId]);

  const handleSubmit = (values) => {
    if (parseData) {
      const parsedValues = parseData(values);
      setData(parsedValues);
    } else {
      setData(values);
    }
  };

  const isDataDirty = () => {
    if (
      lastSavedData.name !== fileName ||
      lastSavedData.title !== title ||
      form.isDirty()
    ) {
      return true;
    }
    return false;
  };

  const saveDocument = async () => {
    const formValues = form.getValues();
    const storedFile = storeFile({
      id: id,
      type: type,
      name: fileName,
      title: title,
      data: formValues,
    });

    const { id: newId, name: storedName, title: storedTitle } = storedFile;

    setLastSavedData({ name: storedName, title: storedTitle });
    reloadNav(newId);
    form.resetDirty();
    if (!id) {
      setId(newId);
      const newPathname = window.location.pathname + "/" + newId;
      window.history.pushState(
        { ...window.history.state, fileId: newId },
        "",
        newPathname
      );
    }
  };
  return (
    <Paper style={{ maxWidth: "50rem" }} shadow="xs" p={10} h={"100%"}>
      <Stack style={{ display: !data ? "flex" : "none" }}>
        <Grid gutter={6} align="end">
          <Grid.Col span={"auto"}>
            <CustomTextInput
              required={true}
              value={fileName}
              placeholder="Ej: Menú 1" //TODO: translate
              description={"Nombre con el que se guardará el documento"} //TODO: translate
              onChange={(e) => {
                setFileName(e.target.value);
              }}
            />
          </Grid.Col>

          <Grid.Col span="content">
            <Indicator
              zIndex={10}
              color="red"
              withBorder
              disabled={!id || (id && !isDataDirty())}
            >
              <ActionIcon variant="light" size={"lg"} onClick={saveDocument}>
                <IconDeviceFloppy
                  style={{ width: "80%", height: "70%" }}
                  stroke={1.5}
                />
              </ActionIcon>
            </Indicator>
          </Grid.Col>
        </Grid>
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
