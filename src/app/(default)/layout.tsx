import LayoutWithPanelBlock from "@/components/blocks/layout-with-panel.block";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "47Chromo | Главная",
};

const DefaultLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <LayoutWithPanelBlock>{children}</LayoutWithPanelBlock>;
};

export default DefaultLayout;
