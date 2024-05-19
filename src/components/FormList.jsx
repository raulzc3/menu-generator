import { Button, Title, Group } from "@mantine/core";
import { randomId, useDisclosure } from "@mantine/hooks";

import { useEffect, useState } from "react";

import DishEditionModal from "./DishEditionModal";
import useScroll from "../hooks/useScroll";

import FormElement from "./FormElement";
import { useTranslation } from "react-i18next";

export default function FormList({
  label,
  titleOrder,
  name,
  form,
  withPrices,
  type,
}) {
  const [modalDish, setModalDish] = useState({});
  const [modalOpened, { open: openModal, close: closeModal }] =
    useDisclosure(false);
  const { t } = useTranslation();

  //Create new dish input
  const newDish = () => {
    form.insertListItem(name, {
      nombre: "",
      precio: "",
      key: randomId(),
      useRef: true,
    });
  };

  //Default one dish
  /*   useEffect(() => {
    newDish();
  }, []); */

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
    let isNew = false;
    if (item.useRef) {
      isNew = true;
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
          handleEditionModalOpen={handleModalOpen}
          type={type}
          isNew={isNew}
          isLast={isLast}
        />
      </div>
    );
  });

  return (
    <>
      <Group>
        <Title order={titleOrder || 4}>{label}</Title>
        <Button size="xs" onClick={newDish}>
          + {t("generic_add")}
        </Button>
      </Group>
      {fields}
      <DishEditionModal
        opened={modalOpened}
        onClose={handleCloseModal}
        modalDish={modalDish}
        withPrices={withPrices}
        form={form}
        name={name}
        type={type}
      />
    </>
  );
}
