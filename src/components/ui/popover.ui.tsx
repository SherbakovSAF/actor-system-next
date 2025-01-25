import { CalcPositionPopover } from "@/lib/calc-position-popover.lib";
import { cn } from "@/lib/utils.lib";
import { PosDetail_T } from "@/types/general.types";
import {
  HTMLAttributes,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import ReactDOM from "react-dom";
import { useClickAway } from "react-use";

interface PopoverUIProps
  extends React.PropsWithChildren<HTMLAttributes<HTMLDivElement>> {
  overlay: React.ReactNode;
  isShow?: boolean;
  position?: PosDetail_T;
  className?: string;
  margin?: number;
  onShow?: () => void;
  onHide?: () => void;
}

const PopoverUI: React.FC<PopoverUIProps> = ({
  children,
  overlay: content,
  isShow = false,
  className,
  position,
  margin = 4,
  onHide,
  onShow,
  ...props
}) => {
  const [isVisible, setVisible] = useState(isShow);
  const triggerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const [triggerRect, setTriggerRect] = useState<DOMRect | null>(null);
  const [, setOverlayRect] = useState<DOMRect | null>(null);

  const [contentCoords, setContentCoords] = useState({ top: -100, left: -100 });

  useEffect(() => setVisible(isShow), [isShow]);
  useEffect(() => {
    const handleResize = () => setVisible(false);
    window.addEventListener("resize", () => handleResize);
    return () => window.removeEventListener("resize", () => handleResize);
  }, []);

  const showPopover = useCallback(() => {
    setVisible(true);
    onShow?.();
  }, [onShow]);

  const hidePopover = useCallback(() => {
    setVisible(false);
    onHide?.();
  }, [onHide]);

  useClickAway(overlayRef, (event) => {
    const target = event.target as Node;
    if (
      target !== triggerRef.current &&
      !triggerRef.current?.contains(target)
    ) {
      isVisible && hidePopover();
    }
  });

  useLayoutEffect(() => {
    if (!isVisible || !triggerRef.current || !overlayRef.current) return;

    const trigger = triggerRef.current.getBoundingClientRect();
    const overlay = overlayRef.current.getBoundingClientRect();

    setTriggerRect(trigger);
    setOverlayRect(overlay);

    const { top, left } = new CalcPositionPopover(
      trigger,
      overlay,
      margin,
      position
    ).getCoordsByPosition;

    setContentCoords({ top, left });
  }, [isVisible, position, margin]);

  return (
    <div
      className={cn("flex *:flex-1", className)}
      onClick={showPopover}
      ref={triggerRef}
      {...props}
    >
      {children}

      {isVisible &&
        ReactDOM.createPortal(
          <div
            style={{
              left: contentCoords.left + "px",
              top: contentCoords.top + "px",
              minWidth: triggerRect?.width ?? "auto",
            }}
            ref={overlayRef}
            className={cn("absolute p-0  z-40")}
          >
            {content}
          </div>,
          document.body
        )}
    </div>
  );
};

export default PopoverUI;
