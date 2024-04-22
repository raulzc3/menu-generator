import { useEffect, useState } from "react";
import { deleteFile, getAllFiles } from "../utils/fileManager";
import {
  ActionIcon,
  Button,
  Divider,
  Flex,
  ScrollArea,
  Stack,
} from "@mantine/core";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import ConfirmationPopover from "./ConfirmationPopover";
import { IconTrash } from "@tabler/icons-react";

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
                <ConfirmationPopover
                  onOk={() => {
                    handleFileDeletion(file.id);
                  }}
                >
                  <ActionIcon size={"lg"} variant="light" color="red">
                    <IconTrash
                      style={{ width: "80%", height: "70%" }}
                      stroke={1.5}
                    />
                  </ActionIcon>
                </ConfirmationPopover>
              </Flex>
            ))}
          </Stack>
        </ScrollArea>
      </Stack>
    )
  );
}
