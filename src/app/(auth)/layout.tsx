import LayoutWithPanelBlock from "@/components/blocks/layout-with-panel.block";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "47Chromo | Авторизация",
};

const AuthLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <LayoutWithPanelBlock
      hasPanel={false}
      classNameContent="flex justify-center items-center w-90% max-w-sm"
    >
      {children}
    </LayoutWithPanelBlock>
  );
};

export default AuthLayout;
