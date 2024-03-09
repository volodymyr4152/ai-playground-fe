import {Content as PopoverContent, Root as PopoverRoot, Trigger as PopoverTrigger} from "@radix-ui/react-popover";
import React from "react";
import useHoverClickPopover from "../hooks/useHoverClickPopover";


interface IModPopoverProps {
  triggerChild: React.ReactNode
  triggerClassName?: string
  triggerHoverClassName?: string
  contentChild: React.ReactNode
  contentClassName?: string
}

export const ModPopover: React.FC<IModPopoverProps> = (props) => {
  const triggerClassName = props.triggerClassName ?? "hover:bg-white p-1 rounded";
  const triggerHoverClassName = props.triggerHoverClassName ?? "hover:bg-white p-1 rounded bg-gray-300";
  const contentClassName = props.contentClassName ?? "flex flex-col h-full gap-1 p-1 bg-white rounded border-gray-400 border";
  const {isOpen, mouseEnter, mouseLeave, mouseClick} = useHoverClickPopover();

  return <PopoverRoot open={isOpen}>
    <PopoverTrigger>
      <div
        className={(isOpen ? triggerHoverClassName : triggerClassName)}
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseLeave}
        onClick={mouseClick}
      >
        {props.triggerChild}
      </div>
    </PopoverTrigger>
    <PopoverContent>
      <div
        className={contentClassName}
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseLeave}
      >
        {props.contentChild}
      </div>
    </PopoverContent>
  </PopoverRoot>
}
