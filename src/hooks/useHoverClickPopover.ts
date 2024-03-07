import {useCallback, useEffect, useMemo, useState} from "react";

const useHoverClickPopover = () => {
  const [isMouseHoverDisabled, setIsMouseHoverDisabled] = useState(false);
  const [isOpenTarget, setIsOpenTarget] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen !== isOpenTarget) {
      const timeout = setTimeout(() => setIsOpen(isOpenTarget), 200);
      return () => clearTimeout(timeout);
    }
  }, [isOpenTarget, isOpen]);

  const mouseEnter = useCallback(() => {
    if (!isMouseHoverDisabled) {
      setIsOpenTarget(true);
    }
  }, [isMouseHoverDisabled]);

  const mouseLeave = useCallback(() => {
    if (!isMouseHoverDisabled) {
      setIsOpenTarget(false);
    }
  }, [isMouseHoverDisabled]);

  const mouseClick = useCallback(() => {
    setIsOpen(!isMouseHoverDisabled);
    setIsOpenTarget(!isMouseHoverDisabled);
    setIsMouseHoverDisabled(!isMouseHoverDisabled);
  }, [isMouseHoverDisabled]);

  return useMemo(
    () => ({isOpen, setIsOpen, mouseEnter, mouseLeave, mouseClick}),
    [isOpen, setIsOpen, mouseEnter, mouseLeave, mouseClick]
  );
}

export default useHoverClickPopover;
