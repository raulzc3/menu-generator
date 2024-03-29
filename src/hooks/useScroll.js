import { useRef } from "react";

export default function useScroll() {
  const scrollRef = useRef(null);
  const executeScroll = () => {
    if (scrollRef?.current)
      scrollRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
  };

  return [executeScroll, scrollRef];
}
