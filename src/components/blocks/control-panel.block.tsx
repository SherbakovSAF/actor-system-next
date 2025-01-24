import { cn } from "@/lib/utils.lib";
import { usePathname, useRouter } from "next/navigation";

const ControlPanelBlock = () => {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    { key: "users", title: "Пользователи" },
    { key: "filming", title: "Создать" },
  ];

  return (
    <ul className="flex gap-2">
      {tabs.map((tab) => (
        <li
          key={tab.key}
          className={cn(pathname === `/admin/${tab.key}` && "bg-red-100")}
          onClick={() => router.push(tab.key)}
        >
          {tab.title}
        </li>
      ))}
    </ul>
  );
};

export default ControlPanelBlock;
