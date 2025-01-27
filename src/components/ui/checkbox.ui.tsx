import { cn } from "@/lib/utils.lib";
import { HtmlHTMLAttributes } from "react";

interface CheckboxUI extends HtmlHTMLAttributes<HTMLDivElement> {
  checked?: boolean;
  onChecked?: (event: boolean) => void;
  label?: string;
}
const CheckboxUI: React.FC<CheckboxUI> = ({
  checked,
  label,
  className,
  onChecked,
  ...props
}) => {
  return (
    <div
      {...props}
      onClick={() => onChecked && onChecked(!checked)}
      className={cn(
        "flex items-center gap-2 w-fit cursor-pointer group ",
        className
      )}
    >
      <div className="w-4 aspect-square card-border flex justify-center items-center group-hover:outline-action group-hover:-outline-offset-[0.30rem]">
        {checked && <span className="w-1/2 h-1/2 bg-accent block"></span>}
      </div>
      {label && <span>{label}</span>}
    </div>
  );
};

export default CheckboxUI;
