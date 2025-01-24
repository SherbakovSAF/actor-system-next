"use client";
import { cn } from "@/lib/utils.lib";
import { signOutService } from "@/services/auth.service";

interface LayoutWithPanelProps extends React.PropsWithChildren {
  hasPanel?: boolean;
  classNameContent?: HTMLElement["className"];
}

const LayoutWithPanelBlock: React.FC<LayoutWithPanelProps> = ({
  children,
  classNameContent,
  hasPanel = true,
}) => {
  return (
    <>
      <div className={cn("flex-1 py-4 overflow-auto ")} id="scroll">
        <div
          className={cn("container max-w-screen-xl h-full", classNameContent)}
        >
          {children}
        </div>
      </div>

      {hasPanel && <div onClick={() => signOutService()}>Панель</div>}
    </>
  );
};

export default LayoutWithPanelBlock;
