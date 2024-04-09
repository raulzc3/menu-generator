import { Button, Title, Group, Divider } from "@mantine/core";
import { randomId, useDisclosure } from "@mantine/hooks";

import { useEffect, useState } from "react";

import AllergenModal from "./Allergens/AllergenModal";
import useScroll from "../hooks/useScroll";

import FormElement from "./FormElement";

export default function FormList({
  label,
  titleOrder,
  name,
  form,
  withPrices,
}) {
  const [modalDish, setModalDish] = useState({});
  const [modalOpened, { open: openModal, close: closeModal }] =
    useDisclosure(false);

  //Scroll to new input
  const [executeScroll, scrollRef] = useScroll();
  useEffect(executeScroll);

  const handleModalOpen = (dish) => {
    setModalDish(dish);
    openModal();
  };

  const handleCloseModal = () => {
    closeModal();
    setTimeout(() => {
      setModalDish({});
    }, 150);
  };

  const fields = form.values[name].map((item, index, arr) => {
    //Assign ref to the newest input
    let ref = null;
    const isLast = index === arr.length - 1;
    if (item.useRef) {
      delete item.useRef;
      ref = scrollRef;
    }

    const allergens = form.values[name][index]?.alergenos;

    return (
      <div ref={ref} key={"formItem" + item.key}>
        <FormElement
          form={form}
          name={name}
          item={item}
          index={index}
          withPrices={withPrices}
          allergens={allergens}
          handleModalOpen={handleModalOpen}
          isLast={isLast}
        />
      </div>
    );
  });

  return (
    <>
      <Group>
        <Title order={titleOrder || 4}>{label}</Title>
        <Button
          size="xs"
          onClick={() => {
            form.insertListItem(name, {
              nombre: "",
              precio: "",
              key: randomId(),

              useRef: true,
            });
          }}
        >
          + Añadir
        </Button>
      </Group>
      {fields}
      <AllergenModal
        opened={modalOpened}
        onClose={handleCloseModal}
        modalDish={modalDish}
        form={form}
        name={name}
      />
    </>
  );
}
