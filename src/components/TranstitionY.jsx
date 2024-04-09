import { Button, Group, Text, Collapse, Box } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect } from "react";

export default function TransitionY({ remove }) {
  const [opened, { toggle }] = useDisclosure(false);
  useEffect(() => {
    setTimeout(toggle, 1);
  }, []);

  return (
    <Box maw={400} mx="auto">
      <Group justify="center" mb={5}></Group>

      <Collapse in={opened}>
        <Text>asdfasdf</Text>
      </Collapse>
    </Box>
  );
}
