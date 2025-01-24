import { cn } from "@/lib/utils.lib";
import LoadingUi from "@/components/ui/loading.ui";
import { useMemo } from "react";

interface ButtonUIProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  size?: "small" | "default";
}

const ButtonUI: React.FC<React.PropsWithChildren<ButtonUIProps>> = ({
  children,
  loading,
  className,
  disabled,
  onClick,
  size = "default",
  ...props
}) => {
  const calcSize = useMemo(() => {
    switch (size) {
      case "small":
        return "p-0  text-xs px-1";
      default:
        return "px-2";
    }
  }, [size]);
  return (
    <button
      className={cn(
        "card-border-secondary bg-surface-secondary w-fit relative inline-block xl:hover:outline-action h-fit ",
        calcSize,
        className,
        { "text-text-disabled pointer-events-none": disabled }
      )}
      onClick={(event) => !loading && !disabled && onClick && onClick(event)}
      {...props}
    >
      {children}

      {loading && (
        <span className="w-full h-full absolute top-0 left-0  card-border-secondary  bg-surface-secondary">
          <LoadingUi className="-translate-y-2/3 top-1/2 relative " />
        </span>
      )}
    </button>
  );
};

export default ButtonUI;
