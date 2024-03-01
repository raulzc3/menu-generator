import { TextInput } from "@mantine/core";

export default function CustomTextInput({
  value,
  description,
  onChange,
  allowSubmit,
  ...props
}) {
  return (
    <TextInput
      value={value}
      description={description}
      onChange={onChange}
      {...props}
      onKeyDown={(e) => {
        //Prevent submit on enter
        if (!allowSubmit && e.key === "Enter") {
          e.target.blur();
          e.preventDefault();
        }
      }}
    />
  );
}
