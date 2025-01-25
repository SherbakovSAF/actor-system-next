"use client";

import { cn } from "@/lib/utils.lib";
import { useState } from "react";
import LoadingUi from "@/components/ui/loading.ui";

interface InputUIProps extends React.InputHTMLAttributes<HTMLInputElement> {
  loading?: boolean;
  rightIcon?: React.ReactNode;
}

const InputUI: React.FC<InputUIProps> = ({
  loading,
  className,
  type = "text",
  rightIcon,

  onClick,
  ...props
}) => {
  const [isHiddenPassword, setHiddenPassword] = useState(false);
  return (
    <div
      className={cn(
        "card-border bg-surface focus-within:outline-action focus-within:-outline-offset-[0.40rem]"
      )}
      onClick={onClick}
    >
      <div className="px-2 w-full flex items-center">
        <input
          className={cn("bg-transparent w-full p-1", className)}
          type={type}
          autoComplete="off"
          {...props}
        />
        {type === "password" && (
          <div onClick={() => setHiddenPassword(!isHiddenPassword)}>*</div>
        )}
        {rightIcon && rightIcon}
        {loading && <LoadingUi />}
      </div>
    </div>
  );
};

export default InputUI;
