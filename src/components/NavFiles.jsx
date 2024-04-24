import { useEffect, useState } from "react";
import { deleteFile, duplicateFile, getAllFiles } from "../utils/fileManager";
import { Button, Divider, Flex, ScrollArea, Stack } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import NavFileMenu from "./NavFileMenu";

export default function NavFiles({ toggle, activeId }) {
  const [files, setFiles] = useState([]);
  const { t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    //Todo: files context(?)
    refreshFiles();
  }, [location]);

  const refreshFiles = () => {
    const allFiles = getAllFiles();
    if (JSON.stringify(allFiles) !== JSON.stringify(files)) {
      setFiles(allFiles);
    }
  };

  const handleFileDeletion = (fileId) => {
    deleteFile(fileId);
    if (activeId === fileId) window.location.replace("");

    refreshFiles();
  };

  const handleFileDuplication = (fileId) => {
    duplicateFile(fileId);
    refreshFiles();
  };

  return (
    files.length > 0 && (
      <Stack>
        <Divider mt={"lg"} />
        {t("nav_title_2")}
        <ScrollArea scrollbarSize={5} mah={52 * 10} scrollHideDelay={500}>
          <Stack>
            {files.map((file, index) => (
              <Flex flex={1} gap={6}>
                <Button
                  variant="light"
                  component={Link}
                  onClick={toggle}
                  to={`/${file.type}/${file.id}`}
                  key={"edit_navlink_" + index}
                  flex={1}
                >
                  {file.name}
                </Button>
                <NavFileMenu
                  removeFile={handleFileDeletion}
                  duplicateFile={handleFileDuplication}
                  fileId={file.id}
                />
              </Flex>
            ))}
          </Stack>
        </ScrollArea>
      </Stack>
    )
  );
}
