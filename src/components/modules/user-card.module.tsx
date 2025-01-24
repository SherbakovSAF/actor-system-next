import { User_M } from "@prisma/client";
import ButtonUI from "@/components/ui/button.ui";
import { UserMinDTO_I } from "@/types/user.types";
import CardBlock from "@/components/blocks/card.block";

interface UserCardBlockProps {
  user: User_M | UserMinDTO_I;
  forAdmin?: boolean;
}

const UserCardModule: React.FC<UserCardBlockProps> = ({
  user,
  forAdmin = false,
}) => {
  return (
    <CardBlock title={user.nickName ?? ""}>
      <ul>
        <li>Пользователь {user.id}</li>
        <li>{user.name}</li>
        <li>{user.nickName}</li>
        <li>{user.mail}</li>
      </ul>
      {forAdmin && (
        <ButtonUI onClick={() => console.log("Сделать актёром")}>
          Сделать актёром
        </ButtonUI>
      )}
    </CardBlock>
  );
};

export default UserCardModule;
