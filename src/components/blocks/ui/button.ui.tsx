import LoadingUi from "./loading.ui";

interface ButtonUIProps extends React.InputHTMLAttributes<HTMLInputElement> {
  loading?: boolean;

  // onChange?: (event) => void
  // multiline?: boolean;
  // shadow?: boolean;
  // style?: React.CSSProperties;
  // variant?: "default" | "flat";
}
const ButtonUI: React.FC<React.PropsWithChildren<ButtonUIProps>> = ({
  children,
  loading,
}) => {
  return (
    <button className="card-border-secondary bg-surface-secondary w-fit px-2 relative ">
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
