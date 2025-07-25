import { useEffect, useRef } from "react";

const generateUniqueId = () => {
  return Math.random().toString(36).slice(2, 15);
};

export const useFormFieldNavigation = (
  formInputsCount,
  submit,
  additionalFunction
) => {
  const formInputsRef = useRef([]);

  useEffect(() => {
    formInputsRef.current = Array.from({ length: formInputsCount }).map(
      (_, index) => ({
        id: `formInput${index}_${generateUniqueId()}`,
      })
    );
  }, [formInputsCount]);

  const handleKeyDown = (event, currentIndex) => {
    const currentElement = formInputsRef.current[currentIndex];
    if (!currentElement) {
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();

      let nextIndex = currentIndex + 1;
      let nextElement = null;

      while (nextIndex < formInputsRef.current.length && !nextElement) {
        const nextItem = formInputsRef.current[nextIndex];
        if (nextItem) {
          const el = document.querySelector(`#${nextItem.id}`);
          if (!el?.disabled) {
            nextElement = el;
          }
        }
        nextIndex++;
      }
      if (nextElement) {
        nextElement.focus();
      } else {
        submit?.();
        additionalFunction?.();
      }
    }
  };

  return {
    formInputs: formInputsRef.current,
    handleKeyDown,
  };
};
