import { Button, Group, Popover, Stack, Text } from "@mantine/core";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function ConfirmationPopover({
  children,
  label,
  onOk,
  onCancel,
}) {
  const [open, setOpen] = useState();
  const { t } = useTranslation();

  const handleOk = () => {
    if (onOk) onOk();
    setOpen(false);
  };
  const handleCancel = () => {
    if (onCancel) onCancel();
    setOpen(false);
  };
  return (
    <Popover opened={open} onChange={setOpen} position="bottom" withArrow>
      <Popover.Target
        onClick={() => {
          setOpen(!open);
        }}
      >
        {children}
      </Popover.Target>
      <Popover.Dropdown>
        <Stack justify="center">
          <Text ta="center">{label || t("generic_sure")}</Text>
          <Group>
            <Button size="xs" onClick={handleCancel}>
              {t("generic_no")}
            </Button>
            <Button size="xs" color="red" onClick={handleOk}>
              {t("generic_yes")}
            </Button>
          </Group>
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
}
