import { cn } from "@/lib/utils.lib";
import { HtmlHTMLAttributes, ForwardedRef } from "react";
import Image from "next/image";
import FolderPic from "@/assets/img/folder.png";

interface CardBlock
  extends React.PropsWithChildren<HtmlHTMLAttributes<HTMLDivElement>> {
  attributeContent?: HtmlHTMLAttributes<HTMLDivElement>;
  title?: string;
  rightTitleSlot?: React.ReactNode;
  isShowDelete?: boolean;
  onDelete?: () => void;
  ref?: ForwardedRef<HTMLDivElement>;
}
const CardBlock: React.FC<CardBlock> = ({
  children,
  title,
  attributeContent,
  className,
  rightTitleSlot,
  isShowDelete = false,
  onDelete,
  ...props
}) => {
  return (
    <div
      className={cn("card-border-secondary bg-surface p-2", className)}
      {...props}
    >
      {(!!title || !!rightTitleSlot) && (
        <header className="bg-accent text-text-secondary text-sm px-1 flex justify-between gap-4 items-center">
          {!!title && (
            <div className="flex gap-1 items-center">
              <Image src={FolderPic} alt="" />
              <span>{title}</span>
            </div>
          )}
          <div className="ml-auto">
            {rightTitleSlot ??
              (isShowDelete && (
                <CardBlock
                  className="p-0 px-1 h-fit bg-surface-secondary cursor-pointer"
                  onClick={() => onDelete && onDelete()}
                >
                  <span className="text-xs">Delete</span>
                </CardBlock>
              ))}
          </div>
        </header>
      )}
      <main {...attributeContent}>{children}</main>
    </div>
  );
};

export default CardBlock;
