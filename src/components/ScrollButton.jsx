import { ActionIcon, Box, Transition } from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import { IconChevronsDown, IconChevronsUp } from "@tabler/icons-react";

export default function ScrollButton({ showScrollDown, showScrollUp }) {
  const [scroll, scrollTo] = useWindowScroll();

  const toBottom = showScrollDown(scroll);
  const toTop = showScrollUp(scroll);

  return (
    <Box pos={"fixed"} bottom={100} right={0}>
      <Transition mounted={toTop} transition="slide-left" exitDuration={100}>
        {(styles) => (
          <ActionIcon
            style={styles}
            variant="light"
            onClick={() => {
              scrollTo({ y: 0 });
            }}
          >
            <IconChevronsUp
              style={{
                width: "70%",
                height: "70%",
              }}
              stroke={1.5}
            />
          </ActionIcon>
        )}
      </Transition>
      <Transition mounted={toBottom} transition="slide-left" exitDuration={100}>
        {(styles) => (
          <ActionIcon
            style={styles}
            variant="light"
            onClick={() => {
              scrollTo({ y: document.body.scrollHeight });
            }}
          >
            <IconChevronsDown
              style={{
                width: "70%",
                height: "70%",
              }}
              stroke={1.5}
            />
          </ActionIcon>
        )}
      </Transition>
    </Box>
  );
}
