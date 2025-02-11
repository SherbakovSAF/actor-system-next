"use client";
import { signOutService } from "@/services/auth.service";
import { RoutePath_E } from "@/types/route-path.type";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import CardBlock from "@/components/blocks/card.block";
import ButtonUI from "@/components/ui/button.ui";
import PopoverUI from "@/components/ui/popover.ui";
import ChevronIcon from "@/assets/icons/chevron.svg?url";
import DisabledBg from "@/assets/img/background.jpg";
import StartPic from "@/assets/img/start.png";
import SettingsPic from "@/assets/img/settings.jpg";
import TurnOffPic from "@/assets/img/turn-off.png";
import { cn } from "@/lib/utils.lib";
import { PosDetail_T } from "@/types/general.types";
import usePushNotification from "@/pwa/usePushNotification";

const ControlPanelBlock = () => {
  const { subscription, unsubscribeFromPush, subscribeToPush } =
    usePushNotification();
  return (
    <div className="flex justify-between items-center w-full bg-surface-secondary ">
      <ul className="flex">
        <li className="list-none">
          <PopoverUI
            margin={0}
            overlay={<ControlProfileMenu />}
            position="top-start"
          >
            <ButtonUI className="flex gap-2 items-center">
              <Image src={StartPic} alt="🖥️" className="w-4 h-4" />
              <span>Пуск</span>
            </ButtonUI>
          </PopoverUI>
        </li>
        <ContextMenu routeChildren={routes} isFirstItem position="top-start" />
      </ul>
      {subscription ? (
        <button onClick={unsubscribeFromPush}>Unsubscribe</button>
      ) : (
        <button onClick={subscribeToPush}>Subscribe</button>
      )}
    </div>
  );
};

const ControlProfileMenu = () => {
  const router = useRouter();
  const handleSignOut = async () =>
    await signOutService().then(() => router.push(RoutePath_E.AUTH));
  // TODO: Доработать внешний вид
  return (
    <CardBlock className="w-60">
      <header></header>
      <main></main>
      <footer className="flex flex-col *:cursor-pointer">
        <span
          className="flex items-center gap-2"
          onClick={() => router.push(RoutePath_E.SETTINGS)}
        >
          <Image src={SettingsPic} alt="-" className="w-8 aspect-square" />
          <span>Настройки</span>
        </span>
        <span
          className="flex items-center gap-2"
          onClick={() => handleSignOut()}
        >
          <Image src={TurnOffPic} alt="-" className="w-8 aspect-square" />
          <span>Выйти</span>
        </span>
      </footer>
    </CardBlock>
  );
};

export default ControlPanelBlock;

interface ContextMenuProps {
  position: PosDetail_T;
  routeChildren: route[];
  isFirstItem: boolean;
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  routeChildren,
  position,
  isFirstItem,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const isActive = (route: route): boolean => {
    if (pathname === route.path) return true;
    if (route.children) return route.children.some((child) => isActive(child));
    return false;
  };

  const classes = (child: route) =>
    cn(isActive(child) ? "bg-center bg-no-repeat bg-cover card-border" : "");

  const bgSelect = (child: route) =>
    cn(isActive(child) ? `url('${DisabledBg.src}')` : "");

  return routeChildren.map((child) => (
    <PopoverUI
      key={child.path}
      margin={0}
      position={position}
      overlay={
        child.children?.length && (
          <CardBlock className="p-0">
            <ContextMenu
              routeChildren={child.children}
              position="right-end"
              isFirstItem={false}
            />
          </CardBlock>
        )
      }
    >
      <li className="list-none">
        <ul className="w-full">
          <ButtonUI
            onClick={() => !child.children?.length && router.push(child.path)}
            className={cn(
              classes(child),
              "w-full text-start flex items-center gap-1"
            )}
            style={{ backgroundImage: bgSelect(child) }}
          >
            <span>{child.title}</span>
            {child.children?.length && (
              <Image
                src={ChevronIcon}
                alt=">"
                className={cn(
                  "w-2 translate-y-[1px]",
                  isFirstItem && "-rotate-90"
                )}
              />
            )}
          </ButtonUI>
        </ul>
      </li>
    </PopoverUI>
  ));
};

interface route {
  title: string;
  path: string;
  children?: route[];
}

const routes: route[] = [
  {
    title: "Главная",
    path: RoutePath_E.HOME,
  },
  {
    title: "Админка",
    path: RoutePath_E.ADMIN,
    children: [
      { title: "Съёмки", path: RoutePath_E.ADMIN_CINEMATIC },
      {
        title: "Пользователи",
        path: RoutePath_E.ADMIN_USERS,
      },
      {
        title: "Главная",
        path: RoutePath_E.ADMIN,
      },
    ],
  },
];
