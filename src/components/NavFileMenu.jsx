import { ActionIcon, Popover, Stack, rem, Button } from "@mantine/core";
import { IconCopy, IconDots, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import ConfirmationPopover from "./ConfirmationPopover";
import { useTranslation } from "react-i18next";

export default function NavFileMenu({
  duplicateFile,
  removeFile,
  fileId,
  ...props
}) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const handleDuplicate = () => {
    duplicateFile(fileId);
    setOpen(false);
  };

  const handleRemove = () => {
    removeFile(fileId);
    setOpen(false);
  };

  return (
    <Popover opened={open} onChange={setOpen} position="bottom" withArrow>
      <Popover.Target
        onClick={() => {
          setOpen(!open);
        }}
      >
        <ActionIcon size={"lg"} variant="light">
          <IconDots />
        </ActionIcon>
      </Popover.Target>
      <Popover.Dropdown p={0} pt={5}>
        <Stack gap={0}>
          <Button
            onClick={handleDuplicate}
            radius={0}
            variant="subtle"
            color="black"
            fw={500}
            justify="start"
            leftSection={
              <IconCopy style={{ width: rem(14), height: rem(14) }} />
            }
          >
            {t("generic_duplicate")}
          </Button>
          <ConfirmationPopover position="left" onOk={handleRemove}>
            <Button
              radius={0}
              variant="subtle"
              color="red"
              fw={500}
              justify="start"
              leftSection={
                <IconTrash style={{ width: rem(15), height: rem(15) }} />
              }
            >
              {t("generic_delete")}
            </Button>
          </ConfirmationPopover>
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
}
