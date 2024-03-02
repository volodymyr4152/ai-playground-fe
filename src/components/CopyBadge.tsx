import {Badge} from "flowbite-react";
import React from "react";
import {MdContentCopy} from "react-icons/md";
import {BadgeProps} from "flowbite-react/lib/esm/components/Badge/Badge";


interface ICopyBadgeProps extends BadgeProps{
  copyContent?: string;
  copyIcon?: React.ReactNode;
}


const CopyBadge: React.FC<ICopyBadgeProps> = (props) => {
  const onCopyClick = () => {
    if (props.copyContent) {
      navigator.clipboard.writeText(props.copyContent);
    }
  }
  return (
    <Badge color={props.color ?? "gray"} className="pl-0.5">
      <div className="flex flex-row flex-nowrap items-center justify-center text-nowrap">
        <div
          className="h-full hover:bg-blue-200 p-0.5 mr-1 rounded"
          onClick={onCopyClick}
        >
          {props.copyIcon ?? <MdContentCopy/>}
        </div>
        <div>{props.children}</div>
      </div>
    </Badge>
  );

}

export default CopyBadge;
