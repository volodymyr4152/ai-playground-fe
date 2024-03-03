import {useEffect, useState} from "react";

const useHoverClickPopover = () => {
  const [isMouseHoverDisabled, setIsMouseHoverDisabled] = useState(false);
  // const [isOpenTarget, setIsOpenTarget] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // useEffect(() => {
  //   if (isOpen !== isOpenTarget) {
  //     const timeout = setTimeout(() => setIsOpen(isOpenTarget), 200);
  //     return () => clearTimeout(timeout);
  //   }
  // }, [isOpenTarget, isOpen]);

  const mouseEnter = () => {
    if (!isMouseHoverDisabled) {
      setIsOpen(true);
      // setIsOpenTarget(true);
    }
  }

  const mouseLeave = () => {
    if (!isMouseHoverDisabled) {
      setIsOpen(false);
      // setIsOpenTarget(false);
    }
  }

  const mouseClick = () => {
    setIsOpen(!isMouseHoverDisabled);
    // setIsOpenTarget(!isMouseHoverDisabled);
    setIsMouseHoverDisabled(!isMouseHoverDisabled);
  }

  return {isOpen, setIsOpen, mouseEnter, mouseLeave, mouseClick};
}

export default useHoverClickPopover;
