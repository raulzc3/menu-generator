import { Button, TextInput, Title, Group } from "@mantine/core";
import { randomId } from "@mantine/hooks";
import { useState, useEffect } from "react";

export default function FormList({ label, titleOrder, name, form }) {
  const [inputs, setInputs] = useState([]);
  const [counter, setCounter] = useState(0);

  const addInput = () => {
    const inputKey = randomId();

    console.log(`${name}_plato${counter}`);
    setCounter(counter + 1);
    setInputs([
      ...inputs,
      <TextInput
        placeholder="Plato"
        key={inputKey}
        value=""
        {...form.getInputProps(`${name}_plato${counter}`)}
      />,
    ]);
  };

  const deleteInput = (index) => {
    setCounter(counter + 1);
    const updatedInputs = inputs.filter((_, i) => i !== index);
    setInputs(updatedInputs);
  };

  useEffect(() => {
    addInput();
  }, []);

  return (
    <>
      <Group>
        <Title order={titleOrder || 4}>{label}</Title>
        <Button
          size="xs"
          onClick={() => {
            addInput();
          }}
        >
          + Añadir
        </Button>
      </Group>
      {inputs.map((input, index) => {
        return (
          <Group key={`input_${name}:${index}`}>
            {input}
            {(inputs.length > 1 || index !== 0) && (
              <Button
                size="xs"
                color="red"
                onClick={() => {
                  deleteInput(index);
                }}
              >
                Quitar
              </Button>
            )}
          </Group>
        );
      })}
    </>
  );
}
