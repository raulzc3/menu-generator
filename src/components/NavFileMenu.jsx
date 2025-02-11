import {
  ActionIcon,
  Popover,
  Stack,
  rem,
  Button,
  Group,
  Transition,
  Text,
} from "@mantine/core";
import {
  IconArrowNarrowLeft,
  IconCopy,
  IconDots,
  IconFileExport,
  IconTrash,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";

export default function NavFileMenu({
  duplicateFile,
  removeFile,
  exportFile,
  fileId,
  ...props
}) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const [loadingExport, setLoadingExport] = useState(false);
  const [shownElements, setShownElements] = useState({
    button: true,
    choice: false,
  });

  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setShownElements({
          button: true,
          choice: false,
        });
      }, 100);
    }
  }, [open]);

  const handleExport = () => {
    setLoadingExport(!loadingExport);
    exportFile(fileId);
    setTimeout(() => {
      setLoadingExport((prev) => false);
    }, 1000);
  };

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
        <div style={{ overflow: "hidden" }}>
          <Transition
            mounted={shownElements.button}
            transition="slide-right"
            duration={75}
            timingFunction="ease"
            keepMounted
            onExited={() => {
              setShownElements({ ...shownElements, choice: true });
            }}
          >
            {(styles) => (
              <Stack gap={0} style={styles}>
                <Button
                  onClick={handleDuplicate}
                  radius={0}
                  variant="transparent"
                  fw={500}
                  justify="start"
                  leftSection={
                    <IconCopy style={{ width: rem(19), height: rem(19) }} />
                  }
                >
                  {t("generic_duplicate")}
                </Button>
                {/* <Button
                  onClick={handleExport}
                  loading={loadingExport}
                  loaderProps={{ type: "dots" }}
                  radius={0}
                  variant="subtle"
                  color="black"
                  fw={500}
                  justify="start"
                  leftSection={
                    <IconFileExport
                      style={{ width: rem(20), height: rem(20) }}
                    />
                  }
                >
                  {t("generic_export")}
                </Button> */}

                <Button
                  radius={0}
                  variant="subtle"
                  color="red"
                  fw={500}
                  justify="start"
                  onClick={() => {
                    setShownElements({ ...shownElements, button: false });
                  }}
                  leftSection={
                    <IconTrash style={{ width: rem(20), height: rem(20) }} />
                  }
                >
                  {t("generic_delete")}
                </Button>
              </Stack>
            )}
          </Transition>
          <Transition
            mounted={shownElements.choice}
            transition="slide-left"
            duration={75}
            timingFunction="ease"
            keepMounted
            onExited={() => {
              setShownElements({ ...shownElements, button: true });
            }}
          >
            {(styles) => {
              return (
                <Stack gap={0} style={styles}>
                  <Text ta={"center"} size="sm" mt={5} h={30}>
                    {t("generic_sure")}
                  </Text>
                  <Group gap={0} grow justify="center">
                    <Button
                      radius={0}
                      variant="subtle"
                      color="blue"
                      fw={500}
                      onClick={() => {
                        setShownElements({ ...shownElements, choice: false });
                      }}
                    >
                      <IconArrowNarrowLeft />
                    </Button>
                    <Button
                      fw={500}
                      radius={0}
                      color="red"
                      onClick={handleRemove}
                    >
                      <IconTrash style={{ width: rem(15), height: rem(15) }} />
                    </Button>
                  </Group>
                </Stack>
              );
            }}
          </Transition>
        </div>
      </Popover.Dropdown>
    </Popover>
  );
}
