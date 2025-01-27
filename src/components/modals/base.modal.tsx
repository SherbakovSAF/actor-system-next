import CloseIcon from "@/assets/icons/close.svg?url";
import CardBlock from "@/components/blocks/card.block";
import ButtonUI from "@/components/ui/button.ui";
import { cn } from "@/lib/utils.lib";
import Image from "next/image";
import { HtmlHTMLAttributes } from "react";

interface BaseModalProps extends HtmlHTMLAttributes<HTMLDivElement> {
  onClose: () => void;
  isVisible: boolean;
  title?: string;
}

const BaseModal: React.FC<React.PropsWithChildren<BaseModalProps>> = ({
  onClose,
  className,
  isVisible,
  title,
  children,
}) => {
  const handleCloseModalOutside = (event: React.MouseEvent) => {
    event.preventDefault();
    if (event.target === event.currentTarget) {
      event.preventDefault();
      onClose();
    }
  };

  if (!isVisible) return null;
  return (
    <div
      className="z-10 fixed bg-[#0000007c] backdrop-blur-sm w-full  h-full top-0 left-0"
      onClick={(event) => handleCloseModalOutside(event)}
    >
      <CardBlock
        className={cn(
          "w-[90%] max-w-[500px] h-fit  md:max-h-[75svh] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-surface-secondary",
          className
        )}
        title={title}
        rightTitleSlot={
          <ButtonUI className="p-1 ml-auto block" onClick={() => onClose()}>
            <Image src={CloseIcon} alt="" className="w-2 h-2" />
          </ButtonUI>
        }
      >
        {children}
      </CardBlock>
    </div>
  );
};

export default BaseModal;
