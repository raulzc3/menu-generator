import { Button, Group, Popover, Stack, Text } from "@mantine/core";
import { useState } from "react";

export default function ConfirmationPopover({
  children,
  label = "¿Seguro?",
  onOk,
  onCancel,
}) {
  const [open, setOpen] = useState();

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
          <Text>{label}</Text>
          <Group>
            <Button size="xs" onClick={handleCancel}>
              No
            </Button>
            <Button size="xs" color="red" onClick={handleOk}>
              Sí
            </Button>
          </Group>
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
}
