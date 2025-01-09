import { cn } from "@/lib/utils.lib";
import { useState } from "react";
import LoadingUi from "./loading.ui";

interface InputUIProps extends React.InputHTMLAttributes<HTMLInputElement> {
  loading?: boolean;

  // onChange?: (event) => void
  // multiline?: boolean;
  // shadow?: boolean;
  // style?: React.CSSProperties;
  // variant?: "default" | "flat";
}

// TODO: Может как то получиться распоковать всё. И посмотреть. Мб не все пропсы надо передавать
const InputUI: React.FC<InputUIProps> = ({
  loading,
  className,
  type = "text",
  disabled,

  ...props
}) => {
  const [isHiddenPassword, setHiddenPassword] = useState(false);
  return (
    <div
      className={cn(
        className,
        "card-border p-1 bg-surface flex items-center",
        disabled && "bg-surface-disabled"
      )}
    >
      <input
        className="bg-transparent w-full"
        type={type}
        autoComplete="off"
        {...props}
        disabled={disabled}
      />
      {type === "password" && (
        <div onClick={() => setHiddenPassword(!isHiddenPassword)}>*</div>
      )}
      {loading && <LoadingUi />}
    </div>
  );
};

export default InputUI;
