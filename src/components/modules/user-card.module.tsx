"use client";

import CardBlock from "@/components/blocks/card.block";
import ButtonUI from "@/components/ui/button.ui";
import { createActorService } from "@/services/actor.service";
import { UserMinDTO_I } from "@/types/user.types";
import { User_M } from "@prisma/client";

interface UserCardBlockProps {
  user: User_M | UserMinDTO_I;
  forAdmin?: boolean;
}

const UserCardModule: React.FC<UserCardBlockProps> = ({
  user,
  forAdmin = false,
}) => {
  const handleCreateActor = () => createActorService({ userId: user.id });
  return (
    <CardBlock title={user.nickName ?? ""}>
      <ul>
        <li>Пользователь {user.id}</li>
        <li>{user.name}</li>
        <li>{user.nickName}</li>
        <li>{user.mail}</li>
      </ul>
      {forAdmin && (
        <ButtonUI onClick={() => handleCreateActor()}>Сделать актёром</ButtonUI>
      )}
    </CardBlock>
  );
};

export default UserCardModule;
