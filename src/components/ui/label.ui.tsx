import { HtmlHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";

interface LabelUIProps extends HtmlHTMLAttributes<HTMLDivElement> {
  value: string;
  id?: string;
  error?: FieldError;
}
const LabelUI: React.FC<React.PropsWithChildren<LabelUIProps>> = ({
  children,
  id,
  value,
  error,
  ...props
}) => {
  return (
    <div {...props}>
      <label className="block text-nowrap" id={id}>
        {value}
      </label>
      {children}
      <p>{error && <small className="text-error">{error.message}</small>}</p>
    </div>
  );
};

export default LabelUI;
