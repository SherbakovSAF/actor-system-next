"use client"; // TODO:  Поменять на SSR

import AvatarChangerModal, {
  controlAvatarModal,
} from "@/components/modals/avatar-changer.modal";
import TextareaUI from "@/components/ui/textarea.ui";
import { getUser, updateUser } from "@/services/user.service";
import { UserMinDTO_I } from "@/types/user.types";
import { format } from "date-fns";
import { useEffect, useState } from "react";
const SettingsPage = () => {
  const [user, setUser] = useState<UserMinDTO_I>({} as UserMinDTO_I);

  useEffect(() => {
    getUser().then((finedUser) => {
      if (finedUser) setUser(finedUser);
    });
  }, []);

  const handleUpdateUser = async (user: UserMinDTO_I) => {
    const newInfoUser = await updateUser(user);
    setUser(newInfoUser);
  };

  return (
    <main>
      <AvatarChangerModal
        onChangeAvatarUrl={(newUrl) =>
          handleUpdateUser({ ...user, avatar: newUrl })
        }
      />
      <header className="flex gap-10">
        <div
          className="w-60 aspect-square bg-cover"
          style={{ backgroundImage: `url(${user.avatar})` }}
          onClick={() =>
            controlAvatarModal.open({ currentAvatarUrl: user.avatar ?? "" })
          }
        />
        <div className="flex-1">
          <TextareaUI value={user.quote ?? ""} cols={1} readOnly />
          <h2>{user.nickName}</h2>
          <h3>{user.name}</h3>
          <h3>{user.isApprove ? "Прошёл созвон" : ""}</h3>
          {user?.createdAt && (
            <h3>
              Зарегистрирован {format(new Date(user.createdAt), "dd.MM.yyyy")}
            </h3>
          )}
        </div>
      </header>

      {/* <h1>Раздел в разработке.</h1>
      <p>
        {JSON.stringify(user).toString()}
        <span
          className="w-6 h-6 bg-red-500 block bg-cover"
          style={{ backgroundImage: `url(${user.avatar})` }}
          onClick={() =>
            controlAvatarModal.open({ currentAvatarUrl: user.avatar ?? "" })
          }
        ></span>
        Чуть позже Вы сможете подностью настроить свой аккаунт и изменить свои
        настройки
      </p> */}
    </main>
  );
};

export default SettingsPage;
