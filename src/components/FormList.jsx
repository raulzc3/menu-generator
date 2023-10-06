import { Button, TextInput, Title, Group, Grid } from "@mantine/core";
import { randomId } from "@mantine/hooks";
import { useState, useEffect } from "react";

export default function FormList({ label, titleOrder, name, form }) {
  const [inputs, setInputs] = useState([]);
  const [counter, setCounter] = useState(0);

  const addInput = () => {
    const inputKey = randomId();

    setCounter(counter + 1);
    setInputs([
      ...inputs,
      <TextInput
        placeholder="Plato"
        key={inputKey}
        {...form.getInputProps(`${name}_plato${counter}`)}
      />,
    ]);
  };

  const deleteInput = (index) => {
    const updatedInputs = inputs.filter((_, i) => i !== index);
    setInputs(updatedInputs);
  };

  useEffect(() => {
    if (counter === 0) {
      addInput();
    }
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
          <Grid key={`input_${name}:${index}`}>
            <Grid.Col span={"auto"}> {input}</Grid.Col>
            {(inputs.length > 1 || index !== 0) && (
              <Grid.Col span="content">
                <Button
                  size="xs"
                  color="red"
                  onClick={() => {
                    deleteInput(index);
                  }}
                >
                  - Quitar
                </Button>
              </Grid.Col>
            )}
          </Grid>
        );
      })}
    </>
  );
}
