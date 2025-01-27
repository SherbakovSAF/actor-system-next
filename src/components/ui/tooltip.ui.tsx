import { useState } from "react";
import PopoverUI from "@/components/ui/popover.ui";

interface TooltipUiProps extends React.PropsWithChildren {
  text: string;
}
const TooltipUI: React.FC<TooltipUiProps> = ({ children, text }) => {
  const [isShow, setIsShow] = useState(false);

  return (
    <>
      <PopoverUI
        isShow={isShow}
        overlay={<span className="text-sm p-0 bg-yellow-100">{text}</span>}
        onMouseEnter={() => setIsShow(true)}
        onMouseLeave={() => setIsShow(false)}
      >
        {children}
      </PopoverUI>
    </>
  );
};

export default TooltipUI;
