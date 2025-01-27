"use client";

import LoadingUi from "@/components/ui/loading.ui";
import { cn } from "@/lib/utils.lib";

interface TextareaUIProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  loading?: boolean;
}

// TODO: Может как то получиться распоковать всё. И посмотреть. Мб не все пропсы надо передавать
const TextareaUI: React.FC<TextareaUIProps> = ({
  loading,
  className,
  disabled,
  ...props
}) => {
  return (
    <div
      className={cn(
        className,
        "relative card-border  bg-surface flex items-center ",
        disabled && "bg-surface-disabled"
      )}
    >
      <div className="focus-within:outline-action focus-within:-outline-offset-4 w-full p-2">
        <textarea
          className="bg-transparent w-full"
          disabled={disabled}
          {...props}
        />

        {loading && <LoadingUi className="absolute right-1 top-1  " />}
      </div>
    </div>
  );
};

export default TextareaUI;
