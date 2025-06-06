import { Group, Text, TextInput, Textarea, Transition } from "@mantine/core";
import { useState } from "react";

const CharCount = ({ max = 0, value = "", visible }) => {
  return (
    <Transition
      mounted={visible}
      transition="fade"
      duration={200}
      timingFunction="ease"
    >
      {(styles) => {
        return (
          <Text
            pr={5}
            style={styles}
            c="dimmed"
            size="xs"
          >{`${value.length}/${max}`}</Text>
        );
      }}
    </Transition>
  );
};

export default function CustomTextInput({
  value,
  description,
  onChange,
  allowSubmit,
  allowLineBreak,
  showLengthCount,
  maxLength,
  size = "sm",
  ...props
}) {
  const [showLimit, setShowLimit] = useState(false);

  return (
    <Textarea
      minRows={allowLineBreak ? 3 : 1}
      maxRows={6}
      autosize
      size={size}
      value={value}
      description={description}
      onFocus={() => {
        if (showLengthCount) {
          setShowLimit(true);
        }
      }}
      onBlur={() => {
        if (showLengthCount) {
          setShowLimit(false);
        }
      }}
      onChange={(e) => {
        if (
          !maxLength ||
          e?.target?.value?.length <= maxLength ||
          e?.target?.value?.length < value?.length //Prevent breaking changes with larger names
        ) {
          onChange(e);
        }
      }}
      {...props}
      rightSection={
        showLengthCount && (
          <CharCount max={maxLength} value={value} visible={showLimit} />
        )
      }
      onKeyDown={(e) => {
        //Prevent submit on enter

        if (e.key === "Enter") {
          if (!allowSubmit && !allowLineBreak) {
            e.target.blur();
            e.preventDefault();
          }
        }
      }}
    />
  );
}
