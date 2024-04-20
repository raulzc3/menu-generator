import { useEffect, useState } from "react";
import { getAllFiles } from "../utils/fileManager";
import { Button, Divider, Stack } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

export default function NavFiles({ toggle }) {
  const [files, setFiles] = useState([]);
  const { t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    //Todo: files context(?)
    const allFiles = getAllFiles();
    if (JSON.stringify(allFiles) !== JSON.stringify(files)) {
      setFiles(allFiles);
    }
  }, [location]);

  return (
    files.length > 0 && (
      <Stack>
        <Divider mt={"lg"} />
        {t("nav_title_2")}
        {files.map((file, index) => (
          <Button
            variant="light"
            component={Link}
            onClick={toggle}
            to={`/${file.type}/${file.id}`}
            key={"edit_navlink_" + index}
          >
            {file.name}
          </Button>
        ))}
      </Stack>
    )
  );
}
