import {
  ActionIcon,
  Box,
  Button,
  Grid,
  Indicator,
  Stack,
  Title,
} from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PdfDownloader from "../components/PdfDownloader";
import MenuTemplate from "../components/MenuTemplate";
import FindeTemplate from "../components/FindeTemplate";
import CustomTextInput from "../components/CustomTextInput.jsx";
import { findFile, storeFile } from "../utils/fileManager.js";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { useLocation } from "react-router-dom";
import WineTemplate from "./WineTemplate.jsx";
import ScrollButton from "./ScrollButton.jsx";

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
  const [errors, setErrors] = useState({
    title: false,
    name: false,
  });

  const { ref, width: viewWidth, height: viewHeight } = useElementSize();

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

  const validateData = () => {
    setErrors({
      name: !fileName,
      title: !title,
    });

    return !!fileName && !!title;
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
    <Box ref={ref}>
      <Stack style={{ display: !data ? "flex" : "none" }} maw={600}>
        <Grid gutter={6} align="end">
          <Grid.Col span={"auto"}>
            <CustomTextInput
              showLengthCount
              maxLength={35}
              label={t("editor_page_name_title")}
              withAsterisk={true}
              error={errors.name}
              required={true}
              value={fileName}
              placeholder={t("editor_page_name_placeholder")}
              description={t("editor_page_name_description")}
              onChange={(e) => {
                if (e.target.value && errors.name) {
                  setErrors({ ...errors, name: false });
                }
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
              <ActionIcon
                variant="light"
                size={"lg"}
                onClick={() => {
                  const dataIsValid = validateData();
                  if (dataIsValid) {
                    saveDocument();
                  }
                }}
              >
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
            showLengthCount
            maxLength={25}
            value={title}
            error={errors.title}
            description={t("generic_page_title_placeholder")}
            onChange={(e) => {
              if (e.target.value && errors.title) {
                setErrors({ ...errors, title: false });
              }
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
          {type === "vino" && <WineTemplate data={data} title={title} />}
        </PdfDownloader>
      )}
      <ScrollButton
        showScrollDown={(scroll) => {
          return scroll.y < 500 && viewHeight > 1500;
        }}
        showScrollUp={(scroll) => {
          return scroll.y > 1000;
        }}
      />
    </Box>
  );
}
